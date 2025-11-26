# PaceStacks: Dynamic Inventory & Document Manager

## Overview
PaceStacks is a modern web application built with Next.js and TypeScript, designed to provide comprehensive inventory and document management capabilities. This project serves as a robust client-side interface for managing products and documents, featuring secure authentication and an intuitive user experience.

## Features
- 🚀 **User Authentication**: Secure login and registration flows with session management.
- 📦 **Product Management**:
    - Create, Read, Update, and Delete (CRUD) product records.
    - View product details, including SKU, quantity, prices, and low stock thresholds.
    - Search and paginate through product listings.
- 📄 **Document Management**:
    - Upload, View, and Delete documents (PDF, DOCX).
    - Preview documents directly within the application using an integrated viewer.
    - Search and paginate through uploaded document listings.
- 🔄 **Real-time Data Fetching**: Utilizes SWR for efficient and up-to-date data display.
- 🎨 **Modern UI**: Built with Shadcn UI and Tailwind CSS for a sleek, responsive, and customizable interface.
- 🛡️ **Error Handling**: Robust error display and user feedback through toasts.
- DarkMode Support: Theme switching capabilities for enhanced user comfort.

## Getting Started

### Installation
To get PaceStacks up and running on your local machine, follow these steps:

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd client
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root of the project and add the following:

### Environment Variables
- `NEXT_PUBLIC_SERVER_URL`: The base URL of your backend API.
  _Example:_ `NEXT_PUBLIC_SERVER_URL=http://localhost:5000/api/v1`

### Running the Development Server
Once the dependencies are installed and environment variables are set, you can start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage
Upon launching the application, you will be greeted with a landing page where you can choose to sign in or register.

### User Registration
New users can create an account by providing an email, full name, password, and selecting a role (staff or admin).
Navigate to `/auth/register` to create an account.

### User Login
Existing users can log in with their registered email and password.
Navigate to `/auth/login` to sign in.

### Dashboard Overview
After successful authentication, you will be redirected to the dashboard. From here, you can navigate to the "Products" or "Documents" sections.

#### Product Management
-   **View Products**: Access the products list from `/dashboard/products`. You can search and paginate through existing products.
-   **Create/Update Product**: Click "Create Product" on the products page or "Update Product" on a product's detail page to open a form for managing product information (name, SKU, quantity, prices, low stock threshold).
-   **Delete Product**: From a product's detail page, administrators can delete product records.

#### Document Management
-   **View Documents**: Access the documents list from `/dashboard/documents`. You can search and paginate through uploaded documents.
-   **Upload Document**: Navigate to `/dashboard/documents/upload` to upload new PDF or DOCX files.
-   **View Document Details & Preview**: Click on a document from the list to view its details and get a rich preview of its content.
-   **Delete Document**: From a document's detail page, administrators can delete documents.

## Technologies Used
| Category           | Technology                   | Description                                  |
| :----------------- | :--------------------------- | :------------------------------------------- |
| **Frontend**       | [Next.js](https://nextjs.org) | React framework for production               |
|                    | [React](https://react.dev)    | JavaScript library for building user interfaces |
|                    | [TypeScript](https://www.typescriptlang.org/) | Strongly typed JavaScript                  |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework                 |
|                    | [Shadcn UI](https://ui.shadcn.com/) | Beautifully designed components              |
| **Data Fetching**  | [SWR](https://swr.vercel.app/) | React Hooks for Data Fetching                 |
|                    | [Axios](https://axios-http.com/) | Promise-based HTTP client for the browser and Node.js |
| **Validation**     | [Zod](https://zod.dev/)       | TypeScript-first schema declaration and validation library |
| **Icons**          | [Lucide React](https://lucide.dev/icons/) | A fork of Feather Icons with more icons     |
| **Notifications**  | [Sonner](https://sonner.emilkowalski.no/) | An opinionated toast component for React |
| **Theming**        | [next-themes](https://github.com/pacocoursey/next-themes) | System for managing themes in Next.js apps |
| **Document Viewer**| [@cyntler/react-doc-viewer](https://www.npmjs.com/package/@cyntler/react-doc-viewer) | React component for viewing various document types |

## Contributing
We welcome contributions to PaceStacks! If you're looking to contribute, please follow these guidelines:

- 🍴 **Fork the repository** and clone it to your local machine.
- 🌳 Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`.
- ✨ Make your changes and ensure your code adheres to the project's coding standards.
- ✅ Write clear and concise commit messages.
- ⬆️ Push your changes to your forked repository.
- 🤝 Open a pull request to the main branch with a detailed description of your changes.

## License
This project is licensed under the MIT License.

## Author Info
**Your Name**
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/your-username)
- Twitter: [Your Twitter Profile](https://twitter.com/your-username)
- Portfolio: [Your Portfolio Website](https://www.yourportfolio.com)

---
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-000000.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![SWR](https://img.shields.io/badge/SWR-F88126?style=flat&logo=swr&logoColor=white)](https://swr.vercel.app/)
[![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat&logo=zod&logoColor=white)](https://zod.dev/)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)