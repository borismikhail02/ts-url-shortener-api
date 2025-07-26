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
       "createdAt": "<ISO date>"
     }
     ```

   - Stores the URL mapping in memory and returns the generated short code.
   - **Error:** Returns a `400` code if originalUrl is missing from body.

2. **Redirect to Original URL**
   - **Endpoint:** `GET /:shortCode`
   - **Behavior:** Redirects to the original URL mapped to the given short code.
   - **Error:** Returns a `404` code if the short code does not exist.

3. **Data Storage**
   - Currently stored in-memory.

4. **Error Handling**
   - Handles invalid input and missing short codes gracefully with relevant HTTP status codes.

---

## Tech Stack

- **Node.js** - Runtime environment for executing JavaScript on the server
- **TypeScript** - Strongly-typed superset of JavaScript
- **Express** - Web application framework for Node.js, used to build server-side applications and APIs with js/ts.

---

## Getting Started

### Installation

```sh
npm install
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

---

## Future Improvements

- Save mappings to a database or file
- Add URL expiration feature
- Add user accounts and URL management
- Track and show visit statistics

---

## Author


### *Boris-Mikhail Georgiev*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/borismikhail02)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/boris-mikhail-georgiev/)