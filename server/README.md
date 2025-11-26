# Pacestacks Server API

## Overview
This is a robust backend API service built with TypeScript, Node.js, and Express, utilizing Mongoose for MongoDB object modeling. It provides secure authentication, comprehensive product management, and document handling capabilities.

## Features
- **Authentication (JWT & Refresh Tokens)**: Secure user registration and login with JWT access tokens and HTTP-only refresh tokens.
- **Role-Based Authorization**: Differentiated access control for `staff` and `admin` roles, ensuring secure operation for product management.
- **Product Management**: CRUD operations for products, including search, pagination, and tracking low stock levels.
- **Document Management**: Secure file uploads (PDF/DOCX) with storage, retrieval, and deletion functionality.
- **Data Validation (Zod)**: Schema-based input validation for all API requests, ensuring data integrity.
- **Error Handling**: Centralized error handling middleware for consistent and informative error responses.
- **Logging (Pino & Morgan)**: Request logging for development and production environments, improving observability.
- **Security (Helmet)**: Implemented standard security headers to protect against common web vulnerabilities.

## Getting Started
### Installation
To set up and run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pacestacks/server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the TypeScript project:**
    ```bash
    npm run build
    ```
4.  **Start the development server (with Nodemon):**
    ```bash
    npm run dev
    ```
    Or, to run the built JavaScript:
    ```bash
    node dist/server.js
    ```

### Environment Variables
The application requires the following environment variables to be set. Create a `.env` file in the root directory of the `server` project and populate it with values:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/pacestacks_db
JWT_ACCESS_SECRET=your_jwt_access_secret_key_here_at_least_32_chars
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_at_least_32_chars
NODE_ENV=development
```

## API Documentation
### Base URL
`http://localhost:3000/v1/api` (or your configured `PORT`)

### Endpoints

#### POST /v1/api/auth/signup
Registers a new user with `staff` or `admin` role. Returns access and refresh tokens via HTTP-only cookies.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
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
- 400: Invalid data provided (e.g., invalid email, name too short, email already exists).
- 500: Internal server error.

#### POST /v1/api/auth/signin
Authenticates an existing user. Returns access and refresh tokens via HTTP-only cookies.
**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
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
- 400: Invalid credentials (e.g., incorrect email or password).
- 500: Internal server error.

#### GET /v1/api/products/low-stock
Retrieves all products currently below their defined low stock threshold.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/products/low-stock
Authorization: Bearer <access_token>
```
**Response**:
```json
{
  "success": true,
  "message": "Low stock products retrieved successfully",
  "data": [
    {
      "_id": "65b7e8d6f7e3d1c4b5a6f7e8",
      "name": "Widget A",
      "sku": "WIDGET-A-001",
      "quantity": 5,
      "buyPrice": 10.50,
      "sellPrice": 15.75,
      "lowStockThreshold": 10,
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-05T14:30:00.000Z"
    }
  ]
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `staff` or `admin` role).
- 500: Internal server error.

#### GET /v1/api/products
Retrieves a paginated list of all products, with optional search capabilities.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/products?search=widget&page=1&limit=10
Authorization: Bearer <access_token>
```
**Query Parameters**:
- `search` (optional): A string to filter products by `name` or `sku` (case-insensitive).
- `page` (optional): The page number for pagination (default: `1`).
- `limit` (optional): The number of items per page (default: `10`).
**Response**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "_id": "65b7e8d6f7e3d1c4b5a6f7e8",
        "name": "Widget A",
        "sku": "WIDGET-A-001",
        "quantity": 25,
        "buyPrice": 10.50,
        "sellPrice": 15.75,
        "lowStockThreshold": 10,
        "createdAt": "2023-01-01T12:00:00.000Z",
        "updatedAt": "2023-01-05T14:30:00.000Z"
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
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `staff` or `admin` role).
- 500: Internal server error.

#### GET /v1/api/products/:id
Retrieves a single product by its ID.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/products/65b7e8d6f7e3d1c4b5a6f7e8
Authorization: Bearer <access_token>
```
**Response**:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "65b7e8d6f7e3d1c4b5a6f7e8",
    "name": "Widget A",
    "sku": "WIDGET-A-001",
    "quantity": 25,
    "buyPrice": 10.50,
    "sellPrice": 15.75,
    "lowStockThreshold": 10,
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-05T14:30:00.000Z"
  }
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `staff` or `admin` role).
- 404: Product not found.
- 500: Internal server error.

#### POST /v1/api/products
Creates a new product.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```json
{
  "name": "New Product X",
  "sku": "NPX-001",
  "quantity": 100,
  "buyPrice": 50.00,
  "sellPrice": 75.00,
  "lowStockThreshold": 20
}
```
**Response**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "65b7e8d6f7e3d1c4b5a6f7e9",
    "name": "New Product X",
    "sku": "NPX-001",
    "quantity": 100,
    "buyPrice": 50,
    "sellPrice": 75,
    "lowStockThreshold": 20,
    "createdAt": "2023-01-06T10:00:00.000Z",
    "updatedAt": "2023-01-06T10:00:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- 400: Invalid data provided (e.g., product name or SKU missing, SKU already exists, sell price less than buy price).
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `staff` or `admin` role).
- 409: Product with this SKU already exists.
- 500: Internal server error.

