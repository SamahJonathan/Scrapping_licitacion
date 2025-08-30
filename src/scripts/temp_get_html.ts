import fs from 'fs';

async function getHtml() {
    const { default: scraperService } = await import('../services/scraper.service.js');
    const html = await scraperService.getRawHtml('software');
    fs.writeFileSync('mercado_publico_results.html', html);
    console.log('HTML saved to mercado_publico_results.html');
}

getHtml();