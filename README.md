# URL Shortener API

A simple RESTful API built with Node.js, TypeScript, and Express that allows users to shorten URLs and access them via short codes. Purpose to practice and develop TypseScript skills as well as experiment with new techs (Express).

---

## Specifications

1. **Shorten a URL**
   - **Endpoint:** `POST /shorten`
   - **Request Body:** JSON  

     ```sh
     {
       "originalUrl": "<long URL>"
     }
     ```

   - **Response:** JSON  
     
     ```sh
     {
       "originalUrl": "<long URL>",
       "shortCode": "<unique short code>",
       "createdAt": "<ISO date>",
       "expiresAt": "<ISO date>"
     }
     ```

   - Stores the URL mapping in memory and returns the generated short code.
   - **Error:** Returns a `400` code if originalUrl is missing from body.

2. **Redirect to Original URL**
   - **Endpoint:** `GET /:shortCode`
   - **Behavior:** Redirects to the original URL mapped to the given short code.
   - **Errors:** 
      - Returns a `404` code if the short code does not exist.
      - Returns a `410` code if the short code has expired.

3. **List all Generated Mappings**
   - **Endpoint:** `GET /admin/mappings`
   - **Response:** JSON  
     
     ```sh
     [
       {
         "originalUrl": "<long URL 1>",
         "shortCode": "<unique short code 1>",
         "createdAt": "<ISO date>",
         "expiresAt": "<ISO date>"
       },
       {
         "originalUrl": "<long URL 2>",
         "shortCode": "<unique short code 2>",
         "createdAt": "<ISO date>",
         "expiresAt": "<ISO date>"
       },
     ]
     ```

 4. **Delete a Generated Mapping**
   - **Endpoint:** `DELETE /admin/mappings/:shortCode`
   - **Response:** JSON  
     
     ```sh
     {
         "message": "Mapping: '<shortCode>' deleted successfully."
     }
     ```

   - **Error:** Returns a `404` code if the short code does not exist.

 5. **Delete all Generated Mappings**
   - **Endpoint:** `DELETE /admin/mappings/all`
   - **Response:** JSON  
     
     ```sh
     {
         "message": "Mapping: 'all' deleted successfully."
     }
     ```

6. **Data Storage**
   - Stores mappings locally using SQLite database.

7. **Error Handling**
   - Handles invalid input and missing short codes gracefully with relevant HTTP status codes.

---

## Database Schema

Using **SQLite** via **Prisma ORM**.

### `UrlMapping` Table
-*Stores generated shortened maps for given URLs.*

| Field         | Type       | Notes                                |
|---------------|------------|---------------------------------------|
| `id`          | `Int`      | Primary key (auto-increment)          |
| `shortCode`   | `String`   | Unique short code                     |
| `originalUrl` | `String`   | The full/original URL                 |
| `createdAt`   | `DateTime` | When the URL was shortened            |
| `expiresAt`   | `DateTime` | When the short link becomes invalid   |

### `UrlVisit` Table
-*Stores tracked visits with relevant information, related (many->one) to UrlMapping table via shortCode.*

| Field       | Type       | Notes                                      |
|-------------|------------|---------------------------------------------|
| `id`        | `Int`      | Primary key (auto-increment)                |
| `shortCode` | `String`   | Foreign key to `UrlMapping.shortCode`       |
| `userAgent` | `String`   | Visitor’s browser or platform info          |
| `ipAddress` | `String`   | Visitor’s IP address                        |
| `visitedAt` | `DateTime` | Timestamp of when the URL was visited       |

---

## Tech Stack

- **Node.js** - Runtime environment for executing JavaScript on the server
- **TypeScript** - Strongly-typed superset of JavaScript
- **Express** - Web framework for building API routes in Node.js
- **SQLite** - Lightweight SQL database for local development
- **Prisma** - Modern ORM for database querying and interaction

---

## Getting Started

### Installation

```sh
npm install
```

### Database Setup

Before running the application, setup the SQLite database:
```sh
npx prisma generate
npx prisma migrate dev
```

### Running the App

- Run once:
  ```sh
  npm run start
  ```

- Run in dev mode (with auto-reload):
  ```sh
  npm run dev
  ```

### Testing with Postman

- **Shorten a URL**
  - POST `http://localhost:3000/shorten`
  - Body (JSON):
    ```sh
    {
      "originalUrl": "https://example.com"
    }
    ```

  - Response:
    ```sh
    {
      "shortCode": "abc123",
      "originalUrl": "https://example.com"
    }
    ```

- **Redirect to Original URL**
  - GET `http://localhost:3000/abc123`
  - Redirects to `https://example.com`

- **List all Mappings**
  - GET `http://localhost:3000/admin/mappings`
  - Response:
    ```sh
    [
       {
         "originalUrl": "https://example.com",
         "shortCode": "abc123",
         "createdAt": "2025-01-01T18:12:30.470Z",
         "expiresAt": "2025-01-01T18:12:35.470Z"
       },
       {
         "originalUrl": "https://testing.com",
         "shortCode": "cba321",
         "createdAt": "2025-02-02T18:14:00.470Z",
         "expiresAt": "2025-02-02T18:14:05.470Z"
       }
     ]
    ```

- **Delete a Mapping**
  - DELETE `http://localhost:3000/admin/mappings/abc123`
  - Response:
    ```sh
    {
        "message": "Mapping: 'abc123' deleted successfully."
    }
    ```
    
- **Delete all Mappings**
  - DELETE `http://localhost:3000/admin/mappings/all`
  - Response:
    ```sh
    {
        "message": "Mapping: 'all' deleted successfully."
    }
    ```

---

## Author


### *Boris-Mikhail Georgiev*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/borismikhail02)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/boris-mikhail-georgiev/)