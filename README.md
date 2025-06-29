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

- `npm run dev` - Start both frontend and backend servers
- `npm run dev:backend` - Start only the backend server
- `npm run dev:frontend` - Start only the frontend server
- `npm run install:all` - Install dependencies for all projects
- `npm run build` - Build the frontend for production

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Endpoints**:
  - `GET /api/article` - Get all articles
  - `GET /api/article/:slug` - Get article by slug
  - `GET /api/comment/:slug` - Get comments for article
  - `POST /api/comment` - Add new comment

## 🔐 Authentication

The project includes Google OAuth authentication using NextAuth.js. Make sure to configure your Google OAuth credentials in the frontend `.env.local` file.

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with custom components

## 📝 Features

- ✅ Article listing and detail pages
- ✅ Google OAuth authentication
- ✅ Comment system
- ✅ Responsive design
- ✅ In-memory data storage (backend)
- ✅ TypeScript support
- ✅ Modern UI components

## 🚨 Troubleshooting

If you encounter any issues:

1. **Port conflicts**: Kill processes using ports 3000 and 5001
2. **Dependencies**: Run `npm run install:all` to reinstall all dependencies
3. **Build issues**: Clear `.next` folder and restart servers
4. **Authentication**: Check Google OAuth credentials in `.env.local`

## 📄 License

ISC
