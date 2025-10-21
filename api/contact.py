from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from datetime import datetime
import re

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def validate_input(data):
    """Validate form input data"""
    errors = []
    
    # Check required fields
    required_fields = ['name', 'email', 'message']
    for field in required_fields:
        if not data.get(field) or not data[field].strip():
            errors.append(f"{field.capitalize()} is required")
    
    # Validate email format
    if data.get('email') and not validate_email(data['email']):
        errors.append("Invalid email format")
    
    # Check message length
    if data.get('message') and len(data['message'].strip()) < 5:
        errors.append("Message must be at least 5 characters long")
    
    # Check name length
    if data.get('name') and len(data['name'].strip()) < 2:
        errors.append("Name must be at least 2 characters long")
    
    return errors

def send_email(name, email, message):
    """Send email using Gmail SMTP"""
    try:
        # Get credentials from environment variables
        email_address = os.getenv('EMAIL_ADDRESS')
        email_password = os.getenv('EMAIL_PASSWORD')
        recipient_email = os.getenv('RECIPIENT_EMAIL', email_address)
        
        if not email_address or not email_password:
            logger.error("Email credentials not configured")
            return False
        
        # Create message
        msg = MIMEMultipart()
        msg['From'] = email_address
        msg['To'] = recipient_email
        msg['Subject'] = f"Portfolio Contact Form - Message from {name}"
        
        # Email body
        body = f"""
        New message from your portfolio contact form:
        
        Name: {name}
        Email: {email}
        Message: {message}
        
        Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to Gmail SMTP server
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Enable TLS encryption
        server.login(email_address, email_password)
        
        # Send email
        text = msg.as_string()
        server.sendmail(email_address, recipient_email, text)
        server.quit()
        
        logger.info(f"Email sent successfully from {email}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

def handler(request):
    """Main handler function for Vercel"""
    # Handle CORS preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    
    # Only allow POST requests
    if request.method != 'POST':
        return jsonify({
            'success': False,
            'message': 'Method not allowed'
        }), 405, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    
    try:
        # Get form data
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'No data received'
            }), 400, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        
        # Validate input
        errors = validate_input(data)
        if errors:
            return jsonify({
                'success': False,
                'message': 'Validation failed',
                'errors': errors
            }), 400, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        
        # Extract form data
        name = data['name'].strip()
        email = data['email'].strip()
        message = data['message'].strip()
        
        # Send email
        if send_email(name, email, message):
            return jsonify({
                'success': True,
                'message': 'Message sent successfully!'
            }), 200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to send message. Please try again later.'
            }), 500, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
            
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        }), 500, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
