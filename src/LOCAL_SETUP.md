# Local Backend Setup Guide

## Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Start Backend Server
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Start Frontend
In another terminal:
```bash
npm start
```

The frontend will run on `http://localhost:5173` (or your configured port)

## Environment Setup

Create a `.env` file in the root if you need to change the API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database

- **Type**: SQLite
- **Location**: `backend/portfolio.db`
- **Auto-created** on first run

## API Endpoints

All endpoints are prefixed with `/api/experiences`:

- `GET /` - List all experiences
- `GET /:id` - Get single experience
- `POST /` - Create experience
- `PUT /:id` - Update experience
- `DELETE /:id` - Delete experience

## Important Notes

### File Uploads (Logos)
Currently, logos are converted to base64 and stored directly in the database. For production, consider:
- Storing files on disk and saving paths
- Using cloud storage (S3, etc.)
- Implementing a proper file upload service

### Email Sending
Contact form emails are logged to the console in local mode. To enable real emails, you'd need to:
1. Configure an email service (SMTP, SendGrid, etc.)
2. Update `src/lib/localBackend.js` SendEmail method

### Authentication
The local backend currently skips authentication. For production, add:
- JWT tokens
- Password hashing (bcrypt)
- Session management

## Migrating Back to Base44

If you want to go back to Base44, just change imports:
```javascript
// Change from:
import { base44Local } from '@/lib/localBackend';

// To:
import { base44 } from '@/api/base44Client';
```

## Troubleshooting

**Port already in use?**
```bash
# Change port in backend/server.js:
const PORT = process.env.PORT || 5001;
```

**Database corruption?**
```bash
rm backend/portfolio.db
npm run dev
```

**CORS errors?**
Backend already has CORS enabled. If issues persist, check your frontend API URL matches the backend URL.