#### PUT /v1/api/products/:id
Updates an existing product by its ID.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```json
{
  "quantity": 90,
  "sellPrice": 80.00
}
```
**Response**:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "65b7e8d6f7e3d1c4b5a6f7e9",
    "name": "New Product X",
    "sku": "NPX-001",
    "quantity": 90,
    "buyPrice": 50,
    "sellPrice": 80,
    "lowStockThreshold": 20,
    "createdAt": "2023-01-06T10:00:00.000Z",
    "updatedAt": "2023-01-06T10:30:00.000Z",
    "__v": 0
  }
}
```
**Errors**:
- 400: Invalid data provided (e.g., SKU already exists, sell price less than buy price).
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `staff` or `admin` role).
- 404: Product not found.
- 500: Internal server error.

#### DELETE /v1/api/products/:id
Deletes a product by its ID. (Admin only)
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
DELETE /v1/api/products/65b7e8d6f7e3d1c4b5a6f7e9
Authorization: Bearer <access_token>
```
**Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 403: User not authorized to perform this action (requires `admin` role).
- 404: Product not found.
- 500: Internal server error.

#### POST /v1/api/documents/upload
Uploads a single document (PDF or DOCX).
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
POST /v1/api/documents/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="example.pdf"
Content-Type: application/pdf

<binary content of the PDF file>
------WebKitFormBoundary7MA4YWxkTrZu0gW--
```
**Response**:
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "_id": "65b7e8d6f7e3d1c4b5a6f7e0",
    "fileName": "a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
    "originalName": "example.pdf",
    "filePath": "/path/to/uploads/documents/a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
    "mimeType": "application/pdf",
    "fileSize": 102400,
    "uploadedBy": "65b7e8d6f7e3d1c4b5a6f7d0",
    "createdAt": "2023-01-07T11:00:00.000Z",
    "updatedAt": "2023-01-07T11:00:00.000Z"
  }
}
```
**Errors**:
- 400: No file uploaded, only PDF and DOCX files are allowed, file size exceeds 10MB limit.
- 401: Authentication required or invalid/expired token.
- 500: Internal server error.

#### GET /v1/api/documents
Retrieves a paginated list of all documents, with optional filtering by user.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/documents?userId=65b7e8d6f7e3d1c4b5a6f7d0&page=1&limit=5
Authorization: Bearer <access_token>
```
**Query Parameters**:
- `userId` (optional): Filter documents uploaded by a specific user.
- `page` (optional): The page number for pagination (default: `1`).
- `limit` (optional): The number of items per page (default: `10`).
**Response**:
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "documents": [
      {
        "_id": "65b7e8d6f7e3d1c4b5a6f7e0",
        "fileName": "a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
        "originalName": "example.pdf",
        "filePath": "/path/to/uploads/documents/a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
        "mimeType": "application/pdf",
        "fileSize": 102400,
        "uploadedBy": {
          "_id": "65b7e8d6f7e3d1c4b5a6f7d0",
          "username": "johndoe",
          "email": "john.doe@example.com"
        },
        "createdAt": "2023-01-07T11:00:00.000Z",
        "updatedAt": "2023-01-07T11:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 5,
      "totalPages": 1
    }
  }
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 500: Internal server error.

#### GET /v1/api/documents/:id/download
Downloads or previews a specific document by its ID.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/documents/65b7e8d6f7e3d1c4b5a6f7e0/download
Authorization: Bearer <access_token>
```
**Response**:
(Streams the file directly, setting `Content-Type` and `Content-Disposition` headers)
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: inline; filename="example.pdf"

<binary content of the PDF file>
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 404: Document not found or document file not found on server.
- 500: Internal server error.

#### GET /v1/api/documents/:id
Retrieves details of a single document by its ID.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
GET /v1/api/documents/65b7e8d6f7e3d1c4b5a6f7e0
Authorization: Bearer <access_token>
```
**Response**:
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "_id": "65b7e8d6f7e3d1c4b5a6f7e0",
    "fileName": "a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
    "originalName": "example.pdf",
    "filePath": "/path/to/uploads/documents/a3b4c5d6e7f8a9b0c1d2e3f4.pdf",
    "mimeType": "application/pdf",
    "fileSize": 102400,
    "uploadedBy": {
      "_id": "65b7e8d6f7e3d1c4b5a6f7d0",
      "username": "johndoe",
      "email": "john.doe@example.com"
    },
    "createdAt": "2023-01-07T11:00:00.000Z",
    "updatedAt": "2023-01-07T11:00:00.000Z"
  }
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 404: Document not found.
- 500: Internal server error.

#### DELETE /v1/api/documents/:id
Deletes a document by its ID. Only the document owner or an `admin` can delete a document.
**Request**:
(Requires `Authorization` header with a valid Access Token)
```
DELETE /v1/api/documents/65b7e8d6f7e3d1c4b5a6f7e0
Authorization: Bearer <access_token>
```
**Response**:
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```
**Errors**:
- 401: Authentication required or invalid/expired token.
- 403: You are not authorized to delete this document.
- 404: Document not found.
- 500: Internal server error.

---
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)