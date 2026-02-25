# Currency Swap Application 💱

A beautiful and intuitive currency swap form built with **React**, **TypeScript**, **Material-UI**, and **Vite** that allows users to exchange cryptocurrencies using real-time market data.

## ✨ Features

### 🎯 Core Functionality

-   **Real-time Exchange Rates**: Fetches live token prices from [Switcheo API](https://interview.switcheo.com/prices.json)
-   **Token Icons**: Displays token icons from [Switcheo Token Icons Repository](https://github.com/Switcheo/token-icons)
-   **Live Exchange Rate Calculation**: Automatically calculates conversion rates between selected currencies
-   **Form Validation**: Comprehensive input validation with helpful error messages
-   **Simulated Swap Execution**: Mock backend interaction with loading states and success notifications

### 🎨 Visual Design

-   **Smooth Animations**: Fade-in effects, hover animations, and micro-interactions
-   **Modern UI**: Clean, professional design with Material-UI components
-   **Responsive Layout**: Works seamlessly on desktop and mobile devices
-   **Enhanced Token Display**: Shows token prices, dates, and improved visual hierarchy

### ⚡ User Experience

-   **Loading States**: Skeleton components and loading indicators
-   **Error Handling**: Network error recovery with retry functionality
-   **Success Notifications**: Animated success messages after swap completion
-   **Tooltips & Hints**: Helpful information throughout the interface

### 🔧 Technical Features

-   **TypeScript**: Full type safety and IntelliSense support
-   **Vite**: Lightning-fast development and build tooling
-   **Hot Module Replacement**: Real-time updates during development
-   **Modern React**: Hooks-based architecture with functional components
-   **Optimized Performance**: Efficient rendering and state management

## 🚀 Getting Started

### Prerequisites

-   Node.js 16+
-   npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173` (or next available port).

## 🎮 How to Use

1. **Select Source Currency**: Choose the currency you want to exchange from
2. **Enter Amount**: Input the amount you wish to swap
3. **Select Target Currency**: Choose the currency you want to receive
4. **Review Exchange Rate**: See the live conversion rate between currencies
5. **Execute Swap**: Click the swap button or press `Enter` to complete the transaction

## 🛠️ Technology Stack

-   **Frontend Framework**: React 19.1.0
-   **Language**: TypeScript
-   **Build Tool**: Vite 7.0.4
-   **UI Library**: Material-UI (MUI) 7.2.0
-   **HTTP Client**: Axios 1.10.0
-   **Styling**: Emotion (CSS-in-JS)

## 📱 Responsive Design

The application is fully responsive and provides an optimal experience across:

-   **Desktop**: Full-featured interface with hover effects
-   **Tablet**: Adapted layout with touch-friendly controls
-   **Mobile**: Streamlined design optimized for smaller screens

## 🔒 Features Implemented

✅ **Required Features**:

-   [x] Currency swap form functionality
-   [x] Input validation and error messages
-   [x] Intuitive and visually attractive design
-   [x] Third-party token icons integration
-   [x] Real-time price data integration
-   [x] Vite build system (Bonus!)

✅ **Additional Enhancements**:

-   [x] Keyboard shortcut support
-   [x] Loading states and error handling
-   [x] Mobile-responsive design
-   [x] Modern gradient design system
-   [x] Glass-morphism UI effects

## 🎯 Design Philosophy

This currency swap application prioritizes:

-   **User Experience**: Intuitive controls and helpful feedback
-   **Visual Appeal**: Modern design with beautiful gradients and animations
-   **Performance**: Fast loading and smooth interactions
-   **Accessibility**: Keyboard navigation and screen reader support
-   **Responsiveness**: Works perfectly on all device sizes

## 🔄 API Integration

-   **Price Data**: `https://interview.switcheo.com/prices.json`
-   **Token Icons**: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/{SYMBOL}.svg`
-   **Error Handling**: Automatic retry on network failures
-   **Real-time Updates**: Live exchange rate calculations

---
