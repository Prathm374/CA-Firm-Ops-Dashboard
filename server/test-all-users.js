const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:5000/api';

const testUsers = [
  {
    name: 'Admin User',
    email: 'admin@cafirm.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Manager User',
    email: 'manager@cafirm.com',
    password: 'manager123',
    role: 'manager'
  },
  {
    name: 'Staff User',
    email: 'staff@cafirm.com',
    password: 'staff123',
    role: 'staff'
  },
  {
    name: 'Senior Manager',
    email: 'senior.manager@cafirm.com',
    password: 'senior123',
    role: 'manager'
  },
  {
    name: 'Junior Staff',
    email: 'junior.staff@cafirm.com',
    password: 'junior123',
    role: 'staff'
  },
  {
    name: 'System Admin',
    email: 'system.admin@cafirm.com',
    password: 'system123',
    role: 'admin'
  }
];

async function testUserLogin(user) {
  try {
    console.log(`\n🔐 Testing login for ${user.name} (${user.role})...`);
    
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ ${user.name} login successful`);
      console.log(`   Role: ${data.user.role}`);
      console.log(`   Token: ${data.token.substring(0, 20)}...`);
      
      // Test protected route
      const profileResponse = await fetch(`${API_BASE}/auth/profile/${data.user.id}`, {
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      });

      if (profileResponse.ok) {
        console.log(`✅ Profile access successful for ${user.name}`);
      } else {
        console.log(`❌ Profile access failed for ${user.name}`);
      }
      
      return true;
    } else {
      console.log(`❌ ${user.name} login failed: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Error testing ${user.name}: ${error.message}`);
    return false;
  }
}

async function testAllUsers() {
  console.log('🧪 Testing Authentication for All User Types...\n');
  
  let successCount = 0;
  let totalCount = testUsers.length;

  for (const user of testUsers) {
    const success = await testUserLogin(user);
    if (success) successCount++;
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Test Results:`);
  console.log(`✅ Successful logins: ${successCount}/${totalCount}`);
  console.log(`❌ Failed logins: ${totalCount - successCount}/${totalCount}`);

  if (successCount === totalCount) {
    console.log('\n🎉 All authentication tests passed!');
  } else {
    console.log('\n⚠️  Some authentication tests failed.');
  }
}

// Wait a bit for server to start, then run tests
setTimeout(() => {
  testAllUsers().catch(console.error);
}, 2000); 