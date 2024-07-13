# Authors and Books Management App

This README provides instructions on how to set up and run the Authors and Books Management App, which is built with React.js and communicates with a backend services API built with Laravel.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Node.js and npm**: [Download and install Node.js](https://nodejs.org/)

## (React.js) Setup

1. **Clone the Frontend Repository**
    ```bash
    git clone https://github.com/ahmedGMB1/book-library-app.git
    ```

2. **Install npm Dependencies**
    ```bash
    npm install
    ```

3. **Create Environment Configuration**
    Create a `.env` file in the root of your React app directory and add the following variables:
    ```env
    VITE_API_BASE_URL=http://127.0.0.1:8000/api 
    ```

4. **Start the React Development Server**
    ```bash
    npm run dev
    ```
   The React app should now be running at `http://localhost:5175`.

## Using the App

Once both the backend and frontend servers are running, you can open your browser and navigate to `http://localhost:5175` to use the Authors and Books Management App.

## Application Features

### Author Management

- **Create Author**: Add a new author with details such as first name, last name, email, phone, and bio.
- **View Authors**: Display a list of all authors with pagination.
- **Search Authors**: Search authors by name, email, or phone.
- **Edit Author**: Update author details.
- **Delete Author**: Remove an author from the database.

### Book Management

- **Create Book**: Add a new book with details such as title, author, publisher, and cover image.
- **View Books**: Display a list of all books in a grid format with pagination.
- **Edit Book**: Update book details.
- **Delete Book**: Remove a book from the database.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Icons
- **Backend**: Laravel, MySQL
- **Authentication**: JWT
