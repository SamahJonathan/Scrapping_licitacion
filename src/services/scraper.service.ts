import axios from 'axios';
import * as cheerio from 'cheerio';
import { LicitacionesService } from './licitaciones.service.js';

class ScraperService {
    private licitacionesService: LicitacionesService;
    private baseUrl: string;

    constructor() {
        this.licitacionesService = new LicitacionesService();
        this.baseUrl = process.env.MERCADO_PUBLICO_BASE_URL || 'https://www.mercadopublico.cl';
    }

    public async searchBids(searchTerm: string = ''): Promise<void> {
        try {
            const url = `${this.baseUrl}/Home/Buscar`;
            const response = await axios.post(url, {
                id: -1,
                nombre: searchTerm,
                idTipoLicitacion: -1,
                idEstado: -1,
                idOrganismo: -1,
                idUnidad: -1,
                idRegion: -1,
                idComuna: -1,
                fechaInicio: '',
                fechaFin: '',
                orden: 'fecha',
                direccion: 'desc',
                pagina: 1
            });

            const $ = cheerio.load(response.data);
            const bids = this.parseBids($);
            
            for (const bid of bids) {
                await this.licitacionesService.guardarLicitacion(bid);
            }

        } catch (error) {
            console.error('Error searching bids:', error);
        }
    }

    public async getRawHtml(searchTerm: string = ''): Promise<string> {
        try {
            const url = `${this.baseUrl}/Home/Buscar`;
            const response = await axios.post(url, {
                id: -1,
                nombre: searchTerm,
                idTipoLicitacion: -1,
                idEstado: -1,
                idOrganismo: -1,
                idUnidad: -1,
                idRegion: -1,
                idComuna: -1,
                fechaInicio: '',
                fechaFin: '',
                orden: 'fecha',
                direccion: 'desc',
                pagina: 1
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching raw HTML:', error);
            return '';
        }
    }

    private parseBids($: cheerio.CheerioAPI): any[] {
        const bids: any[] = [];
        // Logic to parse bids from the HTML will be implemented here
        // For now, it will return an empty array.
        return bids;
    }
}

export default new ScraperService();
