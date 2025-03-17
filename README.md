# Learning Management System (LMS)

This repository contains the source code for a Learning Management System (LMS) built with Next.js, TypeScript, Tailwind CSS, and Express.js. The project is divided into two main parts: the client and the server.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/lms.git
cd lms
```

2. Install dependencies for both client and server:

```bash
cd client
npm install
cd ../server
npm install
```

3. Create environment variable files for both client and server:

```bash
cp client/.env.local.example client/.env.local
cp server/.env.example server/.env
```

4. Start the development servers:

```bash
# In one terminal, start the client
cd client
npm run dev

# In another terminal, start the server
cd server
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the client application.

## Project Structure

```
.
├── client
│   ├── .next
│   ├── public
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── hooks
│   │   ├── lib
│   │   ├── state
│   │   └── types
│   ├── .env.local
│   ├── next.config.ts
│   ├── package.json
│   ├── tailwind.config.ts
│   └── tsconfig.json
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── utils
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
└── README.md
```

## Scripts

### Client

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for linting errors.

### Server

- `npm run dev`: Start the development server with hot reloading.
- `npm run build`: Compile TypeScript files.
- `npm run start`: Start the production server.

## Environment Variables

### Client

Create a `.env.local` file in the [`client`](client) directory and add the following variables:

```
NEXT_PUBLIC_API_BASE_URL
```

### Server

Create a `.env` file in the [`server`](server) directory and add the following variables:

```
MONGODB_URI
PORT
```

## Technologies Used

- **Client:**
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Radix UI](https://www.radix-ui.com/)

- **Server:**
  - [Express.js](https://expressjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Mongoose](https://mongoosejs.com/)
  - [Dotenv](https://github.com/motdotla/dotenv)