# Social Media Express API

A backend API for downloading media from various social media platforms, built with Express and Typescript.

## Table of Contents
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Email Verification](#email-verification)
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
| `/user` | `POST` | Register a new user and send OTP. | No |
| `/login` | `POST` | Authenticate user and return JWT token. | No |
| `/user` | `GET` | Get all verified users. | No |
| `/user/:id` | `GET` | Get detailed user profile by ID. | Yes |
| `/user/:id` | `PUT` | Update user details (email, username, password). | Yes |
| `/user/:id` | `DELETE` | Remove user account. | Yes |

### Email Verification

| Endpoint | Method | Description | Input |
| :--- | :--- | :--- | :--- |
| `/verify-email` | `POST` | Verify user email using OTP code. | `email`, `otp` |
| `/resend-otp` | `POST` | Resend verification OTP to user email. | `email` |

### Social Media Downloaders

All downloader endpoints require **Authentication** and deduct 1 token from the user's balance per successful request.

| Endpoint | Method | Description | Valid URL Prefix |
| :--- | :--- | :--- | :--- |
| `/facebook` | `POST` | Download Facebook Video | `https://www.facebook` |
| `/instagram` | `POST` | Download Instagram Video | `https://www.instagram` |
| `/tiktok` | `POST` | Download TikTok Video | `https://vt.tiktok` |
| `/twitter` | `POST` | Download Twitter Video | `https://x.com` |
| `/youtube` | `POST` | Download YouTube Video | `https://youtu` |

---

## Input Validation

The API uses **Zod** for request body validation.

### User Registration (`POST /api/user`)
- `email`: Valid email format.
- `username`: 3 - 50 characters.
- `password`: 6 - 100 characters.

### User Login (`POST /api/login`)
- `email`: Valid email format.
- `password`: 6 - 100 characters.

### Downloader Endpoints
All downloader endpoints share the following input requirements:

- `url`: Must be a valid URL and match the platform's prefix.
- `filetype`: String (Required, max 50 characters).
- `userId`: String (Required, max 50 characters).

> [!NOTE]
> The `userId` in the request body is currently used for tracking balances and history. Ensure it matches the authenticated user ID.
