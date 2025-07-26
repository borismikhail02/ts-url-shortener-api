import express from "express";
import { createShortUrl, redirectToOriginalUrl } from "./controller";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortCode", redirectToOriginalUrl);

export default router;