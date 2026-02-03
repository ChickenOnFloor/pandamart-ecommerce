require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { connectDB } = require('../config/db');

async function seedUsers() {
  try {
    await connectDB();
    
    // Clear existing users
    await User.deleteMany({});
    console.log('Deleted existing users...');
    
    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const sellerPassword = await bcrypt.hash('seller123', 10);
    const userPassword = await bcrypt.hash('user123', 10);
    
    // Create users
    const users = [
      {
        username: 'Admin User',
        email: 'admin@pandamart.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        username: 'Seller User',
        email: 'seller@pandamart.com',
        password: sellerPassword,
        role: 'seller'
      },
      {
        username: 'Regular User',
        email: 'user@pandamart.com',
        password: userPassword,
        role: 'user'
      }
    ];
    
    await User.insertMany(users);
    console.log(`Successfully added ${users.length} users to the database.`);
    
    // Display login information
    console.log('\n--- Account Login Information ---');
    console.log('Admin Account:');
    console.log('  Email: admin@pandamart.com');
    console.log('  Password: admin123');
    console.log('');
    console.log('Seller Account:');
    console.log('  Email: seller@pandamart.com');
    console.log('  Password: seller123');
    console.log('');
    console.log('User Account:');
    console.log('  Email: user@pandamart.com');
    console.log('  Password: user123');
    console.log('----------------------------------');
    
    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding users:', error);
  }
}

seedUsers();