# CryptoLearn AI Platform

## Overview

CryptoLearn AI Platform is a React-based learning application designed to teach cryptocurrency and blockchain concepts through interactive insights, AI-powered explanations, and comprehensive lesson modules. The platform features a modern glassmorphism design with crypto-focused aesthetics and demonstrates senior React engineering patterns.

The application provides three core learning modes: insight cards with hyperlinked concepts for quick exploration, AI chat assistance for immediate explanations, and deep lesson modules for comprehensive learning. Users can interact with cryptocurrency content through clickable concepts that trigger AI explanations, creating an engaging and educational experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses a modern React 18+ architecture with TypeScript, built on Vite for fast development and optimized builds. The UI follows a component-driven approach using ShadCN UI components with Radix UI primitives for accessibility and consistency.

**State Management**: Zustand is used for global application state, including chat messages, modal states, and user interactions. The state is persisted using Zustand's persistence middleware for maintaining user sessions.

**Routing**: Wouter provides lightweight client-side routing with three main routes - landing page, insights dashboard, and lessons page.

**UI Framework**: Tailwind CSS provides utility-first styling with custom CSS variables for theming. The design system implements glassmorphism effects with crypto-themed gradients and animations.

### Backend Architecture
The backend uses Express.js with TypeScript in ESM format. The server implements a modular route registration pattern and includes middleware for request logging and error handling.

**Development Setup**: Vite integration provides hot module replacement and development middleware. The server serves static files in production and integrates with Vite's development server.

**Storage Interface**: An abstraction layer supports both in-memory storage (for development) and database integration through a common interface pattern.

### Data Layer
**Database Integration**: Drizzle ORM with PostgreSQL support provides type-safe database operations. The configuration supports migrations and schema management through Drizzle Kit.

**Schema Design**: Shared schema definitions between client and server ensure type consistency. Zod validation schemas provide runtime type checking for API payloads.

**Query Management**: TanStack Query handles client-side data fetching, caching, and synchronization with optimistic updates and background refetching capabilities.

### Component Architecture
**Layout System**: A hierarchical layout structure with a fixed navigation bar and responsive design patterns. Components are organized by feature domains (chat, insights, lessons, layout, UI).

**Modal Management**: Global modal state management through Zustand allows for coordinated modal interactions across the application.

**Design System**: Consistent component patterns with variant-based styling using class-variance-authority for type-safe component APIs.

### API Integration Strategy
The application is designed to integrate with external AI services:

**Venice AI API**: Planned integration for privacy-preserving quick explanations through the chat system.

**Gemini API**: Intended for comprehensive lesson content generation and detailed educational responses.

**Mock Data**: Comprehensive mock data structure provides realistic development environment and testing scenarios.

## External Dependencies

**Core Framework**: React 18+ with TypeScript for type safety and modern React features including concurrent rendering and automatic batching.

**Build System**: Vite provides fast development builds, hot module replacement, and optimized production bundles with ES modules support.

**UI Components**: ShadCN UI built on Radix UI primitives ensures accessibility compliance and consistent component behavior across the application.

**Styling**: Tailwind CSS with PostCSS for utility-first styling and Autoprefixer for browser compatibility.

**State Management**: Zustand for lightweight global state with persistence middleware for session management.

**Data Fetching**: TanStack Query for server state management, caching strategies, and optimistic updates.

**Database**: PostgreSQL with Drizzle ORM for type-safe database operations and Neon Database as the hosted PostgreSQL provider.

**Animation**: Framer Motion for declarative animations and micro-interactions throughout the user interface.

**Form Handling**: React Hook Form with Hookform Resolvers for validation integration and Zod for schema validation.

**Development Tools**: ESBuild for fast server bundling, TSX for TypeScript execution, and various Replit-specific plugins for development environment integration.

**Session Management**: Connect-pg-simple for PostgreSQL-backed session storage with Express session middleware.