from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
import re

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# ==================== Configuration ====================

CONTACT_DATA_FILE = 'contact_messages.json'

# Gmail Configuration
GMAIL_USER = 'your_email@gmail.com'  # Replace with your Gmail
GMAIL_APP_PASSWORD = 'your_app_password'  # Replace with your Gmail App Password

# To get Gmail App Password:
# 1. Go to Google Account Settings
# 2. Security > 2-Step Verification (enable if not already)
# 3. App Passwords > Select app: Mail, Select device: Other
# 4. Generate and copy the 16-character password

# ==================== Helper Functions ====================

def load_contact_messages():
    """Load contact messages from JSON file"""
    if os.path.exists(CONTACT_DATA_FILE):
        with open(CONTACT_DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_contact_messages(messages):
    """Save contact messages to JSON file"""
    with open(CONTACT_DATA_FILE, 'w') as f:
        json.dump(messages, f, indent=2)

def validate_email(email):
    """Basic email validation"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email)

def send_email_notification(contact_data):
    """Send email notification via Gmail"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['From'] = GMAIL_USER
        msg['To'] = GMAIL_USER  # Send to yourself
        msg['Subject'] = f'🎯 New Portfolio Contact: {contact_data["title"]}'

        # Create premium HTML email template
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    background: linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 100%);
                    margin: 0;
                    padding: 40px 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }}
                .header {{
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    color: white;
                    padding: 40px 30px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                }}
                .header p {{
                    margin: 10px 0 0 0;
                    opacity: 0.9;
                    font-size: 14px;
                }}
                .content {{
                    padding: 40px 30px;
                    color: #333;
                }}
                .field {{
                    margin-bottom: 25px;
                }}
                .field-label {{
                    font-size: 12px;
                    font-weight: bold;
                    text-transform: uppercase;
                    color: #06b6d4;
                    letter-spacing: 1px;
                    margin-bottom: 8px;
                }}
                .field-value {{
                    font-size: 16px;
                    color: #1e293b;
                    padding: 15px;
                    background: #f8fafc;
                    border-radius: 8px;
                    border-left: 4px solid #06b6d4;
                }}
                .message-box {{
                    background: #f1f5f9;
                    padding: 20px;
                    border-radius: 12px;
                    margin-top: 10px;
                    line-height: 1.6;
                    font-size: 15px;
                    color: #334155;
                }}
                .footer {{
                    background: #f8fafc;
                    padding: 30px;
                    text-align: center;
                    border-top: 2px solid #e2e8f0;
                }}
                .footer p {{
                    margin: 5px 0;
                    color: #64748b;
                    font-size: 13px;
                }}
                .badge {{
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
                }}
                .divider {{
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
                    margin: 25px 0;
                }}
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
                        <div class="field-value">{contact_data['name']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">📧 Email Address</div>
                        <div class="field-value">{contact_data['email']}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">🎯 Project Title</div>
                        <div class="field-value">{contact_data['title']}</div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="field">
                        <div class="field-label">💬 Message</div>
                        <div class="message-box">{contact_data['message']}</div>
                    </div>
                    
                    <div class="divider"></div>
                    
                    <div class="field">
                        <div class="field-label">🕐 Received At</div>
                        <div class="field-value">{contact_data['timestamp']}</div>
                    </div>
                </div>
                
                <div class="footer">
                    <p><strong>Jivitesh Portfolio</strong></p>
                    <p>AI Engineer & Data Scientist</p>
                    <p style="margin-top: 15px; font-size: 11px; color: #94a3b8;">
                        This is an automated notification from your portfolio contact form
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

        # Attach HTML content
        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)

        # Send email via Gmail SMTP
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            smtp.send_message(msg)

        return True

    except Exception as e:
        print(f"❌ Email sending failed: {str(e)}")
        return False

