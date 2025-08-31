import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Mercado Publico Scraper API',
        endpoints: {
            'GET /': 'API info',
            'GET /search': 'Search bids (optional ?term=keyword)',
            'GET /raw-html': 'Get raw HTML from search (optional ?term=keyword)'
        }
    });
});

// Endpoint para buscar licitaciones
app.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.term as string || '';
        console.log(`Searching for: "${searchTerm}"`);
        
        // Importación dinámica para evitar problemas de módulos  
        const scraperModule = await import('./services/scraper.service.js');
        const scraperService = scraperModule.default;
        await scraperService.searchBids(searchTerm);
        
        res.json({
            success: true,
            message: `Search completed for term: "${searchTerm}"`,
            searchTerm
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            success: false,
            error: 'Error during search',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

// Endpoint para obtener HTML crudo
app.get('/raw-html', async (req, res) => {
    try {
        const searchTerm = req.query.term as string || '';
        console.log(`Getting raw HTML for: "${searchTerm}"`);
        
        // Importación directa de módulos necesarios
        const axios = await import('axios');
        
        const baseUrl = process.env.MERCADO_PUBLICO_BASE_URL || 'https://www.mercadopublico.cl';
        const response = await axios.default.post(`${baseUrl}/Home/Buscar`, {
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
        
        const html = response.data;
        
        res.json({
            success: true,
            html: html.substring(0, 1000) + '...', // Primeros 1000 chars
            fullLength: html.length,
            searchTerm
        });
    } catch (error) {
        console.error('Raw HTML error:', error);
        res.status(500).json({
            success: false,
            error: 'Error getting raw HTML',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
