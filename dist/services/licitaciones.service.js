export class LicitacionesService {
    async guardarLicitacion(licitacionData) {
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
            return null;
        }
        catch (error) {
            console.error('Error inesperado:', error);
            return null;
        }
    }
    async obtenerLicitacionesPendientes(limite = 50) {
        return [];
    }
    async marcarScrapingCompletado(licitacionId) {
        return true;
    }
    async logOperacion(tipo, estado, mensaje, detalles = {}) {
    }
    async logError(operacion, error, contexto) {
        await this.logOperacion(operacion, 'error', error, { contexto });
    }
}
//# sourceMappingURL=licitaciones.service.js.map