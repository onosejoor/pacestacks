# PaceStacks Backend API 🚀

## Overview
A robust and scalable backend API meticulously crafted with TypeScript, Node.js, and Express.js, leveraging MongoDB with Mongoose for data persistence. This API provides comprehensive functionalities for secure authentication, streamlined user management, efficient product inventory control, and robust document handling, all designed for high performance and maintainability.

## Features
- ✨ **Authentication & Authorization**: Implements secure user registration, login, and refresh token mechanisms using JWT, supporting distinct `staff` and `admin` roles for fine-grained access control.
- 👤 **User Management**: Dedicated endpoints for managing user profiles and roles, allowing for flexible administration.
- 📦 **Product Management**: Provides full Create, Read, Update, Delete (CRUD) operations for products, incorporating advanced search, pagination, and essential low-stock threshold alerts for proactive inventory control.
- 📄 **Document Management**: Facilitates secure file uploads (supporting PDF and DOCX formats) with rigorous validation, efficient retrieval, direct preview capabilities, and secure deletion.
- 🛡️ **Security Enhancements**: Employs industry-standard security practices including Argon2 for password hashing, secure HTTP-only cookie-based token handling, and HTTP security headers enforced by Helmet.
- 🧪 **Input Validation**: Ensures data integrity and prevents common vulnerabilities through strict request payload validation utilizing Zod schemas.
- 🚦 **Robust Error Handling**: Features a centralized error handling middleware for consistent and informative API responses across the application.
- 📈 **Request Logging**: Integrates detailed logging of all incoming HTTP requests using Morgan and Pino for enhanced monitoring and debugging.

## Getting Started

### Installation
To set up and run this project locally, please follow these step-by-step instructions:

- 1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd pacestacks-server
   ```
- 2. **Install dependencies**:
   ```bash
   npm install
   ```
- 3. **Build the TypeScript project**:
   ```bash
   npm run build
   ```
   For development with automatic code reloading, you can use `npm run dev` instead.
- 4. **Start the server**:
   ```bash
   npm start
   ```

The server will initialize and listen on the port configured in your environment variables, defaulting to `http://localhost:3000`.

### Environment Variables
Before running the application, create a `.env` file in the root of the `server` directory. This file must contain the following required environment variables:

- `PORT`: Specifies the port number on which the server will listen (e.g., `3000`).
- `NODE_ENV`: Defines the application's operating environment (e.g., `development`, `production`).
- `JWT_ACCESS_SECRET`: A cryptographically strong secret key used for signing JWT access tokens.
- `JWT_REFRESH_SECRET`: A robust secret key utilized for signing JWT refresh tokens.
- `MONGODB_URI`: The complete connection URI for your MongoDB database instance (e.g., `mongodb://localhost:27017/pacestacks-db`).

**Example `.env` file structure:**
```
PORT=3000
NODE_ENV=development
JWT_ACCESS_SECRET=your_super_secret_jwt_access_key_here_must_be_long_and_random
JWT_REFRESH_SECRET=your_super_secret_jwt_refresh_key_here_must_be_long_and_random
MONGODB_URI=mongodb://localhost:27017/pacestacks-db
```

## API Documentation

### Base URL
`http://localhost:PORT/v1/api` (Replace `PORT` with the value configured in your `.env` file)

### Endpoints

#### POST /v1/api/auth/register
Registers a new user, assigning either a `staff` or `admin` role. The `role` field is optional and defaults to `staff`.

