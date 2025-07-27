import express from "express";
import { createShortUrl, redirectToOriginalUrl, getAllMappings, deleteMapping } from "./controller";

const router = express.Router();

router.post("/shorten", createShortUrl);
router.get("/:shortCode", redirectToOriginalUrl);
router.get("/admin/mappings", getAllMappings);
router.delete("/admin/mappings/:shortCode", deleteMapping);

export default router;