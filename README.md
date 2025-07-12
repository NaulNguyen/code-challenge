# Currency Swap Application

A modern, responsive currency swap application built with React, TypeScript, and Material-UI. This project allows users to swap between different cryptocurrencies with real-time exchange rates and an intuitive user interface.

## 🌟 Features

-   **Real-time Exchange Rates**: Fetches live cryptocurrency prices from API
-   **Intuitive Swap Interface**: Clean, user-friendly design with smooth animations
-   **Form Validation**: Comprehensive input validation with error messages
-   **Responsive Design**: Works seamlessly on desktop and mobile devices
-   **Confirmation Dialog**: User-friendly confirmation before executing swaps
-   **Success Notifications**: Beautiful success messages with transaction details

## 🛠 Tech Stack

-   **React 18** with TypeScript
-   **Vite** for fast development and building
-   **Material-UI (MUI)** for component library
-   **Axios** for API requests
-   **CSS-in-JS** with emotion/styled

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

-   Node.js (v16 or higher)
-   npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd code-challenge
    ```

2. **Navigate to the project directory**

    ```bash
    cd problem2
    ```

3. **Install dependencies**

    ```bash
    npm install
    ```

4. **Start the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
    - The app will be available at: `http://localhost:5173/`
    - Vite will automatically open your default browser

### Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build
-   `npm run lint` - Run ESLint
-   `npm run type-check` - Run TypeScript compiler check

## 🎯 Usage

1. **Select Source Currency**: Choose the currency you want to swap from
2. **Enter Amount**: Input the amount you want to swap
3. **Select Target Currency**: Choose the currency you want to swap to
4. **Review Exchange Rate**: The app will automatically calculate and display the exchange rate
5. **Confirm Swap**: Click the swap button and confirm the transaction

## 🏗 Project Structure

```
problem2/
├── src/
│   ├── components/
│   │   ├── CurrencySwap/
│   │   │   ├── index.tsx           # Main swap component
│   │   │   ├── CurrencySelect.tsx  # Currency selection dropdown
│   │   │   ├── AmountInput.tsx     # Amount input field
│   │   │   ├── SwapButton.tsx      # Swap action button
│   │   │   ├── ExchangeRate.tsx    # Exchange rate display
│   │   │   ├── Header.tsx          # App header
│   │   │   ├── StatusBar.tsx       # Status information
│   │   │   ├── Footer.tsx          # App footer
│   │   │   └── styles.ts           # Component styles
│   │   └── common/
│   │       ├── SuccessNotification.tsx
│   │       └── ConfirmSwapDialog.tsx
│   ├── types/
│   │   └── price.ts                # TypeScript interfaces
│   ├── utils/
│   │   ├── formatCurrencyAmount.ts # Currency formatting
│   │   └── getCurrencyIcon.ts      # Icon utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

**Happy Swapping! 🚀**
