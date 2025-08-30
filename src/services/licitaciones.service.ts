import { supabaseAdmin } from '../config/supabase.js';
import type { Licitacion, ArchivoLicitacion } from '../types/licitacion.types.js';

export class LicitacionesService {

    async guardarLicitacion(licitacionData: Partial<Licitacion>): Promise<Licitacion | null> {
        try {
            // const { data, error } = await supabaseAdmin
            //     .from('licitaciones')
            //     .upsert({
            //         ...licitacionData,
            //         updated_at: new Date().toISOString()
            //     }, {
            //         onConflict: 'codigo_oportunidad'
            //     })
            //     .select()
            //     .single()

            // if (error) {
            //     console.error('Error guardando licitación:', error)
            //     await this.logError('guardar_licitacion', error.message, licitacionData)
            //     return null
            // }

            // await this.logOperacion('extraccion', 'completado', `Licitación ${licitacionData.codigo_oportunidad} guardada exitosamente`, { licitacion_id: data.id })

            // return data
            return null
        } catch (error) {
            console.error('Error inesperado:', error)
            return null
        }
    }

    async obtenerLicitacionesPendientes(limite: number = 50): Promise<Licitacion[]> {
        return []
    }

    async marcarScrapingCompletado(licitacionId: string): Promise<boolean> {
        return true
    }

    private async logOperacion(
        tipo: string,
        estado: string,
        mensaje: string,
        detalles: any = {}
    ): Promise<void> {
    }

    private async logError(operacion: string, error: string, contexto: any): Promise<void> {
        await this.logOperacion(operacion, 'error', error, { contexto })
    }
}