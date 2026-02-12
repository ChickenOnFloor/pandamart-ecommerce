# PandaMart Backend API

The backend RESTful API for the PandaMart e-commerce platform, built with Express.js and MongoDB.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Product Management**: CRUD operations for products with approval workflow
- **Shopping Cart**: User cart management with persistent storage
- **Order Processing**: Complete order lifecycle management
- **Role-based Access**: Admin, seller, and user roles with appropriate permissions
- **CORS Support**: Configurable CORS settings for frontend integration

## 📁 Project Structure

```
backend/
├── api/
│   └── index.js              # Main Express app configuration
├── config/
│   └── db.js                 # Database connection setup
├── middleware/
│   ├── auth.js               # JWT authentication middleware
│   └── role.js               # Role-based authorization middleware
├── models/
│   ├── Cart.js               # Shopping cart schema
│   ├── Order.js              # Order schema
│   ├── Product.js            # Product schema
│   └── User.js               # User schema
├── routes/
│   ├── admin.js              # Admin-specific routes
│   ├── auth.js               # Authentication routes
│   ├── cart.js               # Cart management routes
│   ├── orders.js             # Order processing routes
│   ├── products.js           # Product CRUD routes
│   ├── public.js             # Public product routes
│   └── seller.js             # Seller-specific routes
├── scripts/
│   ├── seed-products.js      # Product seeding script
│   ├── seed-users.js         # User seeding script
│   └── make-admin.js         # User role promotion script
├── .env                      # Environment variables
├── index.js                  # Entry point
├── package.json              # Dependencies and scripts
└── vercel.json               # Vercel deployment configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd saylani-ecommerce/backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend root with the following variables:

```env
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Public Products
- `GET /api/public/products` - Get all approved products
- `GET /api/public/products/:id` - Get specific product details

### Products (Authenticated)
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get product details

### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### Seller Routes
- `POST /api/seller/products` - Create new product
- `GET /api/seller/products` - Get seller's products
- `PUT /api/seller/products/:id` - Update product
- `DELETE /api/seller/products/:id` - Delete product
- `GET /api/seller/dashboard` - Get seller dashboard stats

### Admin Routes
- `GET /api/admin/users` - Get all users
- `GET /api/admin/products` - Get all products
- `GET /api/admin/stats` - Get platform statistics
- `PATCH /api/admin/products/:id/approve` - Approve product
- `DELETE /api/admin/users/:id` - Delete user
- `DELETE /api/admin/products/:id` - Delete product
- `PATCH /api/admin/users/:id/role` - Update user role

## 🔐 Authentication & Authorization

### JWT Tokens
The API uses JWT tokens for authentication, stored in HTTP-only cookies for security.

### Role-based Access
- **User**: Can browse products, manage cart, place orders
- **Seller**: All user permissions + manage own products
- **Admin**: All permissions + platform management

### Middleware
- `auth`: Validates JWT token and extracts user info
- `role`: Checks if user has required role(s)

## 🛠️ Development Scripts

### Seeding Data
```bash
# Seed default users (admin, seller, regular user)
node scripts/seed-users.js

# Seed sample products
node scripts/seed-products.js

# Promote existing user to admin
node scripts/make-admin.js user@example.com
```

### Environment Management
The API supports different environments through the `NODE_ENV` variable:
- `development`: Development mode with detailed logging
- `production`: Production mode with optimized settings

## 🚀 Deployment

### Vercel Deployment
The backend is configured for Vercel deployment with the `vercel.json` file.

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Environment Variables for Production
Ensure these variables are set in your production environment:
- `MONGO_URI`
- `JWT_SECRET`
- `CORS_ORIGIN` (comma-separated list of allowed origins)

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### API Testing
Use tools like Postman or curl to test endpoints:

```bash
# Get all public products
curl http://localhost:5000/api/public/products

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' \
  --cookie-jar cookies.txt

# Get user info (with auth)
curl http://localhost:5000/api/auth/me --cookie cookies.txt
```

## 📊 Database Models

### User
- `username`: String
- `email`: String (unique)
- `password`: String (hashed)
- `role`: Enum ['user', 'seller', 'admin']

### Product
- `name`: String
- `description`: String
- `price`: Number
- `stock`: Number
- `category`: String
- `image`: String
- `seller`: ObjectId (reference to User)
- `approved`: Boolean

### Cart
- `user`: ObjectId (reference to User)
- `items`: Array of cart items
- `createdAt`: Date
- `updatedAt`: Date

### Order
- `user`: ObjectId (reference to User)
- `items`: Array of order items
- `total`: Number
- `status`: String
- `shippingAddress`: Object
- `createdAt`: Date

## 🔧 Configuration

### CORS Settings
Configure allowed origins in `.env`:
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Cookie Security
Cookies are configured to be:
- HTTP-only (not accessible via JavaScript)
- Secure in production (HTTPS only)
- SameSite: None for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, email support@pandamart.com or open an issue in the repository.

## 🔄 Version History

- **1.0.0** - Initial release
  - User authentication and authorization
  - Product management system
  - Shopping cart functionality
  - Order processing
  - Admin dashboard features