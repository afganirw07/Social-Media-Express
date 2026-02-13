# Social Media Express API

A backend API for downloading media from various social media platforms, built with Express and Typescript.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Social Media Downloaders](#social-media-downloaders)
- [Input Validation](#input-validation)

## Getting Started

### Base URL
`http://localhost:9000/api`

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` file (JWT_SECRET, DATABASE_URL, etc.)
3. Run the server:
   ```bash
   npm run dev
   ```

## Authentication

The API uses JWT (JSON Web Token) for authentication. For protected routes, you must include the token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## API Endpoints

### User Management

| Endpoint | Method | Description | Auth |
| :--- | :--- | :--- | :--- |
| `/user` | `POST` | Register a new user | No |
| `/login` | `POST` | User login | No |
| `/user` | `GET` | Get all users | No |
| `/user/:id` | `GET` | Get user by ID | Yes |
| `/user/:id` | `PUT` | Update user details | Yes |
| `/user/:id` | `DELETE` | Delete user | Yes |

### Social Media Downloaders

All downloader endpoints require **Authentication**.

| Endpoint | Method | Description | Input Fields | Valid URL Prefix |
| :--- | :--- | :--- | :--- | :--- |
| `/facebook` | `POST` | Download Facebook Video | `url`, `fileType`, `userId` | `https://www.facebook` |
| `/instagram` | `POST` | Download Instagram Video | `url`, `fileType`, `userId` | `https://www.instagram` |
| `/tiktok` | `POST` | Download TikTok Video | `url`, `fileType`, `userId` | `https://vt.tiktok` |
| `/twitter` | `POST` | Download Twitter Video | `url`, `fileType`, `userId` | `https://x.com` |
| `/youtube` | `POST` | Download YouTube Video | `url`, `fileType`, `userId` | `https://youtu` |

---

## Input Validation

The API uses **Zod** for request body validation.

### User Schema (`/user`)
- `email`: Valid email format.
- `username`: 3 - 50 characters.
- `password`: 6 - 100 characters.

### Downloader Schema
All downloader endpoints (`/facebook`, `/instagram`, etc.) share a similar structure:
- `url`: Must be a valid URL and match the platform's prefix.
- `fileType`: String (Required, max 50 characters).
- `userId`: String (Required, max 50 characters).
