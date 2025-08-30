import type { Licitacion } from '../types/licitacion.types.js';
export declare class LicitacionesService {
    guardarLicitacion(licitacionData: Partial<Licitacion>): Promise<Licitacion | null>;
    obtenerLicitacionesPendientes(limite?: number): Promise<Licitacion[]>;
    marcarScrapingCompletado(licitacionId: string): Promise<boolean>;
    private logOperacion;
    private logError;
}
//# sourceMappingURL=licitaciones.service.d.ts.map