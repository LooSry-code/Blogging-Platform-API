# Blogging Platform API

A RESTful API for managing blog posts with CRUD operations and search functionality, built with **Express.js**, **TypeORM**, **MySQL**, and **TypeScript**.

## Features

-   **CRUD Operations**: Create, read, update, and delete blog posts.
-   **Search**: Filter posts by keyword in title, content, or category.
-   **Input Validation**: Ensures valid data using `express-validator`.
-   **Error Handling**: Global middleware for consistent error responses.
-   **MySQL Integration**: Uses TypeORM for database operations with auto-sync in development.

## Tech Stack

-   **Node.js** & **Express.js**: HTTP server and routing.
-   **TypeORM**: ORM for MySQL.
-   **MySQL**: Relational database.
-   **TypeScript**: Static typing.
-   **express-validator**: Input validation.
-   **dotenv**: Environment variables.
-   **nodemon** & **ts-node**: Development tools.

## Prerequisites

-   **Node.js** (16.x+): [Download](https://nodejs.org/)
-   **MySQL** (8.x+): [Download](https://dev.mysql.com/downloads/)
-   **Git**: For cloning the repository.

## Installation

1.  **Clone and Set Up Repository**:

    ```bash
    git clone [https://github.com//blogging-platform-api.git](https://github.com//blogging-platform-api.git)
    cd blogging-platform-api
    npm install
    ```

2.  **Configure Environment Variables**: Create a `.env` file in the root directory:

    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=your_password
    DB_DATABASE=blogging_platform
    PORT=3000
    ```

3.  **Create MySQL Database**:

    ```bash
    mysql -u root -p
    ```

    ```sql
    CREATE DATABASE blogging_platform;
    ```

## Running the App

-   **Development Mode** (with hot-reloading):

    ```bash
    npm run dev
    ```
    Server runs at `http://localhost:3000`.

-   **Production Mode**:

    ```bash
    npm run build
    npm start
    ```

## Testing

Test endpoints using `curl` or tools like Postman:

-   **Create Post**:

    ```bash
    curl -X POST http://localhost:3000/api/posts -H "Content-Type: application/json" -d '{"title":"My Post","content":"This is a post.","category":"Tech","tags":["Tech"]}'
    ```
    Expected: `201` with post data.

-   **Get All Posts**:

    ```bash
    curl http://localhost:3000/api/posts
    ```
    Expected: `200` with array of posts.

-   **Get Post by ID**:

    ```bash
    curl http://localhost:3000/api/posts/1
    ```
    Expected: `200` with post data or `404`.

-   **Update Post**:

    ```bash
    curl -X PUT http://localhost:3000/api/posts/1 -H "Content-Type: application/json" -d '{"title":"Updated Post","content":"Updated content.","category":"Tech","tags":["Tech"]}'
    ```
    Expected: `200` with updated post.

-   **Delete Post**:

    ```bash
    curl -X DELETE http://localhost:3000/api/posts/1
    ```
    Expected: `204` no content.

-   **Search Posts**:

    ```bash
    curl http://localhost:3000/api/posts?term=tech
    ```
    Expected: `200` with filtered posts.

## Verify in MySQL

```bash
mysql -u root -p
```

```bash
USE blogging_platform;
SELECT * FROM posts;
```
