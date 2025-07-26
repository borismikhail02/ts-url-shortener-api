import { Request, Response } from "express";
import { UrlService } from "./services";

const urlService = new UrlService();

// Handles POST /shorten endpoint 
// Accepts original URL in request body and returns shortened version.
export const createShortUrl = async (request: Request, response: Response) => {
    const { originalUrl } = request.body;

    if (!originalUrl) {
        return response.status(400).json({ error: "Missing originalUrl in request body."});
    }

    const mapping = await urlService.createMapping(originalUrl);
    response.status(201).json(mapping);
};

// Handles GET /:shortCode endpoint
// Redirects user to orginal URL based on short code given.
export const redirectToOriginalUrl = async (request: Request, response: Response) => {
    const { shortCode } = request.params;
    const originalUrl = await urlService.getOriginalUrl(shortCode);

    if (!originalUrl) {
        return response.status(404).json({ error: "Short URL not found." });
    }

    response.redirect(originalUrl);
};