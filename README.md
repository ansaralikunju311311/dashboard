# Finance Dashboard

A modern, responsive Finance Dashboard built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Recharts. This project features a modular architecture designed to provide a comprehensive financial overview, transaction management, insights, and simulated role-based access control.

## Features

- **Dashboard Overview:** Comprehensive visualizations of key financial metrics using interactive charts.
- **Transaction Table:** Robust, filterable, and paginated table for viewing and managing transactions.
- **Insights Panel:** Actionable financial insights derived from user data.
- **Role-Based Access Control (RBAC):** Simulated permissions management for different user roles (e.g., Admin, Manager).
- **Responsive Design:** Optimized for seamless usage across desktop, tablet, and mobile devices.
- **Premium UI:** Custom, modern aesthetic built with Tailwind CSS, featuring glassmorphism and subtle animations.

## Tech Stack

- **Core:** React 18, TypeScript, Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Charts & Data Visualization:** Recharts
- **Routing:** React Router v6
- **Date Handling:** date-fns

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) installed on your machine.

### Installation

1. Open your terminal and navigate to the project directory.
2. Install the necessary dependencies:

```bash
npm install
```

### Running the Development Server

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

By default, the application will be accessible at `http://localhost:5173/`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate the production-ready assets in the `dist` folder. You can preview the built files locally using:

```bash
npm run preview
```

## Project Structure

A brief overview of the main directories within the `src` folder:

```text
src/
├── components/      # Reusable presentational and UI components (e.g., Button, Table, Charts)
├── features/        # Feature-based logic, including Redux slices (e.g., financeSlice, uiSlice)
├── hooks/           # Custom React hooks (e.g., useTheme, useTransactions)
├── pages/           # High-level page components and layout views
├── store/           # Redux store configuration and setup
├── types/           # Global TypeScript interfaces and type definitions
├── App.tsx          # Main application root component
└── main.tsx         # Application entry point and providers setup
```

## Standardized Components

The dashboard heavily relies on standardized UI components to ensure a consistent look and feel across all pages. Notable components include:

- `Table`: A highly reusable table component that supports rendering custom cell content and standardizing data display.
- `Input` & `Select`: Form controls designed with the unified dashboard aesthetic.
- `ChartWrapper`: A versatile wrapper for Recharts that ensures responsive behavior and consistent container styling.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds the app for production using Vite.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Serves the production build locally.

---
*Built with ❤️ utilizing the latest modern web development practices.*
