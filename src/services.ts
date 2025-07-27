import { PrismaClient } from "./generated/prisma";
import { Request } from "express";

const prisma = new PrismaClient();
const EXPIRATION_TIME_MS = 1000 * 60 * 5 // 5 minutes
//const EXPIRATION_TIME_MS = 1000 * 60 * 60 * 24 // 24 hours

export class UrlService {

    private generateShortCode(): string {
        return Math.random().toString(36).substring(2, 8); // Simple random 6 character code 
    };

    async createMapping(originalUrl: string) {
        const shortCode = this.generateShortCode();
        const expiresAt = new Date(Date.now() + EXPIRATION_TIME_MS);
        
        // create new mapping direct in Prisma db
        const newMapping = await prisma.urlMapping.create({
            data: {
                originalUrl,
                shortCode,
                expiresAt
            }
        });

        console.log("New Mapping", newMapping);
        return newMapping;
    };

    async getOriginalUrl(shortCode: string) {
        // get mapping by shortcode direct from Prisma db
        const mapping = await prisma.urlMapping.findUnique({
            where: { shortCode }
        });

        if (!mapping) return null;

        if (new Date() > new Date(mapping.expiresAt)) {
            await prisma.urlMapping.delete({
                where:  { shortCode }
            });
            return "expired";
        }

        return mapping.originalUrl;
    };

    async getAllMappings() {
        return await prisma.urlMapping.findMany();
    };

    async deleteMapping(shortCode: string): Promise<boolean> {
        if (shortCode === "all") {
            await prisma.urlMapping.deleteMany();
            return true;
        }
        try {
            await prisma.urlMapping.delete({
                where: { shortCode }
            });
            return true;
        } catch {
            return false;
        }
    };

    async trackVisit(shortCode: string, request: Request) {
        if (!shortCode || !request) return "tracking-fail";
        await prisma.urlVisit.create({
            data: {
                shortCode,
                userAgent: request.headers['user-agent'],
                ipAddress: request.ip
            }
        });
    }
}