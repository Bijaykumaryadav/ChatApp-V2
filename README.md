

# ChatApp

A full-stack chat application with real-time messaging, authentication, and a rich feature set built using React for the frontend and Express.js for the backend.

## Table of Contents
- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

## About the Project

This project is a chat application that supports one-to-one messaging, user authentication, Google OAuth, and uses Socket.io for real-time messaging. It includes a fully responsive frontend with React, and a scalable backend built on Express and MongoDB.

## Technologies Used

### Frontend
- **React**: For building UI components
- **Redux**: For managing application state
- **TailwindCSS**: For styling
- **React-Router**: For routing
- **Socket.io Client**: For real-time communication

### Backend
- **Express**: For server and API management
- **Socket.io**: For real-time WebSocket communication
- **Passport**: For authentication, with JWT and Google OAuth
- **MongoDB with Mongoose**: For database management
- **dotenv**: For environment variable management

## Features

- **Real-time Messaging**: Powered by Socket.io for instant updates.
- **JWT and Google OAuth**: User authentication with JWT for sessions and Google OAuth integration.
- **Password Reset**: Email-based password recovery.
- **User Search**: Ability to search for other users.
- **Responsive Design**: Mobile and desktop-friendly.

## Getting Started

### Prerequisites
- **Node.js** and **npm**
- **MongoDB** instance
- **Vercel** account (for deployment)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chatapp.git
   cd chatapp
   ```

2. **Install dependencies:**
   ```bash
   # For frontend
   cd frontend
   npm install

   # For backend
   cd ../backend
   npm install
   ```

### Running the App

1. **Set up environment variables** (see the [Environment Variables](#environment-variables) section below).

2. **Run the backend server:**
   ```bash
   # In the backend directory
   npm run start
   ```

3. **Run the frontend server:**
   ```bash
   # In the frontend directory
   npm run dev
   ```

The frontend should be running on `http://localhost:5173` and the backend on `http://localhost:8000` (or as specified in the environment variables).

## Project Structure

```plaintext
chatapp/
├── frontend/
│   ├── public/                  # Public assets
│   ├── src/                     # React components and Redux state
│   ├── index.html               # Entry HTML file for Vite
│   ├── tailwind.config.js       # TailwindCSS configuration
│   └── package.json
└── backend/
    ├── config/                  # Configuration files
    ├── controllers/             # Controllers for different functionalities
    ├── middleware/              # Passport strategies and other middlewares
    ├── models/                  # MongoDB models
    ├── routes/                  # Route definitions
    ├── views/                   # EJS views
    ├── .env                     # Environment variables
    └── package.json
```

## Environment Variables

In the root of the `backend` directory, create a `.env` file with the following variables:

```plaintext
PORT=8000
MONGO_URI=your_mongo_db_connection_string
SESSION_COOKIE_SECRET=your_session_cookie_secret
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Frontend (Vercel)
1. In the frontend directory, add a `vercel.json`:
   ```json
   {
     "builds": [{ "src": "vite.config.js", "use": "@vercel/static-build" }],
     "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
   }
   ```

2. Set the `build` command to `npm run build`, and the output directory to `dist`.

### Backend (Vercel)
1. In the backend directory, create a `vercel.json`:
   ```json
   {
     "version": 2,
     "builds": [{ "src": "index.js", "use": "@vercel/node" }],
     "routes": [{ "src": "/(.*)", "dest": "index.js" }]
   }
   ```

2. Set the build command to `npm install` or use the `vercel-build` script if configured.

## License

Distributed under the ISC License.