**Request**:
```json
{
  "email": "new.user@example.com",
  "password": "SecurePassword123!",
  "name": "Jane Doe",
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
- `400 Bad Request`: Email already exists.
- `400 Bad Request`: Invalid data due to schema validation errors (e.g., invalid email format, password too short, name too short).

#### POST /v1/api/auth/login
Authenticates an existing user. Upon successful authentication, `pacestacks_atoken` (access token) and `pacestacks_rtoken` (refresh token) are set as HTTP-only cookies.

**Request**:
```json
{
  "email": "existing.user@example.com",
  "password": "SecurePassword123!"
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
- `400 Bad Request`: Invalid Credentials (e.g., incorrect email or password combination).
- `400 Bad Request`: Invalid data due to schema validation errors (e.g., invalid email format).

#### GET /v1/api/auth/refresh-token
Utilizes the `pacestacks_rtoken` HTTP-only cookie to issue a new access token, extending the user's session.

**Request**: (Refresh token is automatically read from cookies; no request body or query parameters required)

**Response**:
```json
{
  "success": true,
  "message": "Refresh token successfully"
}
```

**Errors**:
- `401 Unauthorized`: Refresh token not found (cookie is missing or malformed).
- `401 Unauthorized`: Invalid or expired refresh token.

#### GET /v1/api/users/me
Retrieves the profile information of the currently authenticated user.

**Request**: (Requires `pacestacks_atoken` cookie for authentication)

**Response**:
```json
{
  "_id": "65b263b8d4e4c2f6d8a7b1c2",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "avatar": "https://example.com/avatar.png",
  "role": "staff",
  "createdAt": "2024-01-25T12:00:00.000Z",
  "updatedAt": "2024-01-25T12:00:00.000Z"
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `404 Not Found`: User not found in the database.

#### GET /v1/api/products
Fetches a list of all products. Supports optional filtering by search terms, and pagination. Accessible by `staff` and `admin` roles.

**Request**:
- Query Parameters:
    - `search` (string, optional): A keyword to search by product name or SKU (case-insensitive).
    - `page` (number, optional): The page number for results, defaults to `1`.
    - `limit` (number, optional): The maximum number of products per page, defaults to `10`.

**Response**:
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": {
    "products": [
      {
        "_id": "65b263b8d4e4c2f6d8a7b1c3",
        "name": "Mechanical Keyboard",
        "sku": "KB-MEC-001",
        "quantity": 75,
        "buyPrice": 70.00,
        "sellPrice": 120.00,
        "lowStockThreshold": 15,
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
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `500 Internal Server Error`: An unexpected server-side error occurred.

#### GET /v1/api/products/:id
Retrieves the detailed information for a single product specified by its unique ID. Accessible by `staff` and `admin` roles.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the product.

**Response**:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "65b263b8d4e4c2f6d8a7b1c3",
    "name": "Mechanical Keyboard",
    "sku": "KB-MEC-001",
    "quantity": 75,
    "buyPrice": 70.00,
    "sellPrice": 120.00,
    "lowStockThreshold": 15,
    "createdAt": "2024-01-25T12:00:00.000Z",
    "updatedAt": "2024-01-25T12:00:00.000Z",
    "role": "staff"
  }
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `404 Not Found`: Product with the specified ID could not be found.
- `500 Internal Server Error`: An unexpected server-side error occurred.

#### POST /v1/api/products
Creates a new product entry in the inventory. Requires `staff` or `admin` role.

**Request**:
```json
{
  "name": "Wireless Ergonomic Mouse",
  "sku": "MS-ERG-002",
  "quantity": 200,
  "buyPrice": 30.00,
  "sellPrice": 55.00,
  "lowStockThreshold": 25
}
```

**Response**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "65b263b8d4e4c2f6d8a7b1c4"
  }
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `403 Forbidden`: User does not have the necessary `staff` or `admin` permissions to create products.
- `400 Bad Request`: A product with the provided SKU already exists.
- `400 Bad Request`: Sell price must be greater than or equal to buy price.
- `400 Bad Request`: Invalid data due to schema validation errors (e.g., `name` missing, `sku` format incorrect, `quantity` negative).

#### PUT /v1/api/products/:id
Updates an existing product's details using its ID. Requires `staff` or `admin` role.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the product to update.
- Body:
```json
{
  "name": "Wireless Ergonomic Mouse Pro",
  "quantity": 180,
  "sellPrice": 59.99
}
```

**Response**:
```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `403 Forbidden`: User does not have the necessary `staff` or `admin` permissions to update products.
- `404 Not Found`: Product with the specified ID could not be found.
- `400 Bad Request`: A product with the updated SKU already exists (if `sku` field is changed).
- `400 Bad Request`: Sell price must be greater than or equal to buy price.
- `400 Bad Request`: Invalid data due to schema validation errors.

#### DELETE /v1/api/products/:id
Deletes a product from the inventory by its ID. This action is restricted to `admin` roles only.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the product to delete.

**Response**:
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `403 Forbidden`: User does not have the necessary `admin` permissions to delete products.
- `404 Not Found`: Product with the specified ID could not be found.
- `500 Internal Server Error`: An unexpected server-side error occurred.

#### POST /v1/api/documents/upload
Uploads a new document to the server. Supports `application/pdf` and `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX) file types, with a maximum file size of 10MB. Requires authentication.

**Request**:
- Header: `Content-Type: multipart/form-data`
- Form Data Field: `file` (File, required): The document file to be uploaded.

**Response**:
```json
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "id": "65b263b8d4e4c2f6d8a7b1c5"
  }
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `400 Bad Request`: No file was provided in the upload request.
- `400 Bad Request`: Only PDF and DOCX files are permitted for upload.
- `400 Bad Request`: The uploaded file size exceeds the 10MB limit.
- `400 Bad Request`: Failed to upload document (generic upload error, potentially due to internal server issues).

