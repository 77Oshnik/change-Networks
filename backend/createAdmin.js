const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');

async function createAdmin() {
  await connectDB();

  const name = 'Admin';
  const email = 'admin@gmail.com';
  const password = '12345678'; // Change this to your desired password
  const role = 'admin';

  // Check if admin already exists
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists:', existing.email);
    process.exit(0);
  }

  // No manual hashing here; let the pre-save hook handle it
  const admin = new User({ name, email, password, role });
  await admin.save();
  console.log('Admin user created:', email);
  process.exit(0);
}

createAdmin().catch(err => {
  console.error('Error creating admin:', err);
  process.exit(1);
}); 