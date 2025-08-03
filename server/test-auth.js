const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testAuth() {
  console.log('Testing Authentication Endpoints...\n');

  try {
    // Test registration
    console.log('1. Testing user registration...');
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Admin',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      }),
    });

    const registerData = await registerResponse.json();
    console.log('Registration response:', registerData);

    if (registerResponse.ok) {
      console.log('✅ Registration successful\n');
    } else {
      console.log('❌ Registration failed\n');
    }

    // Test login
    console.log('2. Testing user login...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password123'
      }),
    });

    const loginData = await loginResponse.json();
    console.log('Login response:', loginData);

    if (loginResponse.ok) {
      console.log('✅ Login successful\n');
      
      // Test protected route
      console.log('3. Testing protected route...');
      const profileResponse = await fetch(`${API_BASE}/auth/profile/${loginData.user.id}`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
        },
      });

      const profileData = await profileResponse.json();
      console.log('Profile response:', profileData);

      if (profileResponse.ok) {
        console.log('✅ Protected route access successful\n');
      } else {
        console.log('❌ Protected route access failed\n');
      }
    } else {
      console.log('❌ Login failed\n');
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testAuth(); 