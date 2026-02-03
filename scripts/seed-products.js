require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const { connectDB } = require('../config/db');

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal clear sound quality.",
    price: 129.99,
    stock: 25,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Smart Fitness Watch",
    description: "Track your heart rate, sleep, steps, and more with this advanced smartwatch featuring GPS and water resistance.",
    price: 199.99,
    stock: 40,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and eco-friendly t-shirt made from 100% organic cotton with a relaxed fit.",
    price: 24.99,
    stock: 100,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Double-walled insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.99,
    stock: 60,
    category: "Home",
    image: "https://images.unsplash.com/photo-1589365278144-c9e653dfffcb?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Charges up to 7.5W.",
    price: 19.99,
    stock: 80,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606220588911-4a4260c1d7f1?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots and cash compartment. Minimalist design.",
    price: 45.99,
    stock: 35,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b0a2?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Lamp with USB Ports",
    description: "Modern LED desk lamp with adjustable brightness and dual USB charging ports.",
    price: 39.99,
    stock: 45,
    category: "Home",
    image: "https://images.unsplash.com/photo-1588854392843-6aba79bbf745?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes with extra cushioning and breathable mesh upper for comfort.",
    price: 89.99,
    stock: 30,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe that keeps coffee hot for hours.",
    price: 79.99,
    stock: 20,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1498124303053-7edb2aae0598?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Backpack",
    description: "Water-resistant backpack with laptop compartment and multiple pockets for organization.",
    price: 59.99,
    stock: 50,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 360-degree sound and 20-hour battery life.",
    price: 79.99,
    stock: 35,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Yoga Mat",
    description: "Non-slip eco-friendly yoga mat with carrying strap for convenience.",
    price: 29.99,
    stock: 70,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1545436135-e4bde8188536?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Sunglasses",
    description: "UV protection sunglasses with polarized lenses and lightweight frame.",
    price: 59.99,
    stock: 40,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Coffee Beans - Premium Blend",
    description: "Ethically sourced premium coffee beans roasted to perfection. 12oz bag.",
    price: 16.99,
    stock: 100,
    category: "Food",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Wireless Earbuds",
    description: "True wireless earbuds with noise cancellation and 24-hour battery life.",
    price: 149.99,
    stock: 30,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Cotton Bed Sheets Set",
    description: "Soft 4-piece bed sheet set made from 100% Egyptian cotton. Available in multiple colors.",
    price: 69.99,
    stock: 25,
    category: "Home",
    image: "https://images.unsplash.com/photo-1578706662909-1f0368fc9510?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Smartphone Case",
    description: "Protective smartphone case with shock-absorbing corners and raised edges.",
    price: 19.99,
    stock: 150,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Organizer",
    description: "Wooden desk organizer with compartments for pens, paper clips, and office supplies.",
    price: 34.99,
    stock: 45,
    category: "Office",
    image: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Cookware Set",
    description: "10-piece non-stick cookware set with tempered glass lids and stay-cool handles.",
    price: 129.99,
    stock: 15,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1589829545853-4b6fb0d1d9c2?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Winter Scarf",
    description: "Warm knitted scarf made from soft acrylic blend. Perfect for cold weather.",
    price: 24.99,
    stock: 60,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1591369822091-8b8dbc2c6c7c?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Digital Camera",
    description: "24MP digital camera with 4K video recording and built-in WiFi connectivity.",
    price: 499.99,
    stock: 10,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Chair",
    description: "Ergonomic office chair with lumbar support and adjustable height settings.",
    price: 179.99,
    stock: 12,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Tea Collection",
    description: "Assorted collection of premium teas in reusable tins. 6 different flavors.",
    price: 32.99,
    stock: 50,
    category: "Food",
    image: "https://images.unsplash.com/photo-1544943903-78d5af8ffe4f?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Yoga Block",
    description: "Lightweight yoga block made from eco-friendly EVA foam for support and balance.",
    price: 12.99,
    stock: 80,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1588944285133-2c0d4c8b5b8c?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Wall Art Canvas",
    description: "Modern abstract canvas print ready to hang. Multiple sizes available.",
    price: 49.99,
    stock: 25,
    category: "Home",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Lamp",
    description: "Adjustable LED desk lamp with touch controls and multiple brightness settings.",
    price: 34.99,
    stock: 40,
    category: "Home",
    image: "https://images.unsplash.com/photo-1588854392843-6aba79bbf745?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Sneakers",
    description: "Comfortable everyday sneakers with cushioned sole and breathable material.",
    price: 79.99,
    stock: 35,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb89e?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Blender",
    description: "High-speed blender with multiple settings and 1200W motor power.",
    price: 89.99,
    stock: 20,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1572448863793-1f5bde6a1f43?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Sweatshirt",
    description: "Cozy cotton sweatshirt with kangaroo pocket and ribbed cuffs.",
    price: 39.99,
    stock: 75,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Calendar",
    description: "Eco-friendly desk calendar with monthly planning space and inspirational quotes.",
    price: 14.99,
    stock: 60,
    category: "Office",
    image: "https://images.unsplash.com/photo-153559874564d-e27b23c44d0d?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Sunglasses",
    description: "Designer sunglasses with UV protection and polarized lenses.",
    price: 89.99,
    stock: 25,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Coffee Table Book",
    description: "Beautiful coffee table book with stunning photography and art.",
    price: 29.99,
    stock: 40,
    category: "Books",
    image: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Fitness Tracker",
    description: "Advanced fitness tracker with heart rate monitor and sleep analysis.",
    price: 69.99,
    stock: 55,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1574806192068-427a36e227d6?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Throw Pillow",
    description: "Decorative throw pillow with removable cover and hypoallergenic filling.",
    price: 19.99,
    stock: 90,
    category: "Home",
    image: "https://images.unsplash.com/photo-1594104219413-9fbe6f071f13?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Calendar",
    description: "Minimalist desk calendar with daily quotes and weekly planning sections.",
    price: 17.99,
    stock: 50,
    category: "Office",
    image: "https://images.unsplash.com/photo-153559874564d-e27b23c44d0d?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Jacket",
    description: "Water-resistant jacket perfect for outdoor activities with multiple pockets.",
    price: 79.99,
    stock: 30,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Sneakers",
    description: "Athletic sneakers with extra cushioning and breathable mesh material.",
    price: 89.99,
    stock: 45,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb89e?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Tea Kettle",
    description: "Stainless steel tea kettle with ergonomic handle and whistle.",
    price: 34.99,
    stock: 35,
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1602790383480-27e0c0e4ac8e?auto=format&fit=crop&w=600&h=600&q=80"
  },
  {
    name: "Desk Organizer",
    description: "Multi-compartment desk organizer for pens, paperclips, and small office supplies.",
    price: 24.99,
    stock: 60,
    category: "Office",
    image: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?auto=format&fit=crop&w=600&h=600&q=80"
  }
];

async function seedProducts() {
  try {
    await connectDB();
    
    // Find the default seller
    const defaultSeller = await User.findOne({ email: 'seller@example.com' });
    if (!defaultSeller) {
      console.error('Default seller not found!');
      mongoose.connection.close();
      return;
    }
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Deleted existing products...');
    
    // Prepare products with the default seller
    const productsWithSeller = sampleProducts.map(product => ({
      ...product,
      seller: defaultSeller._id,
      approved: true  // Mark as approved so they appear in the store
    }));
    
    // Insert new products
    await Product.insertMany(productsWithSeller);
    console.log(`Successfully added ${productsWithSeller.length} products to the database.`);
    
    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

seedProducts();