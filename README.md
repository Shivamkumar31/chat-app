# MERN Chat Application

> Real-time chat application built with the MERN stack (MongoDB, Express, React, Node) and Socket.IO.

---

## Table of Contents

* [Demo](#https://chat-app-ruddy-nine-52.vercel.app/login)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Environment Variables](#environment-variables)
  * [Install & Run (Development)](#install--run-development)
* [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [API Endpoints](#api-endpoints)
* [WebSocket Events](#websocket-events)
* [Deployment](#deployment)
* [Testing](#testing)
* [Contributing](#contributing)
* [License](#license)
* [Credits](#credits)

---

## Demo

Add a link to a live demo or screenshots here (e.g., GitHub Pages, Vercel, Heroku, Netlify).

Example:

```
https://your-demo-url.example.com
```

---

## Features

* Real-time one-to-one and group chat using Socket.IO
* User authentication (JWT) with login and registration
* Persistent message history stored in MongoDB
* Online presence / typing indicators
* Read receipts and message status
* Responsive UI built with React
* File/image upload support (optional)

---

## Tech Stack

* **Frontend:** React, React Router, Context API / Redux, Socket.IO client
* **Backend:** Node.js, Express, Socket.IO server
* **Database:** MongoDB (Mongoose)
* **Auth:** JSON Web Tokens (JWT), bcrypt for password hashing
* **Dev Tools:** concurrently, nodemon

---

## Getting Started

### Prerequisites

* Node.js v16+ (or latest LTS)
* npm or yarn
* MongoDB instance (local or cloud — e.g., Atlas)

### Environment Variables

Create a `.env` file in the `server` folder with the following variables (example):

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/chat-app?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:3000
```

If the frontend needs env variables (e.g., `REACT_APP_API_URL`), create a `.env` in the `client` folder:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

### Install & Run (Development)

1. Clone the repo:

```
git clone https://github.com/yourusername/mern-chat-app.git
cd mern-chat-app
```

2. Install dependencies for server and client:

```
# from project root (if you have scripts using workspaces) or separately
cd server
npm install

cd ../client
npm install
```

3. Run both server and client (option A: separate terminals):

```
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm start
```

Option B: using `concurrently` from project root (if configured):

```
npm run dev:all
```

Now open `http://localhost:3000`.

---

## Available Scripts

### Server (in `/server`)

* `npm run dev` — start server with nodemon
* `npm start` — start server in production

### Client (in `/client`)

* `npm start` — start React dev server
* `npm run build` — build for production

---

## Project Structure

```
mern-chat-app/
├─ client/                # React frontend
│  ├─ public/
│  └─ src/
│     ├─ components/
│     ├─ pages/
│     ├─ context/        # auth/socket state
│     └─ utils/
├─ server/                # Express + Socket.IO backend
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  └─ socket/
├─ .env
├─ package.json           # workspace or root scripts
└─ README.md
```

---

## API Endpoints (example)

> Base: `http://localhost:5000/api`

### Auth

* `POST /api/auth/register` — Register user (`{ name, email, password }`)
* `POST /api/auth/login` — Login user (`{ email, password }`) -> returns JWT
* `GET /api/auth/me` — Get current user (protected)

### Users

* `GET /api/users` — Get list of users (protected)
* `GET /api/users/:id` — Get user by id (protected)

### Messages

* `POST /api/messages` — Save a message
* `GET /api/messages/:chatId` — Get message history for chat

Adjust according to your implementation.

---

## WebSocket Events (Socket.IO)

**Client -> Server**

* `connect` — handshake
* `setup` — send user info after connecting (e.g., userId / token)
* `join chat` — join a room for private chat
* `typing` / `stop typing`
* `new message` — emit a message object to server

**Server -> Client**

* `connected` — acknowledgment
* `message received` — broadcast message to room participants
* `typing` / `stop typing`
* `user online` / `user offline`

---

## Deployment

* Build the React app (`client`) and serve static files from the Express server in production.
* Recommended: Deploy backend to Heroku / Render / Railway, and MongoDB to Atlas.
* Or deploy frontend to Vercel/Netlify and backend separately.

Minimal production server setup (Express):

```js
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
```

---

## Testing

* Add unit/integration tests for REST endpoints (Jest + Supertest)
* Add E2E tests for core flows (Cypress / Playwright)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add ..."`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow conventional commits and write clear PR descriptions.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

## Credits

Inspired by many open-source chat apps and tutorials. Replace with your own credits or links to resources.

---

If you want, I can:

* generate a shorter README variant for GitHub's README preview
* add example `.env` and sample `.gitignore`
* or create a `README.md` file directly in this repo (if you provide repo access)
