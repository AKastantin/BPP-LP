# Big Picture Property - AI-Powered Real Estate Intelligence Platform

## Overview

Big Picture Property is a comprehensive real estate technology platform that leverages artificial intelligence, machine learning, and big data analytics to transform property decision-making. The platform serves multiple audiences including banks & lenders, estate agents, property investors, and property owners by providing AI-powered property valuations, predictive analytics, and hyper-local market intelligence.

The application features a modern landing page with interactive tools including a property forecast calculator and survey forms, built to capture leads and demonstrate the platform's capabilities across different real estate market segments.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern component-based architecture using React 18 with TypeScript for type safety
- **Vite Build System**: Fast development server and optimized production builds
- **Tailwind CSS + shadcn/ui**: Utility-first CSS framework with a comprehensive component library for consistent UI design
- **Wouter Router**: Lightweight client-side routing solution
- **React Hook Form + Zod**: Form management with schema validation for user inputs
- **TanStack Query**: Server state management and API interaction layer

### Backend Architecture
- **Express.js Server**: RESTful API server with middleware for request processing and error handling
- **TypeScript**: Full-stack type safety with shared schema definitions
- **In-Memory Storage**: Development storage implementation with interface for easy database integration
- **API-First Design**: Clean separation between frontend and backend with dedicated API endpoints

### Data Management
- **Drizzle ORM**: Type-safe database toolkit configured for PostgreSQL
- **Shared Schema**: Centralized data models using Drizzle and Zod for consistent validation
- **Lead Management**: Comprehensive lead tracking system supporting multiple audience types and sources
- **Property Forecasting**: Structured data models for property valuation requests and results

### Component Architecture
- **Section-Based Layout**: Modular sections (Hero, Problem Statement, Solutions, Interactive Tools, etc.)
- **Audience-Targeted Content**: Dynamic content switching based on user type (banks, agents, investors, owners)
- **Interactive Tools**: Embedded forms for property forecasting and user surveys with real-time feedback
- **Analytics Integration**: Google Analytics implementation with custom event tracking

### Development Environment
- **Replit Integration**: Development environment optimized for Replit with runtime error handling
- **Hot Module Replacement**: Fast development feedback loop with Vite HMR
- **TypeScript Strict Mode**: Enhanced code quality with strict type checking

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form for modern frontend development
- **Build Tools**: Vite for development and build processes, esbuild for server bundling
- **UI Components**: Radix UI primitives with shadcn/ui component system for accessible design

### Database & ORM
- **Drizzle ORM**: Type-safe database operations with PostgreSQL dialect
- **Neon Database**: Serverless PostgreSQL database for production deployment
- **Database Migrations**: Drizzle Kit for schema management and migrations

### Styling & Design
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Class Variance Authority**: Component variant management
- **Lucide React**: Comprehensive icon library

### Analytics & Tracking
- **Google Analytics**: Web analytics for user behavior tracking and conversion monitoring
- **Custom Event Tracking**: Business-specific analytics for lead generation and user interaction

### Validation & Forms
- **Zod**: Schema validation for both frontend and backend
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

### Development Tools
- **TypeScript**: Static type checking across the entire application
- **ESLint/Prettier**: Code quality and formatting (implied by project structure)
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Fonts & Assets
- **Google Fonts**: Inter, DM Sans, Fira Code, Geist Mono, and Architects Daughter for typography
- **Unsplash Images**: High-quality stock photography for visual content