# MILESTONE 3 FE

## Installation
To run this project, you will need to install the necessary dependencies by running the following command in your terminal:

`npm install`

## Running the Application
To run the application, execute the following command in your terminal:

`npm start`

By default, the application will be running on http://localhost:3000.

## Features
- **User Authentication** : The project allows users to register and login using their credentials.
- **Task Management** : Users can create, update, and get tasks.
- **Admin Panel** : Admin users can perform user management operations like fetching all users, updating user data, getting a user by id, and deleting a user.

## Folder Structure
The project is organized into the following folders:

- **pages** : Contains the pages for the application, including Login, Home, Task, TaskCreate, and User.
- **components** : Contains the reusable components for the application, such as Header and Taskform.
- **redux** : Contains the Redux store, slices, and reducers for user and task management.
- **services** : Contains the API service for making HTTP requests to the server.
- 
## Pages and Components

### Pages

- **Login** : The login page for the application.
- **Home** : The homepage for the application, showing the tasks for the user.
- **Task** : The page for a specific task, showing the task details.
- **TaskCreate** : The page for creating a new task.
- **User** : The page for a specific user, showing the user details.

### Components

- **Header** : The header component for the application, showing the user name and picture, and providing a logout option.
- **Taskform** : The form component for creating or updating a task.
- **Userform** : The form component for updating a user.

## API Endpoints

- **POST /auth/login** : Logs in a user and returns a JWT token.
- **GET /auth/users** : Fetches all users (Admin access only).
- **POST /task/create** : Creates a new task for a user.
- **GET /task/:id** : Gets a task by id.
- **GET /admin/users** : Fetches all users.
- **GET /admin/:id** : Gets user data by id.

## Technology Stack

- **Frontend** : React.js, Material-UI, Redux, Formik, Yup
- **Backend** : Node.js, Express (Refer to your backend README.md for more details)
- **Database** : MongoDB (Refer to your backend README.md for more details)
- **Authentication** : JWT Tokens

## Contributing
Contributions are welcome! If you find a bug or want to add a new feature, please create an issue or a pull request.

## Author
Hilman Syarifudin