# MILESTONE 4 FE

## Installation
To run this project, you will need to install the necessary dependencies by running the following command in your terminal:

`npm install`

## Running the Application
To run the application, execute the following command in your terminal:

`npm start`

By default, the application will be running on http://localhost:5000.

## Features
- **User Authentication**: The project allows users to register and login using their credentials.
- **Task Management** : Users can create, update, and get tasks.
- **Admin Panel**: Admin users can perform user management operations like fetching all users, updating user data, getting a user by id, and deleting a user.

## Folder Structure
The project is organized into the following folders:

- **Controllers** : Contains the controllers for user and task management.
- **data** : Contains the data for initial tasks.
- **middlware** : Contains the middleware for verifying JWT tokens and authorizing admin access.
- **models** : Contains the data models for tasks.
- **public** : Contains the static files and assets.
- **Routes** : Contains the routes for user, task, and admin endpoints.

## API Endpoints

### User Routes

- **POST /auth/login**: Logs in a user and returns a JWT token.
- **GET /auth/users**: Fetches all users (Admin access only).
- **PUT /auth/:id**: Updates user data by id (Admin access only).
- **GET /auth/:id**: Gets user data by id (Admin access only).
- **DELETE /auth/:id**: Deletes a user by id (Admin access only).

### Task Routes

- **POST /task/create** : Creates a new task for a user.
- **PUT /task/:id** : Updates a task by id.
- **GET /task/:id** : Gets a task by id.
- **GET /task/** : Gets all tasks for a user.

### Admin Routes

- **GET /admin/users** : Fetches all users.
- **PUT /admin/:id** : Updates user data by id.
- **GET /admin/:id** : Gets user data by id.
- **DELETE /admin/:id** : Deletes a user by id.

## Technology Stack

- **Backend** : Node.js, Express
- **Database** : MongoDB
- **Authentication** : JWT Tokens
- **Middleware** : cors, cookie-parser, helmet, multer

## Contributing
Contributions are welcome! If you find a bug or want to add a new feature, please create an issue or a pull request.

## Author
Hilman Syarifudin
