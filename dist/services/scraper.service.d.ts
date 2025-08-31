declare class ScraperService {
    private licitacionesService;
    private baseUrl;
    constructor();
    searchBids(searchTerm?: string): Promise<void>;
    getRawHtml(searchTerm?: string): Promise<string>;
    private parseBids;
}
declare const scraperService: ScraperService;
export default scraperService;
//# sourceMappingURL=scraper.service.d.ts.map