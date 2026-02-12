require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { connectDB } = require('../config/db');

async function clearProducts() {
  try {
    await connectDB();
    
    // Count existing products
    const productCount = await Product.countDocuments();
    console.log(`Found ${productCount} products to delete...`);
    
    // Delete all products
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products from the database.`);
    
    // Close the connection
    mongoose.connection.close();
    console.log('Product clearing completed.');
  } catch (error) {
    console.error('Error clearing products:', error);
  }
}

clearProducts();