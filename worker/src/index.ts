// ==================== Cloudflare Worker – Production Backend ====================
// Edge-native API for Portfolio (Contact, Analytics, Admin)

// -------------------- ENV TYPES --------------------
interface Env {
  MESSAGES: KVNamespace;
  RESEND_API_KEY: string;
  NOTIFICATION_EMAIL: string;
  ADMIN_KEY: string;
  CORS_ORIGIN?: string;
}

// -------------------- DATA TYPES --------------------
interface ContactData {
  name: string;
  email: string;
  title: string;
  message: string;
  company?: string;
  project_type?: string;
}

// -------------------- UTILS --------------------
const json = (data: any, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string) {
  return emailRegex.test(email);
}

function sanitize(text: string, max = 2000) {
  return text.replace(/[<>]/g, '').trim().slice(0, max);
}

// -------------------- EMAIL --------------------
async function sendEmail(
  env: Env,
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <no-reply@yourdomain.com>',
        to: [to],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// -------------------- CORS --------------------
function cors(env: Env) {
  return {
    'Access-Control-Allow-Origin': env.CORS_ORIGIN || 'https://yourdomain.com',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,X-Admin-Key',
  };
}

// -------------------- RATE LIMIT --------------------
async function rateLimit(env: Env, ip: string) {
  const key = `rate:${ip}`;
  const count = Number((await env.MESSAGES.get(key)) || 0);

  if (count > 10) return false;

  await env.MESSAGES.put(key, String(count + 1), {
    expirationTtl: 60,
  });

  return true;
}

// -------------------- EMAIL TEMPLATES --------------------
const notificationHTML = (d: any) => `
<h2>📩 New Contact Message</h2>
<p><b>Name:</b> ${d.name}</p>
<p><b>Email:</b> ${d.email}</p>
<p><b>Title:</b> ${d.title}</p>
<p><b>Message:</b><br/>${d.message}</p>
<p><b>Time:</b> ${d.timestamp}</p>
`;

const confirmationHTML = (d: any) => `
<h2>Thank you, ${d.name} 👋</h2>
<p>Your message titled "<b>${d.title}</b>" was received.</p>
<p>I’ll respond within 24–48 hours.</p>
`;

// ==================== WORKER ====================
export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const headers = cors(env);

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      // ---------------- HEALTH ----------------
      if (url.pathname === '/api/health') {
        return json(
          { status: 'ok', time: new Date().toISOString() },
          200,
          headers
        );
      }

      // ---------------- CONTACT ----------------
      if (url.pathname === '/api/contact' && req.method === 'POST') {
        const ip = req.headers.get('CF-Connecting-IP') || 'unknown';

        if (!(await rateLimit(env, ip))) {
          return json({ error: 'Too many requests' }, 429, headers);
        }

        const body = (await req.json()) as ContactData;

        if (!body.name || !body.email || !body.title || !body.message) {
          return json({ error: 'Missing fields' }, 400, headers);
        }

        if (!validateEmail(body.email)) {
          return json({ error: 'Invalid email' }, 400, headers);
        }

        const message = {
          id: crypto.randomUUID(),
          name: sanitize(body.name, 100),
          email: sanitize(body.email, 150),
          title: sanitize(body.title, 150),
          message: sanitize(body.message),
          company: sanitize(body.company || '', 100),
          project_type: sanitize(body.project_type || '', 50),
          timestamp: new Date().toISOString(),
          read: false,
        };

        await env.MESSAGES.put(`contact:${message.id}`, JSON.stringify(message));

        await sendEmail(
          env,
          env.NOTIFICATION_EMAIL,
          `📬 New Contact: ${message.title}`,
          notificationHTML(message)
        );

        await sendEmail(
          env,
          message.email,
          'Message received ✔',
          confirmationHTML(message)
        );

        return json({ success: true }, 200, headers);
      }

      // ---------------- ADMIN MESSAGES ----------------
      if (url.pathname === '/api/messages') {
        if (req.headers.get('X-Admin-Key') !== env.ADMIN_KEY) {
          return json({ error: 'Unauthorized' }, 401, headers);
        }

        const list = await env.MESSAGES.list({ prefix: 'contact:' });
        const messages = await Promise.all(
          list.keys.map(async (k) =>
            JSON.parse((await env.MESSAGES.get(k.name))!)
          )
        );

        return json(
          {
            total: messages.length,
            unread: messages.filter((m) => !m.read).length,
            messages,
          },
          200,
          headers
        );
      }

      // ---------------- ANALYTICS ----------------
      if (url.pathname === '/api/analytics' && req.method === 'POST') {
        const { event } = await req.json();
        const day = new Date().toISOString().slice(0, 10);
        const key = `analytics:${day}:${event}`;

        const count = Number((await env.MESSAGES.get(key)) || 0);
        await env.MESSAGES.put(key, String(count + 1), {
          expirationTtl: 60 * 60 * 24 * 90,
        });

        return json({ tracked: true }, 200, headers);
      }

      // ---------------- 404 ----------------
      return json({ error: 'Not found' }, 404, headers);
    } catch (e) {
      console.error(e);
      return json({ error: 'Server error' }, 500, headers);
    }
  },
};
