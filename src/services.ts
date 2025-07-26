import { UrlMapping } from "./model";

export class UrlService {
    private urlStore: UrlMapping[] = [];

    private generateShortCode(): string {
        return Math.random().toString(36).substring(2, 8); // Simple random 6 character code 
    }

    createMapping(originalUrl: string): UrlMapping {
        const shortCode = this.generateShortCode();
        const newMapping: UrlMapping = {
            originalUrl,
            shortCode,
            createdAt: new Date().toISOString()
        };
        this.urlStore.push(newMapping);
        return newMapping;
    }

    getOriginalUrl(shortCode: string): string | undefined {
        const mapping = this.urlStore.find(map => map.shortCode === shortCode);
        return mapping?.originalUrl;
    }
}