#### GET /v1/api/documents
Retrieves a list of all uploaded documents. Supports optional filtering by the `userId` of the uploader and pagination. Requires authentication.

**Request**:
- Query Parameters:
    - `userId` (string, optional): Filters documents to show only those uploaded by a specific user ID.
    - `page` (number, optional): The page number for results, defaults to `1`.
    - `limit` (number, optional): The maximum number of documents per page, defaults to `10`.

**Response**:
```json
{
  "success": true,
  "message": "Documents retrieved successfully",
  "data": {
    "documents": [
      {
        "_id": "65b263b8d4e4c2f6d8a7b1c5",
        "fileName": "uniquehexstring_report.pdf",
        "originalName": "QuarterlyReport.pdf",
        "filePath": "/path/to/uploads/documents/uniquehexstring_report.pdf",
        "mimeType": "application/pdf",
        "fileSize": 1234567,
        "uploadedBy": {
          "_id": "65b263b8d4e4c2f6d8a7b1c2",
          "name": "Jane Doe",
          "email": "jane.doe@example.com"
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
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `500 Internal Server Error`: An unexpected server-side error occurred.

#### GET /v1/api/documents/:id
Retrieves the detailed metadata for a single document specified by its unique ID. Requires authentication.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the document.

**Response**:
```json
{
  "success": true,
  "message": "Document retrieved successfully",
  "data": {
    "_id": "65b263b8d4e4c2f6d8a7b1c5",
    "fileName": "uniquehexstring_report.pdf",
    "originalName": "QuarterlyReport.pdf",
    "filePath": "/path/to/uploads/documents/uniquehexstring_report.pdf",
    "mimeType": "application/pdf",
    "fileSize": 1234567,
    "uploadedBy": {
      "_id": "65b263b8d4e4c2f6d8a7b1c2",
      "username": "janedoe",
      "email": "jane.doe@example.com"
    },
    "createdAt": "2024-01-25T12:00:00.000Z",
    "updatedAt": "2024-01-25T12:00:00.000Z",
    "role": "staff"
  }
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `404 Not Found`: Document with the specified ID could not be found.
- `500 Internal Server Error`: An unexpected server-side error occurred.

#### GET /v1/api/documents/:id/download
Streams the document file for preview or download based on its ID. The `Content-Type` and `Content-Disposition` headers are set dynamically. Requires authentication.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the document to stream.

**Response**:
(A file stream of the requested document. Headers like `Content-Type: application/pdf` and `Content-Disposition: inline; filename="OriginalName.pdf"` will be set.)

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `404 Not Found`: Document not found or the physical document file is missing on the server.
- `500 Internal Server Error`: An unexpected server-side error occurred during file streaming.

#### DELETE /v1/api/documents/:id
Deletes a document and its corresponding file from the server. This action is permitted for the user who originally uploaded the document, or for any `admin` user.

**Request**:
- Path Parameters:
    - `id` (string, required): The unique identifier of the document to delete.

**Response**:
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

**Errors**:
- `401 Unauthorized`: Authentication required or invalid/expired token.
- `403 Forbidden`: The authenticated user is not authorized to delete this specific document (neither the uploader nor an `admin`).
- `404 Not Found`: Document with the specified ID could not be found.
- `500 Internal Server Error`: An unexpected server-side error occurred during the deletion process.

## Usage
The PaceStacks Backend API is engineered to function as the foundational core for managing product inventory, securing user interactions, and handling digital documents efficiently. Its architecture allows seamless integration with a variety of frontend applications, providing a comprehensive solution for businesses seeking robust and reliable data management capabilities.

### Authentication Flow
1.  **User Onboarding**: Users begin by either registering for a new account using `POST /v1/api/auth/register` or logging into an existing one via `POST /v1/api/auth/login`. A successful authentication process results in the server issuing `pacestacks_atoken` (access token) and `pacestacks_rtoken` (refresh token), which are securely stored as HTTP-only cookies in the client's browser.
2.  **Accessing Protected Resources**: For subsequent interactions with protected API endpoints (such as those for product or document management), client requests must automatically include the `pacestacks_atoken` cookie. The API's integrated `authenticate` middleware is responsible for validating this token, ensuring only authorized requests proceed.
3.  **Session Renewal**: Upon expiration of the `pacestacks_atoken`, clients can initiate a request to `GET /v1/api/auth/refresh-token`. The server then intelligently utilizes the `pacestacks_rtoken` cookie to generate and issue a new access token, effectively renewing the user's session without requiring them to re-enter their credentials.

### Product Management
-   **Viewing Inventory**: To retrieve and display all products, utilize the `GET /v1/api/products` endpoint. This endpoint supports flexible query parameters such as `search`, `page`, and `limit` to refine the results.
-   **Creating Products**: Users with `staff` or `admin` roles can add new product entries to the inventory by sending a `POST` request to ` /v1/api/products` with the product details.
-   **Updating Product Information**: Modifying existing product details, including quantity, pricing, and low stock thresholds, is achieved through `PUT /v1/api/products/:id`. This operation also requires `staff` or `admin` permissions.
-   **Removing Products**: The `DELETE /v1/api/products/:id` endpoint is exclusively available to `admin` users for permanent removal of product entries.

### Document Handling
-   **Uploading Documents**: Authenticated users can securely upload PDF or DOCX files using a `POST` request to ` /v1/api/documents/upload`. Files are submitted via `multipart/form-data`, adhering to strict file type and size validations.
-   **Retrieving Documents**: A list of uploaded documents can be fetched with `GET /v1/api/documents`, offering an option to filter by `userId`. Detailed metadata for a specific document is available via `GET /v1/api/documents/:id`.
-   **Downloading and Previewing**: The `GET /v1/api/documents/:id/download` endpoint allows clients to directly stream document files, enabling in-browser preview or download, with appropriate content headers.
-   **Deleting Documents**: Documents can be deleted using `DELETE /v1/api/documents/:id`. This action is privileged, allowing the original uploader or an `admin` user to remove the document and its associated file.

This API provides a robust and secure foundation for managing various aspects of a modern business operation, ensuring data integrity and efficient resource handling.

## Technologies Used

| Technology         | Description                                                        | Link                                                            |
| :----------------- | :----------------------------------------------------------------- | :-------------------------------------------------------------- |
| **TypeScript**     | A strongly typed superset of JavaScript that compiles to plain JS. | [TypeScript](https://www.typescriptlang.org/)                   |
| **Node.js**        | A powerful JavaScript runtime environment.                         | [Node.js](https://nodejs.org/en/)                               |
| **Express.js**     | A minimalist and flexible Node.js web application framework.       | [Express.js](https://expressjs.com/)                            |
| **Mongoose**       | An elegant MongoDB object modeling tool for Node.js.               | [Mongoose](https://mongoosejs.com/)                             |
| **MongoDB**        | A popular, open-source NoSQL document database.                    | [MongoDB](https://www.mongodb.com/)                             |
| **Zod**            | A TypeScript-first schema declaration and validation library.      | [Zod](https://zod.dev/)                                         |
| **Argon2**         | A modern, strong password hashing function.                        | [Argon2](https://argon2.com/)                                   |
| **JOSE**           | Universal `JSON Web Token` (JWT) library for Node.js.              | [JOSE](https://www.npmjs.com/package/jose)                      |
| **Pino**           | An extremely fast Node.js logger, optimized for production.        | [Pino](https://getpino.io/)                                     |
| **Helmet**         | A collection of 14 middleware functions to help secure Express apps. | [Helmet](https://helmetjs.github.io/)                           |
| **Multer**         | A Node.js middleware for handling `multipart/form-data`.           | [Multer](https://www.npmjs.com/package/multer)                  |
| **Cookie-parser**  | Middleware to parse cookie headers and populate `req.cookies`.     | [Cookie-parser](https://www.npmjs.com/package/cookie-parser)    |
| **Dotenv**         | A module that loads environment variables from a `.env` file.      | [Dotenv](https://www.npmjs.com/package/dotenv)                  |
| **Morgan**         | An HTTP request logger middleware for Node.js.                     | [Morgan](https://www.npmjs.com/package/morgan)                  |


## Author Info
**[Your Name]**
*   LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
*   Twitter: [@YourTwitterHandle](https://twitter.com/YourTwitterHandle)
*   Portfolio: [Your Portfolio Website](https://yourportfolio.com)

## Badges
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-informational?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.x%2B-4EA94B?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-800000?style=flat&logo=mongoose)](https://mongoosejs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/your-username/your-repo/actions)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)