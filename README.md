# 🍽️ TastyNest - Premium Restaurant Marketplace

**TastyNest** is a high-end, full-stack restaurant management and ordering platform. Designed with a "Charcoal & Gold" premium aesthetic, it offers a seamless gourmet dining experience from discovery to delivery.

---

## ✨ Key Features

### 🛒 Customer Experience
- **Gourmet Menu**: Interactive browsing with horizontal Swiper sliders and "Veg-Only" dietary toggles.
- **Smart Search & Discovery**: Instant real-time filtering to find dishes as you type.
- **Persistent Address Management**: Profile-based logistics system to store and manage delivery details (Street, City, Pincode).
- **Verified Checkout**: Mandatory delivery verification during the checkout workflow for error-free logistics.
- **Glassmorphic UI**: Modern, translucent design with gold accents and smooth `Animate.css` transitions.
- **Session Persistence**: Robust state re-hydration using `localStorage` to prevent logout on page refresh.

### 🛠️ Admin & Business Intelligence
- **Sales Analytics Dashboard**: Visual intelligence suite with Area, Bar, and Pie charts using `Recharts` for real-time performance tracking.
- **Live Order Management**: Industrial-grade console for processing and tracking incoming gourmet requests.
- **Advanced Inventory Suite**: Add dishes with specialized badges (Best Seller, Rating), popularity tags, and dietary markers.

### 🔐 Enterprise Security
- **JWT Protection Layer**: Centralized `verifyToken` middleware securing all private backend APIs.
- **Global API Interceptor**: Customized `axiosInstance` for automatic authorization header injection across the application.
- **Frontend Route Guards**: Rigorous `ProtectedRoute` wrappers that instantly deflect unauthorized access attempts to administrative dashboards.

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
