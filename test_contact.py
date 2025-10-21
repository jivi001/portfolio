#!/usr/bin/env python3
"""
Test script to debug contact form issues
"""

import requests
import json

def test_local_server():
    """Test the local development server"""
    print("🧪 Testing local development server...")
    
    try:
        response = requests.post(
            'http://localhost:5000/api/contact',
            headers={'Content-Type': 'application/json'},
            json={
                'name': 'Test User',
                'email': 'test@example.com',
                'message': 'This is a test message'
            }
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Local server is working!")
        else:
            print("❌ Local server has issues")
            
    except requests.exceptions.ConnectionError:
        print("❌ Local server is not running")
        print("Run: python local_server.py")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_vercel_api():
    """Test the Vercel API"""
    print("\n🧪 Testing Vercel API...")
    
    try:
        response = requests.post(
            'https://jivitesh-portfolio.vercel.app/api/contact',
            headers={'Content-Type': 'application/json'},
            json={
                'name': 'Test User',
                'email': 'test@example.com',
                'message': 'This is a test message'
            }
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            print("✅ Vercel API is working!")
        else:
            print("❌ Vercel API has issues")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    print("🔍 Contact Form Debug Tool")
    print("=" * 40)
    
    test_local_server()
    test_vercel_api()
    
    print("\n📋 Troubleshooting Tips:")
    print("1. Make sure Gmail credentials are configured")
    print("2. Check Vercel environment variables")
    print("3. Verify the API endpoint is deployed")
    print("4. Check browser console for errors")

if __name__ == "__main__":
    main()
