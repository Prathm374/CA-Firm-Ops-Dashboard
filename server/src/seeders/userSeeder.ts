import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ca-firm-dashboard';

const users = [
  {
    name: 'Admin User',
    email: 'admin@cafirm.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: 'https://via.placeholder.com/150/3B82F6/FFFFFF?text=A',
    isActive: true
  },
  {
    name: 'Manager User',
    email: 'manager@cafirm.com',
    password: 'manager123',
    role: 'manager' as const,
    avatar: 'https://via.placeholder.com/150/10B981/FFFFFF?text=M',
    isActive: true
  },
  {
    name: 'Staff User',
    email: 'staff@cafirm.com',
    password: 'staff123',
    role: 'staff' as const,
    avatar: 'https://via.placeholder.com/150/F59E0B/FFFFFF?text=S',
    isActive: true
  },
  {
    name: 'Senior Manager',
    email: 'senior.manager@cafirm.com',
    password: 'senior123',
    role: 'manager' as const,
    avatar: 'https://via.placeholder.com/150/8B5CF6/FFFFFF?text=SM',
    isActive: true
  },
  {
    name: 'Junior Staff',
    email: 'junior.staff@cafirm.com',
    password: 'junior123',
    role: 'staff' as const,
    avatar: 'https://via.placeholder.com/150/EF4444/FFFFFF?text=JS',
    isActive: true
  },
  {
    name: 'System Admin',
    email: 'system.admin@cafirm.com',
    password: 'system123',
    role: 'admin' as const,
    avatar: 'https://via.placeholder.com/150/6B7280/FFFFFF?text=SA',
    isActive: true
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords and create users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        
        return {
          ...user,
          password: hashedPassword
        };
      })
    );

    // Insert users
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Successfully seeded ${createdUsers.length} users`);

    // Display created users
    console.log('\n📋 Created Users:');
    createdUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });

    console.log('\n🔑 Login Credentials:');
    users.forEach(user => {
      console.log(`- ${user.name}: ${user.email} / ${user.password}`);
    });

    console.log('\n✨ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run seeder if called directly
if (require.main === module) {
  seedUsers();
}

export { seedUsers }; 