# 🍽️ TastyNest - Premium Restaurant Marketplace

**TastyNest** is a high-end, full-stack restaurant management and ordering platform. Designed with a "Charcoal & Gold" premium aesthetic, it offers a seamless gourmet dining experience from discovery to delivery.

---

## ✨ Key Features

### 🛒 Customer Experience
- **Gourmet Menu**: Interactive, category-based food browsing with horizontal Swiper sliders.
- **Glassmorphic UI**: Modern, translucent design elements with gold accents for a premium feel.
- **Smart Cart System**: Real-time cart management with automatic item removal and live price calculation.
- **Order History**: Personal dashboard to track past gourmet journeys with real-time status updates (Placed → Cooking → Out for Delivery → Delivered).
- **Modern Notifications**: Professional, non-intrusive feedback using `react-hot-toast`.

### 🛠️ Admin Management
- **Live Order Dashboard**: Real-time management console to track and process incoming orders.
- **Product Management**: Robust "Add Product" suite with dietary indicators (Veg/Non-Veg), Best Seller badges, and customizable popularity ratings.
- **Automated Workflows**: Intelligent user role detection and secure session management.

---

## 🛠️ Technology Stack

**Frontend:**
- **React.js**: Functional components with Hooks.
- **Redux Toolkit**: Centralized state management for Users, Cart, and Orders.
- **Bootstrap 5**: Responsive layout and base components.
- **Vanilla CSS**: Custom premium theme overrides and glassmorphism.
- **Swiper.js**: Modern touch-enabled sliders for the menu.

**Backend:**
- **Node.js & Express**: Industrial-grade RESTful API architecture.
- **MongoDB**: Highly scalable NoSQL database for products, users, and transactions.
- **Cloudinary**: Cloud storage for signature dish imagery.
- **JWT**: Secure token-based authentication.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16.x or higher)
- MongoDB Connection String
- Cloudinary Account (for image uploads)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=4000
DATABASE_CONNECTION=your_mongodb_uri
PORT=your_port
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

### 4. Running the Application

**Development Mode:**
```bash
# Start the backend server (using nodemon)
nodemon server.js

# The application will be accessible at:
http://localhost:4000
```

**Production Build:**
```bash
npm run build
```

---

## 🎨 Design Philosophy
The UI follows the **"Gourmet Dark"** design language:
- **Primary Color**: `#121212` (Deep Charcoal)
- **Accent Color**: `#d4af37` (Aesthetic Gold)
- **Typography**: `Playfair Display` for headings and `Outfit` for body text.
- **Effects**: Heavy use of `backdrop-filter: blur()`, subtle 1.02x scales on hover, and smooth cubic-bezier transitions.

---

Developed with ❤️ for the future of Gourmet Dining.