def send_confirmation_email(contact_data):
    """Send confirmation email to the person who contacted"""
    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = GMAIL_USER
        msg['To'] = contact_data['email']
        msg['Subject'] = f'✓ Message Received - {contact_data["title"]}'

        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    background: linear-gradient(135deg, #0a0a0f 0%, #1e1b4b 100%);
                    margin: 0;
                    padding: 40px 20px;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    background: rgba(255, 255, 255, 0.95);
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }}
                .header {{
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    color: white;
                    padding: 50px 30px;
                    text-align: center;
                }}
                .header h1 {{
                    margin: 0 0 10px 0;
                    font-size: 32px;
                }}
                .content {{
                    padding: 40px 30px;
                    color: #333;
                }}
                .content p {{
                    line-height: 1.8;
                    color: #475569;
                    font-size: 16px;
                    margin-bottom: 20px;
                }}
                .highlight {{
                    background: #f0f9ff;
                    border-left: 4px solid #06b6d4;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 25px 0;
                }}
                .footer {{
                    background: #f8fafc;
                    padding: 30px;
                    text-align: center;
                    color: #64748b;
                    font-size: 14px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Thank You! ✨</h1>
                    <p>Your message has been received</p>
                </div>
                
                <div class="content">
                    <p>Hi <strong>{contact_data['name']}</strong>,</p>
                    
                    <p>
                        Thank you for reaching out! I've received your message about 
                        "<strong>{contact_data['title']}</strong>" and I'm excited to learn more about your project.
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
                    <p>Portfolio: jivitesh-portfolio.vercel.app</p>
                    <p style="margin-top: 10px; font-size: 12px; color: #94a3b8;">
                        This is an automated confirmation email
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

        html_part = MIMEText(html_content, 'html')
        msg.attach(html_part)

        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            smtp.send_message(msg)

        return True

    except Exception as e:
        print(f"⚠️ Confirmation email failed: {str(e)}")
        return False

# ==================== API Routes ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Server is running',
        'email_configured': bool(GMAIL_USER and GMAIL_APP_PASSWORD)
    }), 200

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions with Gmail notifications"""
    try:
        data = request.get_json()

        # Validation
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        title = data.get('title', '').strip()
        message = data.get('message', '').strip()

        # Validate required fields
        if not all([name, email, title, message]):
            return jsonify({'error': 'All fields are required'}), 400

        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400

        # Validate message length
        if len(message) < 10:
            return jsonify({'error': 'Message must be at least 10 characters'}), 400

        # Create message object
        contact_message = {
            'id': int(datetime.now().timestamp() * 1000),
            'name': name,
            'email': email,
            'title': title,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'read': False
        }

        # Load existing messages
        messages = load_contact_messages()

        # Add new message
        messages.append(contact_message)

        # Save messages
        save_contact_messages(messages)

        # Send email notifications
        email_sent = send_email_notification(contact_message)
        confirmation_sent = send_confirmation_email(contact_message)

        # Log submission
        print(f"\n{'='*60}")
        print(f"✉️  NEW CONTACT MESSAGE")
        print(f"{'='*60}")
        print(f"📝 Name:           {name}")
        print(f"📧 Email:          {email}")
        print(f"🎯 Title:          {title}")
        print(f"💬 Message:        {message[:50]}...")
        print(f"🕐 Time:           {contact_message['timestamp']}")
        print(f"📬 Notification:   {'✓ Sent' if email_sent else '✗ Failed'}")
        print(f"📨 Confirmation:   {'✓ Sent' if confirmation_sent else '✗ Failed'}")
        print(f"{'='*60}\n")

        return jsonify({
            'status': 'success',
            'message': 'Contact message received successfully',
            'data': contact_message,
            'email_notification': email_sent,
            'confirmation_sent': confirmation_sent
        }), 200

    except Exception as e:
        print(f"❌ Error in contact handler: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Get all contact messages"""
    try:
        messages = load_contact_messages()
        unread_count = sum(1 for m in messages if not m.get('read', False))
        
        return jsonify({
            'status': 'success',
            'total': len(messages),
            'unread': unread_count,
            'messages': messages
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    """Delete a specific message"""
    try:
        messages = load_contact_messages()
        messages = [m for m in messages if m['id'] != message_id]
        save_contact_messages(messages)

        return jsonify({
            'status': 'success',
            'message': 'Message deleted successfully'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/messages/<int:message_id>/read', methods=['PUT'])
def mark_as_read(message_id):
    """Mark message as read"""
    try:
        messages = load_contact_messages()
        
        for message in messages:
            if message['id'] == message_id:
                message['read'] = True
                break

        save_contact_messages(messages)

        return jsonify({
            'status': 'success',
            'message': 'Message marked as read'
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get portfolio projects"""
    projects = [
        {
            'id': 1,
            'title': 'Cybersecurity Platform',
            'description': 'ML/DL-based anomaly detection with automated response playbooks',
            'tags': ['Python', 'ML', 'API', 'Security'],
            'category': 'ai-ml',
            'icon': '🛡️'
        },
        {
            'id': 2,
            'title': 'Movie Recommendation System',
            'description': 'IMDb-like interface with AI-powered recommendations',
            'tags': ['React', 'Python', 'AI'],
            'category': 'ai-ml fullstack',
            'icon': '🎬'
        },
        {
            'id': 3,
            'title': 'Mental Wellness Mirror',
            'description': 'AI-powered emotional intelligence support platform',
            'tags': ['AI', 'NLP', 'React'],
            'category': 'ai-ml',
            'icon': '🧠'
        },
        {
            'id': 4,
            'title': 'Smart Allocation Engine',
            'description': 'AI-based matching for PM internship allocation',
            'tags': ['Next.js', 'ML', 'Flask'],
            'category': 'ai-ml fullstack',
            'icon': '🎯'
        },
        {
            'id': 5,
            'title': 'Progressive Web Applications',
            'description': 'Modern PWAs with fluid UI transitions',
            'tags': ['React', 'Tailwind', 'PWA'],
            'category': 'fullstack',
            'icon': '💻'
        },
        {
            'id': 6,
            'title': 'Research & Innovation',
            'description': 'Implementing state-of-the-art ML algorithms',
            'tags': ['Research', 'DL', 'Papers'],
            'category': 'research data',
            'icon': '🔬'
        }
    ]
    
    return jsonify({
        'status': 'success',
        'total': len(projects),
        'projects': projects
    }), 200

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """Get technical skills"""
    skills = {
        'AI & Machine Learning': 95,
        'Full-Stack Development': 90,
        'Data Analysis': 88,
        'Cloud & DevOps': 80,
        'Python Programming': 92,
        'JavaScript/React': 88,
        'Database Design': 85,
        'API Development': 90
    }
    
    return jsonify({
        'status': 'success',
        'skills': skills
    }), 200

# ==================== Error Handlers ====================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'error': 'Internal server error'}), 500

# ==================== Main ====================

if __name__ == '__main__':
    print("\n" + "="*70)
    print("🚀 PREMIUM PORTFOLIO BACKEND SERVER")
    print("="*70)
    print(f"\n📍 Server:        http://localhost:5000")
    print(f"✨ CORS:          Enabled")
    print(f"📧 Gmail:         {'✓ Configured' if GMAIL_USER and GMAIL_APP_PASSWORD else '✗ Not Configured'}")
    print(f"\n📋 API ENDPOINTS:")
    print(f"   • GET  /api/health          - Health check")
    print(f"   • POST /api/contact         - Contact form (with Gmail)")
    print(f"   • GET  /api/messages        - Get all messages")
    print(f"   • GET  /api/projects        - Get projects")
    print(f"   • GET  /api/skills          - Get skills")
    print(f"\n💡 GMAIL SETUP:")
    print(f"   1. Enable 2-Step Verification in Google Account")
    print(f"   2. Generate App Password (Security > App Passwords)")
    print(f"   3. Update GMAIL_USER and GMAIL_APP_PASSWORD in code")
    print("\n" + "="*70 + "\n")
    
    if not GMAIL_USER or not GMAIL_APP_PASSWORD or 'your_' in GMAIL_USER:
        print("⚠️  WARNING: Gmail credentials not configured!")
        print("    Email notifications will not work until you set them up.\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')