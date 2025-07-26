import router from "./routes";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON inputted request bodies
app.use(express.json());

// registering routes from routes.ts
app.use("/", router);

// Starting server
app.listen(PORT, () => {
    console.log(`URL Shortener API active on port ${PORT}`);
});