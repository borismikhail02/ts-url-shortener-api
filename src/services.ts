import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

export class UrlService {

    private generateShortCode(): string {
        return Math.random().toString(36).substring(2, 8); // Simple random 6 character code 
    };

    async createMapping(originalUrl: string) {
        const shortCode = this.generateShortCode();
        
        // create new mapping direct in Prisma db
        const newMapping = await prisma.urlMapping.create({
            data: {
                originalUrl,
                shortCode
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

        return mapping?.originalUrl;
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
}