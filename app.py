from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os
from pathlib import Path

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# ==================== Configuration ====================

CONTACT_DATA_FILE = 'contact_messages.json'

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
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email)

# ==================== API Routes ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'message': 'Server is running'
    }), 200

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions"""
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

        # Log submission
        print(f"\n✉️  New Contact Message:")
        print(f"   Name: {name}")
        print(f"   Email: {email}")
        print(f"   Title: {title}")
        print(f"   Time: {contact_message['timestamp']}\n")

        return jsonify({
            'status': 'success',
            'message': 'Contact message received successfully',
            'data': contact_message
        }), 200

    except Exception as e:
        print(f"Error in contact handler: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/messages', methods=['GET'])
def get_messages():
    """Get all contact messages"""
    try:
        messages = load_contact_messages()
        return jsonify({
            'status': 'success',
            'total': len(messages),
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
            'icon': '🛡️'
        },
        {
            'id': 2,
            'title': 'Movie Recommendation System',
            'description': 'IMDb-like interface with AI-powered recommendations',
            'tags': ['React', 'Python', 'AI'],
            'icon': '🎬'
        },
        {
            'id': 3,
            'title': 'Mental Wellness Mirror',
            'description': 'AI-powered emotional intelligence support platform',
            'tags': ['AI', 'NLP', 'React'],
            'icon': '🧠'
        },
        {
            'id': 4,
            'title': 'Smart Allocation Engine',
            'description': 'AI-based matching for PM internship allocation',
            'tags': ['Next.js', 'ML', 'Flask'],
            'icon': '🎯'
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
    print("=" * 50)
    print("🚀 Portfolio Backend Server Starting")
    print("=" * 50)
    print("\n📍 Server running at: http://localhost:5000")
    print("✨ CORS enabled for frontend communication")
    print("\n🔗 Available Endpoints:")
    print("   • GET  /api/health")
    print("   • POST /api/contact")
    print("   • GET  /api/messages")
    print("   • GET  /api/projects")
    print("   • GET  /api/skills")
    print("\n" + "=" * 50 + "\n")
    
    app.run(debug=True, port=5000, host='0.0.0.0')
