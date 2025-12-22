var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-Urir9s/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
__name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    return Reflect.apply(target, thisArg, [
      stripCfConnectingIPHeader.apply(null, argArray)
    ]);
  }
});

// src/index.ts
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
__name(validateEmail, "validateEmail");
async function sendEmail(env, to, subject, html) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        // Update with your verified domain
        to: [to],
        subject,
        html
      })
    });
    return response.ok;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
}
__name(sendEmail, "sendEmail");
function getNotificationEmailHTML(data) {
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
      <h1>\u{1F4EC} New Contact Message</h1>
      <p>Someone reached out through your portfolio</p>
      <span class="badge">High Priority</span>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="field-label">\u{1F464} Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      
      <div class="field">
        <div class="field-label">\u{1F4E7} Email Address</div>
        <div class="field-value">${data.email}</div>
      </div>
      
      <div class="field">
        <div class="field-label">\u{1F3AF} Project Title</div>
        <div class="field-value">${data.title}</div>
      </div>
      
      <div class="field">
        <div class="field-label">\u{1F4AC} Message</div>
        <div class="message-box">${data.message}</div>
      </div>
      
      <div class="field">
        <div class="field-label">\u{1F550} Received At</div>
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
__name(getNotificationEmailHTML, "getNotificationEmailHTML");
function getConfirmationEmailHTML(data) {
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
      <h1>Thank You! \u2728</h1>
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
__name(getConfirmationEmailHTML, "getConfirmationEmailHTML");
var src_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }
    try {
      if (path === "/api/health" && request.method === "GET") {
        return new Response(
          JSON.stringify({
            status: "healthy",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            message: "Worker is running",
            email_configured: !!env.RESEND_API_KEY
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      if (path === "/api/contact" && request.method === "POST") {
        const data = await request.json();
        if (!data.name || !data.email || !data.title || !data.message) {
          return new Response(
            JSON.stringify({ error: "All fields are required" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (!validateEmail(data.email)) {
          return new Response(
            JSON.stringify({ error: "Invalid email format" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (data.message.length < 10) {
          return new Response(
            JSON.stringify({ error: "Message must be at least 10 characters" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        const contactMessage = {
          id: Date.now(),
          name: data.name,
          email: data.email,
          title: data.title,
          message: data.message,
          company: data.company || "",
          project_type: data.project_type || "",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          read: false
        };
        const messagesKey = "contact_messages";
        const existingMessages = await env.MESSAGES.get(messagesKey, "json") || [];
        const messages = Array.isArray(existingMessages) ? existingMessages : [];
        messages.push(contactMessage);
        await env.MESSAGES.put(messagesKey, JSON.stringify(messages));
        const notificationSent = await sendEmail(
          env,
          env.NOTIFICATION_EMAIL || "jiviteshgd28@gmail.com",
          `\u{1F3AF} New Portfolio Contact: ${data.title}`,
          getNotificationEmailHTML({ ...data, timestamp: contactMessage.timestamp })
        );
        const confirmationSent = await sendEmail(
          env,
          data.email,
          `\u2713 Message Received - ${data.title}`,
          getConfirmationEmailHTML(data)
        );
        return new Response(
          JSON.stringify({
            status: "success",
            message: "Contact message received successfully",
            data: contactMessage,
            email_notification: notificationSent,
            confirmation_sent: confirmationSent
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      if (path === "/api/projects" && request.method === "GET") {
        const projects = [
          {
            id: 1,
            title: "Cybersecurity Platform",
            description: "ML/DL-based anomaly detection with automated response playbooks",
            tags: ["Python", "ML", "API", "Security"],
            category: "ai-ml",
            icon: "\u{1F6E1}\uFE0F"
          },
          {
            id: 2,
            title: "Movie Recommendation System",
            description: "IMDb-like interface with AI-powered recommendations",
            tags: ["React", "Python", "AI"],
            category: "ai-ml fullstack",
            icon: "\u{1F3AC}"
          },
          {
            id: 3,
            title: "Mental Wellness Mirror",
            description: "AI-powered emotional intelligence support platform",
            tags: ["AI", "NLP", "React"],
            category: "ai-ml",
            icon: "\u{1F9E0}"
          },
          {
            id: 4,
            title: "Smart Allocation Engine",
            description: "AI-based matching for PM internship allocation",
            tags: ["Next.js", "ML", "Flask"],
            category: "ai-ml fullstack",
            icon: "\u{1F3AF}"
          },
          {
            id: 5,
            title: "Progressive Web Applications",
            description: "Modern PWAs with fluid UI transitions",
            tags: ["React", "Tailwind", "PWA"],
            category: "fullstack",
            icon: "\u{1F4BB}"
          },
          {
            id: 6,
            title: "Research & Innovation",
            description: "Implementing state-of-the-art ML algorithms",
            tags: ["Research", "DL", "Papers"],
            category: "research data",
            icon: "\u{1F52C}"
          }
        ];
        return new Response(
          JSON.stringify({
            status: "success",
            total: projects.length,
            projects
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      if (path === "/api/skills" && request.method === "GET") {
        const skills = {
          "AI & Machine Learning": 95,
          "Full-Stack Development": 90,
          "Data Analysis": 88,
          "Cloud & DevOps": 80,
          "Python Programming": 92,
          "JavaScript/React": 88,
          "Database Design": 85,
          "API Development": 90
        };
        return new Response(
          JSON.stringify({
            status: "success",
            skills
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      if (path === "/api/messages" && request.method === "GET") {
        const messages = await env.MESSAGES.get("contact_messages", "json") || [];
        const messageArray = Array.isArray(messages) ? messages : [];
        const unreadCount = messageArray.filter((m) => !m.read).length;
        return new Response(
          JSON.stringify({
            status: "success",
            total: messageArray.length,
            unread: unreadCount,
            messages: messageArray
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
      return new Response(
        JSON.stringify({ error: "Endpoint not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Worker error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-Urir9s/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-Urir9s/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
