# Trendwise Scribe Portal

A full-stack blog platform built with Next.js frontend and Express backend.

## 🚀 Quick Start

### Option 1: Run both servers simultaneously (Recommended)
```bash
npm run dev
```

### Option 2: Run servers separately

**Backend (Port 5001):**
```bash
cd backend
npm run dev
```

**Frontend (Port 3000):**
```bash
cd trendwise
npm run dev
```

## 📁 Project Structure

```
trendwise-scribe-portal-main/
├── backend/          # Express.js API server
│   ├── index.js      # Main server file
│   └── package.json  # Backend dependencies
├── trendwise/        # Next.js frontend
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   └── package.json  # Frontend dependencies
└── package.json      # Root package.json for managing both projects
```

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:backend` - Start only the backend server
- `npm run dev:frontend` - Start only the frontend server
- `npm run install:all` - Install dependencies for all projects
- `npm run build` - Build the frontend for production
- `npm run start` - Start the frontend in production mode

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Endpoints**:
  - `GET /api/article` - Get all articles
  - `GET /api/article/:slug` - Get article by slug
  - `GET /api/comment/:slug` - Get comments for article
  - `POST /api/comment` - Add new comment

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Authentication**: NextAuth.js with Google OAuth
- **Styling**: Tailwind CSS with Radix UI components

## 📝 Features

- ✅ Article listing and detail pages
- ✅ Comment system
- ✅ Google OAuth authentication
- ✅ Responsive design
- ✅ In-memory data storage (no database required)

## 🔒 Environment Variables

The project uses environment files for configuration:
- `backend/.env` - Backend configuration
- `trendwise/.env.local` - Frontend configuration

## 🚨 Troubleshooting

If you encounter issues:

1. **Port conflicts**: Kill processes using ports 3000 and 5001
   ```bash
   lsof -ti:3000 | xargs kill -9
   lsof -ti:5001 | xargs kill -9
   ```

2. **Missing dependencies**: Reinstall all dependencies
   ```bash
   npm run install:all
   ```

3. **Build cache issues**: Clear Next.js cache
   ```bash
   cd trendwise
   rm -rf .next
   npm run dev
   ```

## 📄 License

ISC
