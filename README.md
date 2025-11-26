# PaceStacks Monorepo

[![PaceStacks Logo](https://img.shields.io/badge/PaceStacks-Project-blue)](https://github.com/onosejoor/pacestacks)

This monorepo orchestrates a modern full-stack application, providing robust inventory and document management capabilities. It features a Next.js frontend built with TypeScript and a powerful Node.js Express backend, seamlessly integrated with MongoDB via Mongoose. Designed for scalability and maintainability, PaceStacks offers a comprehensive solution for managing products and documents with secure authentication and role-based access control.

## 🚀 Getting Started

Follow these steps to set up and run PaceStacks on your local machine.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/onosejoor/pacestacks.git
    cd pacestacks
    ```

2.  **Install Dependencies:**
    This project uses a monorepo structure. You need to install dependencies for both the client (frontend) and server (backend).

    *   **Client (Frontend):**
        ```bash
        cd client
        npm install # or yarn install
        cd ..
        ```
    *   **Server (Backend):**
        ```bash
        cd server
        npm install # or yarn install
        cd ..
        ```

### Environment Variables

Both the client and server components require specific environment variables for proper operation. Create a `.env` file in both the `client` and `server` directories based on the examples below.

#### Client (`client/.env.local`)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8080/v1/api
```

#### Server (`server/.env`)

```env
PORT=8080
MONGODB_URI=mongodb://localhost:27017/pacestacks_db
JWT_ACCESS_SECRET=supersecretjwtaccesskey
JWT_REFRESH_SECRET=supersecretjwtrefreshkey
NODE_ENV=development # or production
```

### Usage

1.  **Start the Backend Server:**
    Navigate to the `server` directory and start the server.
    ```bash
    cd server
    npm run dev
    # The server will start on http://localhost:8080 (or your specified PORT)
    ```

2.  **Start the Frontend Application:**
    Open a new terminal, navigate to the `client` directory, and start the Next.js development server.
    ```bash
    cd client
    npm run dev
    # The client application will be available at http://localhost:3000
    ```

## ✨ Features

*   **User Authentication & Authorization**: Secure registration, login, JWT-based access tokens, refresh tokens, and role-based access control (Staff & Admin).
*   **Product Management**: Comprehensive CRUD (Create, Read, Update, Delete) operations for inventory products, including search and pagination.
*   **Document Management**: Upload, store, retrieve, preview, download, and delete documents (PDF, DOCX) with file size and type validation.
*   **Responsive UI**: Modern and intuitive user interface built with Next.js and Shadcn UI.
*   **Monorepo Structure**: Organized codebase for both frontend and backend, promoting code sharing and efficient development.
*   **Error Handling & Logging**: Centralized error management and request logging for improved debugging and system monitoring.

## 💻 Technologies Used

| Category     | Technology          | Description                                           | Link                                                         |
| :----------- | :------------------ | :---------------------------------------------------- | :----------------------------------------------------------- |
| **Frontend** | Next.js             | React framework for production                        | [Next.js](https://nextjs.org/)                               |
|              | React               | JavaScript library for building user interfaces       | [React](https://react.dev/)                                  |
|              | TypeScript          | Typed superset of JavaScript                          | [TypeScript](https://www.typescriptlang.org/)                |
|              | Tailwind CSS        | Utility-first CSS framework                           | [Tailwind CSS](https://tailwindcss.com/)                     |
|              | Shadcn UI           | Reusable UI components for React                      | [Shadcn UI](https://ui.shadcn.com/)                          |
|              | SWR                 | React Hooks for data fetching                         | [SWR](https://swr.vercel.app/)                               |
|              | Axios               | Promise-based HTTP client                             | [Axios](https://axios-http.com/)                             |
|              | Zod                 | TypeScript-first schema declaration and validation    | [Zod](https://zod.dev/)                                      |
| **Backend**  | Node.js             | JavaScript runtime environment                        | [Node.js](https://nodejs.org/en)                             |
|              | Express.js          | Fast, unopinionated, minimalist web framework         | [Express.js](https://expressjs.com/)                         |
|              | Mongoose            | MongoDB object data modeling (ODM)                    | [Mongoose](https://mongoosejs.com/)                          |
|              | Argon2              | Password hashing library                              | [Argon2](https://github.com/P-H-C/phc-argon2)                |
|              | JOSE                | JSON Web Key and JSON Web Token library               | [JOSE](https://github.com/panva/jose)                        |
|              | Multer              | Node.js middleware for handling `multipart/form-data` | [Multer](https://github.com/expressjs/multer)                |
|              | Pino                | Extremely fast Node.js logger                         | [Pino](https://getpino.io/)                                  |
|              | Helmet              | HTTP header security middleware                       | [Helmet](https://helmetjs.github.io/)                        |
|              | Cookie-Parser       | Parse Cookie header and populate `req.cookies`        | [Cookie-Parser](https://www.npmjs.com/package/cookie-parser) |
|              | Morgan              | HTTP request logger middleware                        | [Morgan](https://www.npmjs.com/package/morgan)               |

---

# PaceStacks API

## Overview
The PaceStacks API is a robust backend service built with Node.js, Express.js, and TypeScript, utilizing Mongoose for MongoDB interactions. It provides secure authentication, role-based access control, and comprehensive functionalities for managing products and documents.

## Features
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web application framework for routing and middleware.
- **Mongoose**: Object Data Modeling (ODM) for MongoDB.
- **TypeScript**: Statically typed superset of JavaScript for enhanced code quality.
- **Argon2**: Secure password hashing for user authentication.
- **JOSE**: JSON Web Token (JWT) implementation for session management and access control.
- **Multer**: Middleware for handling `multipart/form-data` for file uploads.
- **Zod**: Runtime schema validation for API requests.
- **Pino**: High-performance logger for server operations.
- **Helmet**: Enhances API security by setting various HTTP headers.
- **Cookie-Parser**: Parses incoming request cookies.
- **Morgan**: HTTP request logger middleware.

## Getting Started
### Installation
Navigate to the `server` directory and install the dependencies:
```bash
cd server
npm install
```

### Environment Variables
The server requires the following environment variables. Create a `.env` file in the `server` directory.

| Variable             | Example Value                                  | Description                           |
| :------------------- | :--------------------------------------------- | :------------------------------------ |
| `PORT`               | `8080`                                         | Port for the Express server           |
| `MONGODB_URI`        | `mongodb://localhost:27017/pacestacks_db`      | Connection string for MongoDB         |
| `JWT_ACCESS_SECRET`  | `your_jwt_access_secret_key`                   | Secret key for signing access tokens  |
| `JWT_REFRESH_SECRET` | `your_jwt_refresh_secret_key`                  | Secret key for signing refresh tokens |
| `NODE_ENV`           | `development` (or `production`, `test`)        | Application environment mode          |

## API Documentation
### Base URL
The base URL for all API endpoints is `/v1/api`.

### Endpoints

#### POST /v1/api/auth/register
Registers a new user with a specified role.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123",
  "name": "John Doe",
  "role": "staff"
}
```
**Response**:
```json
{
  "success": true,
  "message": "User created successfully"
}
```
**Errors**:
- `400 Bad Request`: "Invalid data", "email or username already exists"
- `500 Internal Server Error`: "Internal error"

#### POST /v1/api/auth/login
Authenticates a user and issues access and refresh tokens.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "success": true,
  "message": "User signed in successfully"
}
```
**Errors**:
- `400 Bad Request`: "Invalid Credentials", "Invalid data"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/auth/refresh-token
Refreshes an expired access token using the refresh token stored in cookies.
**Request**:
No request body. Requires `pacestacks_rtoken` cookie.
**Response**:
```json
{
  "success": true,
  "message": "Refresh token successfully"
}
```
**Errors**:
- `401 Unauthorized`: "Refresh token not found", "Authentication failed"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/users/me
Retrieves the profile of the authenticated user.
**Request**:
No request body. Requires `pacestacks_atoken` cookie.
**Response**:
```json
{
  "success": true,
  "message": "User found successfully",
  "data": {
    "_id": "65b21c4b4a3c6b2a4c1e8d9f",
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "",
    "role": "staff",
    "createdAt": "2024-01-25T12:00:00.000Z",
    "updatedAt": "2024-01-25T12:00:00.000Z"
  }
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `404 Not Found`: "User not found"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/products
Retrieves a list of all products with optional search and pagination.
**Request**:
No request body.
**Query Parameters**:
- `search` (optional): String to filter products by name or SKU.
- `page` (optional): Current page number (default: 1).
- `limit` (optional): Number of items per page (default: 10).
**Response**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "_id": "65b21c4b4a3c6b2a4c1e8d9f",
        "name": "Wireless Mouse",
        "sku": "WM-001",
        "quantity": 100,
        "buyPrice": 15.00,
        "sellPrice": 25.00,
        "lowStockThreshold": 20,
        "createdAt": "2024-01-25T12:00:00.000Z",
        "updatedAt": "2024-01-25T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/products/:id
Retrieves a single product by its ID.
**Request**:
No request body.
**Path Parameters**:
- `id`: The ID of the product.
**Response**:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "65b21c4b4a3c6b2a4c1e8d9f",
    "name": "Wireless Mouse",
    "sku": "WM-001",
    "quantity": 100,
    "buyPrice": 15.00,
    "sellPrice": 25.00,
    "lowStockThreshold": 20,
    "createdAt": "2024-01-25T12:00:00.000Z",
    "updatedAt": "2024-01-25T12:00:00.000Z",
    "role": "staff"
  }
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `404 Not Found`: "Product not found"
- `500 Internal Server Error`: "Internal error"

#### POST /v1/api/products
Creates a new product. Accessible by Staff and Admin roles.
**Request**:
```json
{
  "name": "New Product",
  "sku": "NP-001",
  "quantity": 50,
  "buyPrice": 10.50,
  "sellPrice": 20.00,
  "lowStockThreshold": 10
}
```
**Response**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "65b21c4b4a3c6b2a4c1e8d9f"
  }
}
```
**Errors**:
- `400 Bad Request`: "Invalid data", "Product with this SKU already exists", "Sell price must be greater than or equal to buy price"
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `403 Forbidden`: "You Cannot perform this action"
- `500 Internal Server Error`: "Internal error"

#### PUT /v1/api/products/:id
Updates an existing product by its ID. Accessible by Staff and Admin roles.
**Request**:
```json
{
  "quantity": 120,
  "sellPrice": 27.50
}
```
**Path Parameters**:
- `id`: The ID of the product to update.
**Response**:
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```
**Errors**:
- `400 Bad Request`: "Invalid data", "Product with this SKU already exists", "Sell price must be greater than or equal to buy price"
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `403 Forbidden`: "You Cannot perform this action"
- `404 Not Found`: "Product not found"
- `500 Internal Server Error`: "Internal error"

#### DELETE /v1/api/products/:id
Deletes a product by its ID. Accessible by Admin role only.
**Request**:
No request body.
**Path Parameters**:
- `id`: The ID of the product to delete.
**Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `403 Forbidden`: "You Cannot perform this action"
- `404 Not Found`: "Product not found"
- `500 Internal Server Error`: "Internal error"

#### POST /v1/api/documents/upload
Uploads a new document. Accessible by Staff and Admin roles.
**Request**:
`multipart/form-data` with a field named `file`.
**Payload structure**:
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="document.pdf"
Content-Type: application/pdf

<binary_file_content>
```
**Response**:
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": "65b21c4b4a3c6b2a4c1e8d9f"
  }
}
```
**Errors**:
- `400 Bad Request`: "No file uploaded", "Only PDF and DOCX files are allowed", "File size exceeds 10MB limit"
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `500 Internal Server Error`: "Failed to upload document", "Internal error"

#### GET /v1/api/documents
Retrieves a list of all documents with optional filtering and pagination.
**Request**:
No request body.
**Query Parameters**:
- `userId` (optional): Filter documents uploaded by a specific user ID.
- `page` (optional): Current page number (default: 1).
- `limit` (optional): Number of items per page (default: 10).
**Response**:
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "documents": [
      {
        "_id": "65b21c4b4a3c6b2a4c1e8d9f",
        "fileName": "unique-file-name.pdf",
        "originalName": "MyImportantDocument.pdf",
        "filePath": "/path/to/uploads/documents/unique-file-name.pdf",
        "mimeType": "application/pdf",
        "fileSize": 1024000,
        "uploadedBy": {
          "_id": "65b21c4b4a3c6b2a4c1e8d9e",
          "name": "John Doe",
          "email": "user@example.com"
        },
        "createdAt": "2024-01-25T12:00:00.000Z",
        "updatedAt": "2024-01-25T12:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 1
    }
  }
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/documents/:id
Retrieves details of a single document by its ID.
**Request**:
No request body.
**Path Parameters**:
- `id`: The ID of the document.
**Response**:
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "_id": "65b21c4b4a3c6b2a4c1e8d9f",
    "fileName": "unique-file-name.pdf",
    "originalName": "MyImportantDocument.pdf",
    "filePath": "/path/to/uploads/documents/unique-file-name.pdf",
    "mimeType": "application/pdf",
    "fileSize": 1024000,
    "uploadedBy": {
      "_id": "65b21c4b4a3c6b2a4c1e8d9e",
      "username": "johndoe",
      "email": "user@example.com"
    },
    "createdAt": "2024-01-25T12:00:00.000Z",
    "updatedAt": "2024-01-25T12:00:00.000Z",
    "role": "staff"
  }
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `404 Not Found`: "Document not found"
- `500 Internal Server Error`: "Internal error"

#### GET /v1/api/documents/:id/download
Downloads or previews a document directly.
**Request**:
No request body.
**Path Parameters**:
- `id`: The ID of the document to download.
**Response**:
File stream of the requested document with appropriate `Content-Type` and `Content-Disposition` headers.
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `404 Not Found`: "Document not found", "Document file not found on server"
- `500 Internal Server Error`: "Internal error"

#### DELETE /v1/api/documents/:id
Deletes a document by its ID. Accessible by the document owner or Admin role.
**Request**:
No request body.
**Path Parameters**:
- `id`: The ID of the document to delete.
**Response**:
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```
**Errors**:
- `401 Unauthorized`: "Authentication required", "Authentication failed"
- `403 Forbidden`: "You are not authorized to delete this document"
- `404 Not Found`: "Document not found"
- `500 Internal Server Error`: "Internal error"

---

## 🤝 Contributing

We welcome contributions to PaceStacks! To contribute:

1.  🍴 **Fork the repository.**
2.  🌿 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  📝 **Make your changes** and ensure they follow the project's coding standards.
4.  🧪 **Write and run tests** to ensure functionality: `npm test` (if applicable).
5.  ✅ **Commit your changes** with a clear and concise message.
6.  ⬆️ **Push your branch** to your forked repository.
7.  ➡️ **Open a pull request** to the main repository's `main` branch.

Please ensure your code is well-documented and your changes are thoroughly tested.

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Onos**

*   LinkedIn: [https://linkedin.com/in/your-username](https://linkedin.com/in/your-username)
*   Twitter: [https://twitter.com/your-username](https://twitter.com/your-username)
*   Portfolio: [https://yourportfolio.com](https://yourportfolio.com)

---

[![PaceStacks Monorepo](https://img.shields.io/badge/Monorepo-TypeScript-informational)](https://www.typescriptlang.org/)
[![Client: Next.js](https://img.shields.io/badge/Client-Next.js-black?logo=next.js)](https://nextjs.org/)
[![Server: Node.js Express](https://img.shields.io/badge/Server-Node.js%20Express-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Database: MongoDB Mongoose](https://img.shields.io/badge/Database-MongoDB%20Mongoose-success?logo=mongodb)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)