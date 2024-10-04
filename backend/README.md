# Recipe Management Backend

This project is a backend API for a Recipe Management Application. It allows users to register, log in, and manage their recipes. The API handles CRUD (Create, Read, Update, Delete) operations for recipes and implements user authentication using JWT (JSON Web Tokens).

## Features

- **User Authentication**: Token-based authentication for user registration and login using JWT.
- **Recipe CRUD Operations**: Create, read, update, and delete recipes in the database.
- **Error Handling**: Graceful handling of invalid requests and server errors.
- **MongoDB Integration**: Recipes and users are stored in MongoDB.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Postman](https://www.postman.com/) (optional, for testing the API endpoints)

## Installation

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd recipe-management-backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Environment Variables**:

   Create a `.env` file in the root directory and configure the following environment variables:

    ```bash
    PORT=4000
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    ```

4. **Start the server**:
    ```bash
    npm run dev
    npm run start
    ```
   The server will start on `http://localhost:4000`.

## Dependencies

The application uses the following packages:

- **bcrypt**: Used to hash and verify user passwords securely.
- **cookie-parser**: Middleware for parsing cookies in incoming requests.
- **dotenv**: For loading environment variables from a `.env` file.
- **express**: Web framework for building the API.
- **jsonwebtoken**: For creating and verifying JWT tokens.
- **mongoose**: For interacting with MongoDB.
- **nodemon**: Utility for auto-restarting the server during development.

## API Endpoints

### 1. **User Authentication**

- **Register a new user**  
  `POST /register`  

- **Login a user**  
  `POST /login`

- **Edit a user**
  `POST /user/editdetail/:id` (Protected route)

- **View user data**
  `GET /user/ViewDetail/:id` (Protected route)

- **Delete User Data**
  `DELETE /user/deleteData/:id` (Protected route)

### 2. **Recipe CRUD Operations**

- **Create a new recipe**  
  `POST /recipe/createRecipe` (Protected route)  

- **Read all recipes**  
  `GET /vieRecipe`  

- **Read a specific recipe by ID**  
  `GET /viewRecipe/:id`  

- **Update a recipe by ID**  
  `POST /editRecipe/:id` (Protected route)  

- **Delete a recipe by ID**  
  `DELETE /deleteRecipe/:id` (Protected route)  

## Error Handling

- All errors are returned as JSON objects with a descriptive message and appropriate HTTP status code.
  
Example error response:
```json
{
  "error": "Invalid email or password",
  "status": 400
}
```
## Testing the API

You can use Postman or any other API client to test the API endpoints. Ensure you include the `Authorization` header with the JWT token for protected routes (Create, Update, Delete recipes).


