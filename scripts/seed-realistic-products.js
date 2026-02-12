require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const { connectDB } = require('../config/db');

async function seedRealisticProducts() {
  try {
    await connectDB();

    // Find the seller user to assign products to
    const seller = await User.findOne({ email: 'seller@pandamart.com' });
    if (!seller) {
      console.error('Seller user not found! Please run seed-users.js first.');
      return;
    }

    // Clear existing products first
    await Product.deleteMany({});
    console.log('Cleared existing products...');

    // Realistic product data with actual category-appropriate images
    const products = [
      {
        name: "MacBook Pro 16-inch",
        description: "Latest MacBook Pro with M3 chip, 18GB RAM, 512GB SSD. Perfect for professionals.",
        price: 2499.99,
        stock: 15,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop"
      },
      {
        name: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading noise canceling with Dual Noise Sensor technology.",
        price: 399.99,
        stock: 25,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
      },
      {
        name: "Nike Air Max 270",
        description: "Comfortable running shoes with Air Max 270 unit for all-day comfort.",
        price: 129.99,
        stock: 40,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=600&fit=crop"
      },
      {
        name: "Levi's 501 Original Fit Jeans",
        description: "Classic straight-leg jeans with button fly and iconic details.",
        price: 69.50,
        stock: 50,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1522688285208-3c17d0f7a190?w=800&h=600&fit=crop"
      },
      {
        name: "The Psychology of Money",
        description: "Timeless lessons on wealth, greed, and happiness by Morgan Housel.",
        price: 16.99,
        stock: 100,
        category: "Books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop"
      },
      {
        name: "Atomic Habits by James Clear",
        description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
        price: 18.75,
        stock: 85,
        category: "Books",
        image: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=800&h=600&fit=crop"
      },
      {
        name: "Modern Leather Sofa",
        description: "Luxurious 3-seater leather sofa with premium craftsmanship.",
        price: 1299.99,
        stock: 8,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop"
      },
      {
        name: "Dining Table Set",
        description: "6-person dining table set with solid wood construction.",
        price: 799.99,
        stock: 12,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1533090368676-1fd25485db88?w=800&h=600&fit=crop"
      },
      {
        name: "Yoga Mat Premium",
        description: "Non-slip eco-friendly yoga mat with carrying strap.",
        price: 34.99,
        stock: 60,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop"
      },
      {
        name: "Adjustable Dumbbell Set",
        description: "Space-saving adjustable dumbbells from 5 to 52.5 lbs per arm.",
        price: 299.99,
        stock: 20,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
      },
      {
        name: "Instant Pot Duo 7-in-1",
        description: "7-in-1 electric pressure cooker with stainless steel inner pot.",
        price: 89.95,
        stock: 30,
        category: "Home",
        image: "https://images.unsplash.com/photo-1602133770392-3550305b9f2f?w=800&h=600&fit=crop"
      },
      {
        name: "KitchenAid Stand Mixer",
        description: "5-qt Artisan Series Tilt-Head Stand Mixer in classic colors.",
        price: 379.99,
        stock: 18,
        category: "Home",
        image: "https://images.unsplash.com/photo-1589003077986-6c88c82f1c2e?w=800&h=600&fit=crop"
      },
      {
        name: "Samsung 65\" 4K Smart TV",
        description: "Crystal UHD 4K HDR Smart TV with Quantum Processor 4K.",
        price: 649.99,
        stock: 10,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=600&fit=crop"
      },
      {
        name: "iPad Air",
        description: "10.9-inch iPad Air with A14 Bionic chip, Wi-Fi + Cellular.",
        price: 699.99,
        stock: 22,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1607853554439-0069ec0f1aab?w=800&h=600&fit=crop"
      },
      {
        name: "Adidas Ultraboost 22",
        description: "Running shoes with responsive BOOST midsole for maximum energy return.",
        price: 190.00,
        stock: 35,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb89e?w=800&h=600&fit=crop"
      },
      {
        name: "Men's Designer Watch",
        description: "Stainless steel luxury watch with sapphire crystal glass and Swiss movement.",
        price: 499.99,
        stock: 25,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
      },
      {
        name: "Deep Work by Cal Newport",
        description: "Rules for Focused Success in a Distracted World.",
        price: 15.49,
        stock: 75,
        category: "Books",
        image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=800&h=600&fit=crop"
      },
      {
        name: "Educated by Tara Westover",
        description: "A Memoir about education, family, and the value of knowledge.",
        price: 14.99,
        stock: 90,
        category: "Books",
        image: "https://images.unsplash.com/photo-1553852289-b09da85eae17?w=800&h=600&fit=crop"
      },
      {
        name: "Queen Size Bed Frame",
        description: "Modern upholstered bed frame with wooden legs and headboard.",
        price: 599.99,
        stock: 15,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop"
      },
      {
        name: "Office Executive Chair",
        description: "Ergonomic leather executive chair with lumbar support.",
        price: 249.99,
        stock: 20,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop"
      },
      {
        name: "Protein Powder - Vanilla",
        description: "Whey protein isolate with 25g protein per serving.",
        price: 49.99,
        stock: 100,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1598128558393-98ff62f6c084?w=800&h=600&fit=crop"
      },
      {
        name: "Resistance Bands Set",
        description: "Complete resistance band set with door anchor and exercise guide.",
        price: 29.99,
        stock: 80,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1622536368335-fae7da0e5e83?w=800&h=600&fit=crop"
      },
      {
        name: "Robot Vacuum Cleaner",
        description: "Smart robot vacuum with mapping technology and app control.",
        price: 349.99,
        stock: 25,
        category: "Home",
        image: "https://images.unsplash.com/photo-1586671267731-da885164da66?w=800&h=600&fit=crop"
      },
      {
        name: "Air Fryer Pro",
        description: "Digital air fryer with preset cooking functions and large capacity.",
        price: 129.99,
        stock: 40,
        category: "Home",
        image: "https://images.unsplash.com/photo-1602113480946-a1ef9b57c6aa?w=800&h=600&fit=crop"
      },
      {
        name: "Gaming Laptop RTX 4070",
        description: "High-performance gaming laptop with RTX 4070 and 165Hz display.",
        price: 1899.99,
        stock: 12,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop"
      },
      {
        name: "Wireless Earbuds Pro",
        description: "Noise cancelling earbuds with 30hr battery life.",
        price: 179.99,
        stock: 50,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165ee0a?w=800&h=600&fit=crop"
      },
      {
        name: "Winter Jacket Men's",
        description: "Waterproof winter jacket with thermal insulation.",
        price: 149.99,
        stock: 30,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1552346117-8c825c6c665c?w=800&h=600&fit=crop"
      },
      {
        name: "Designer Handbag",
        description: "Genuine leather handbag with gold-tone hardware.",
        price: 299.99,
        stock: 18,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b33f?w=800&h=600&fit=crop"
      },
      {
        name: "Rich Dad Poor Dad",
        description: "Robert Kiyosaki's famous book on financial literacy.",
        price: 12.99,
        stock: 120,
        category: "Books",
        image: "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?w=800&h=600&fit=crop"
      },
      {
        name: "The Subtle Art of Not Giving a F*ck",
        description: "A Counterintuitive Approach to Living a Good Life by Mark Manson.",
        price: 14.25,
        stock: 95,
        category: "Books",
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=800&h=600&fit=crop"
      },
      {
        name: "Sectional Sofa",
        description: "Large L-shaped sectional sofa with recliner options.",
        price: 2199.99,
        stock: 6,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop"
      },
      {
        name: "Coffee Table Modern",
        description: "Glass top coffee table with metal frame and storage shelf.",
        price: 199.99,
        stock: 25,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop"
      },
      {
        name: "Basketball Hoop System",
        description: "Adjustable in-ground basketball hoop with tempered glass backboard.",
        price: 499.99,
        stock: 15,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1519862480845-f10f130beb2d?w=800&h=600&fit=crop"
      },
      {
        name: "Treadmill Foldable",
        description: "Space-saving foldable treadmill with LCD display and heart rate monitor.",
        price: 799.99,
        stock: 10,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1586767719578-85e6ed5f1ebd?w=800&h=600&fit=crop"
      },
      {
        name: "Blender Professional",
        description: "High-speed blender with 1500W motor and multiple speed settings.",
        price: 149.99,
        stock: 35,
        category: "Home",
        image: "https://images.unsplash.com/photo-1575936123452-b67c344d88de?w=800&h=600&fit=crop"
      },
      {
        name: "Pressure Cooker Multi-Pot",
        description: "Multi-functional electric pressure cooker with 10-in-1 capabilities.",
        price: 129.99,
        stock: 45,
        category: "Home",
        image: "https://images.unsplash.com/photo-1607624705340-ace91312e4b7?w=800&h=600&fit=crop"
      },
      {
        name: "Smartphone Flagship Model",
        description: "Latest flagship smartphone with triple camera system and all-day battery.",
        price: 999.99,
        stock: 20,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=600&fit=crop"
      },
      {
        name: "Tablet Pro 12.9\"",
        description: "Professional tablet with stylus support and desktop-class performance.",
        price: 1099.99,
        stock: 18,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=600&fit=crop"
      },
      {
        name: "Designer Sunglasses",
        description: "UV-protection polarized sunglasses with premium frames.",
        price: 189.99,
        stock: 40,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1577803645773-f96478f0eba3?w=800&h=600&fit=crop"
      },
      {
        name: "Smart Watch Series 8",
        description: "Health monitoring smartwatch with ECG and blood oxygen sensor.",
        price: 399.99,
        stock: 25,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
      }
    ];

    // Assign the seller ID to each product and mark as approved since seller is creating them
    const productsWithSeller = products.map(product => ({
      ...product,
      seller: seller._id,
      approved: true  // Directly approve since seller is creating these
    }));

    // Insert all products
    const insertedProducts = await Product.insertMany(productsWithSeller);
    console.log(`Successfully added ${insertedProducts.length} products to the database.`);

    // Close the connection
    mongoose.connection.close();
    console.log('Product seeding completed!');
    
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

seedRealisticProducts();