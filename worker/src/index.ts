// Cloudflare Worker - Main Entry Point
// Replaces Flask backend with edge-native API

interface Env {
  MESSAGES: KVNamespace;
  RESEND_API_KEY: string;
  NOTIFICATION_EMAIL: string;
  CORS_ORIGIN?: string;
}

interface ContactData {
  name: string;
  email: string;
  title: string;
  message: string;
  company?: string;
  project_type?: string;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Email validation
function validateEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

// Send email via Resend API
async function sendEmail(env: Env, to: string, subject: string, html: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>', // Update with your verified domain
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Email error:', error);
    return false;
  }
}

// Generate notification email HTML
function getNotificationEmailHTML(data: ContactData & { timestamp: string }): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 100%);
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 40px 30px;
      color: #333;
    }
    .field {
      margin-bottom: 25px;
    }
    .field-label {
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
      color: #06b6d4;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    .field-value {
      font-size: 16px;
      color: #1e293b;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #06b6d4;
    }
    .message-box {
      background: #f1f5f9;
      padding: 20px;
      border-radius: 12px;
      margin-top: 10px;
      line-height: 1.6;
      font-size: 15px;
      color: #334155;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 2px solid #e2e8f0;
    }
    .badge {
      display: inline-block;
      padding: 6px 12px;
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: white;
      border-radius: 20px;
      font-size: 11px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Contact Message</h1>
      <p>Someone reached out through your portfolio</p>
      <span class="badge">High Priority</span>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">👤 Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">📧 Email Address</div>
        <div class="field-value">${data.email}</div>
      </div>
      
      <div class="field">
        <div class="field-label">🎯 Project Title</div>
        <div class="field-value">${data.title}</div>
      </div>
      
      <div class="field">
        <div class="field-label">💬 Message</div>
        <div class="message-box">${data.message}</div>
      </div>
      
      <div class="field">
        <div class="field-label">🕐 Received At</div>
        <div class="field-value">${data.timestamp}</div>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Jivitesh Portfolio</strong></p>
      <p>AI Engineer & Data Scientist</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Generate confirmation email HTML
function getConfirmationEmailHTML(data: ContactData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 100%);
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #06b6d4, #3b82f6);
      color: white;
      padding: 50px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 10px 0;
      font-size: 32px;
    }
    .content {
      padding: 40px 30px;
      color: #333;
    }
    .content p {
      line-height: 1.8;
      color: #475569;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .highlight {
      background: #f0f9ff;
      border-left: 4px solid #06b6d4;
      padding: 20px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You! ✨</h1>
      <p>Your message has been received</p>
    </div>
    
    <div class="content">
      <p>Hi <strong>${data.name}</strong>,</p>
      
      <p>
        Thank you for reaching out! I've received your message about 
        "<strong>${data.title}</strong>" and I'm excited to learn more about your project.
      </p>
      
      <div class="highlight">
        <p style="margin: 0; font-weight: bold; color: #06b6d4;">What happens next?</p>
        <p style="margin: 10px 0 0 0;">
          I'll review your message and get back to you within 24-48 hours. 
          In the meantime, feel free to explore my portfolio and projects.
        </p>
      </div>
      
      <p>
        Looking forward to discussing how we can work together to bring your ideas to life!
      </p>
      
      <p style="margin-top: 30px;">
        Best regards,<br>
        <strong>Jivitesh</strong><br>
        <span style="color: #06b6d4;">AI Engineer & Data Scientist</span>
      </p>
    </div>
    
    <div class="footer">
      <p>Portfolio: jiviteshgd28@gmail.com</p>
      <p style="margin-top: 10px; font-size: 12px; color: #94a3b8;">
        This is an automated confirmation email
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Health check
      if (path === '/api/health' && request.method === 'GET') {
        return new Response(
          JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            message: 'Worker is running',
            email_configured: !!env.RESEND_API_KEY,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Contact form submission
      if (path === '/api/contact' && request.method === 'POST') {
        const data: ContactData = await request.json();

        // Validation
        if (!data.name || !data.email || !data.title || !data.message) {
          return new Response(
            JSON.stringify({ error: 'All fields are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!validateEmail(data.email)) {
          return new Response(
            JSON.stringify({ error: 'Invalid email format' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (data.message.length < 10) {
          return new Response(
            JSON.stringify({ error: 'Message must be at least 10 characters' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Create message object
        const contactMessage = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          title: data.title,
          message: data.message,
          company: data.company || '',
          project_type: data.project_type || '',
          timestamp: new Date().toISOString(),
          read: false,
        };

        // Store in KV
        const messagesKey = 'contact_messages';
        const existingMessages = await env.MESSAGES.get(messagesKey, 'json') || [];
        const messages = Array.isArray(existingMessages) ? existingMessages : [];
        messages.push(contactMessage);
        await env.MESSAGES.put(messagesKey, JSON.stringify(messages));

        // Send emails
        const notificationSent = await sendEmail(
          env,
          env.NOTIFICATION_EMAIL || 'jiviteshgd28@gmail.com',
          `🎯 New Portfolio Contact: ${data.title}`,
          getNotificationEmailHTML({ ...data, timestamp: contactMessage.timestamp })
        );

        const confirmationSent = await sendEmail(
          env,
          data.email,
          `✓ Message Received - ${data.title}`,
          getConfirmationEmailHTML(data)
        );

        return new Response(
          JSON.stringify({
            status: 'success',
            message: 'Contact message received successfully',
            data: contactMessage,
            email_notification: notificationSent,
            confirmation_sent: confirmationSent,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Get projects
      if (path === '/api/projects' && request.method === 'GET') {
        const projects = [
          {
            id: 1,
            title: 'Cybersecurity Platform',
            description: 'ML/DL-based anomaly detection with automated response playbooks',
            tags: ['Python', 'ML', 'API', 'Security'],
            category: 'ai-ml',
            icon: '🛡️',
          },
          {
            id: 2,
            title: 'Movie Recommendation System',
            description: 'IMDb-like interface with AI-powered recommendations',
            tags: ['React', 'Python', 'AI'],
            category: 'ai-ml fullstack',
            icon: '🎬',
          },
          {
            id: 3,
            title: 'Mental Wellness Mirror',
            description: 'AI-powered emotional intelligence support platform',
            tags: ['AI', 'NLP', 'React'],
            category: 'ai-ml',
            icon: '🧠',
          },
          {
            id: 4,
            title: 'Smart Allocation Engine',
            description: 'AI-based matching for PM internship allocation',
            tags: ['Next.js', 'ML', 'Flask'],
            category: 'ai-ml fullstack',
            icon: '🎯',
          },
          {
            id: 5,
            title: 'Progressive Web Applications',
            description: 'Modern PWAs with fluid UI transitions',
            tags: ['React', 'Tailwind', 'PWA'],
            category: 'fullstack',
            icon: '💻',
          },
          {
            id: 6,
            title: 'Research & Innovation',
            description: 'Implementing state-of-the-art ML algorithms',
            tags: ['Research', 'DL', 'Papers'],
            category: 'research data',
            icon: '🔬',
          },
        ];

        return new Response(
          JSON.stringify({
            status: 'success',
            total: projects.length,
            projects,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Get skills
      if (path === '/api/skills' && request.method === 'GET') {
        const skills = {
          'AI & Machine Learning': 95,
          'Full-Stack Development': 90,
          'Data Analysis': 88,
          'Cloud & DevOps': 80,
          'Python Programming': 92,
          'JavaScript/React': 88,
          'Database Design': 85,
          'API Development': 90,
        };

        return new Response(
          JSON.stringify({
            status: 'success',
            skills,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Get messages
      if (path === '/api/messages' && request.method === 'GET') {
        const messages = await env.MESSAGES.get('contact_messages', 'json') || [];
        const messageArray = Array.isArray(messages) ? messages : [];
        const unreadCount = messageArray.filter((m: any) => !m.read).length;

        return new Response(
          JSON.stringify({
            status: 'success',
            total: messageArray.length,
            unread: unreadCount,
            messages: messageArray,
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Analytics tracking
      if (path === '/api/analytics' && request.method === 'POST') {
        try {
          const data = await request.json() as { event: string; properties: Record<string, any> };

          // Store analytics in KV with daily aggregation
          const today = new Date().toISOString().split('T')[0];
          const analyticsKey = `analytics_${today}`;

          const existingAnalytics = await env.MESSAGES.get(analyticsKey, 'json') as { events: any[] } | null;
          const analytics = existingAnalytics?.events || [];

          analytics.push({
            timestamp: new Date().toISOString(),
            event: data.event,
            properties: data.properties
          });

          await env.MESSAGES.put(analyticsKey, JSON.stringify({ events: analytics }), {
            expirationTtl: 60 * 60 * 24 * 90 // Keep for 90 days
          });

          return new Response(
            JSON.stringify({ status: 'success', message: 'Analytics tracked' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (error) {
          console.error('Analytics error:', error);
          // Don't fail the request, just log
          return new Response(
            JSON.stringify({ status: 'success', message: 'Analytics received' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      }

      // 404
      return new Response(
        JSON.stringify({ error: 'Endpoint not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  },
};
