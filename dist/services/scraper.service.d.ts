declare class ScraperService {
    private licitacionesService;
    private baseUrl;
    constructor();
    searchBids(searchTerm?: string): Promise<void>;
    getRawHtml(searchTerm?: string): Promise<string>;
    private parseBids;
}
declare const _default: ScraperService;
export default _default;
//# sourceMappingURL=scraper.service.d.ts.map