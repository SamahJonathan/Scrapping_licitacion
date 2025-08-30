import axios from 'axios'
import crypto from 'crypto'
import path from 'path'
import { supabaseAdmin, STORAGE_CONFIG } from '../config/supabase.js';

export class DownloaderService {

    async descargarYGuardarArchivo(
        url: string,
        licitacionId: string,
        nombreArchivo: string,
        categoria: string = 'otros'
    ): Promise<boolean> {
        try {
            // 1. Verificar si ya existe
            const archivoExistente = await this.verificarArchivoExistente(url, licitacionId)
            if (archivoExistente) {
                console.log(`Archivo ya existe: ${nombreArchivo}`)
                return true
            }

            // 2. Descargar archivo
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                timeout: 60000,
                headers: {
                    'User-Agent': process.env.USER_AGENT || 'MercadoPublicoScraper/1.0'
                }
            })

            // 3. Validar tamaño
            if (response.data.length > STORAGE_CONFIG.maxFileSize) {
                console.warn(`Archivo muy grande: ${nombreArchivo} (${response.data.length} bytes)`)
                return false
            }

            // 4. Calcular hash
            const buffer = Buffer.from(response.data)
            const hash = crypto.createHash('md5').update(buffer).digest('hex')

            // 5. Generar ruta única
            const extension = path.extname(nombreArchivo) || '.bin'
            const rutaStorage = this.generarRutaStorage(licitacionId, categoria, nombreArchivo)

            // 6. Subir a Supabase Storage
            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                .from(STORAGE_CONFIG.bucketName)
                .upload(rutaStorage, buffer, {
                    contentType: this.obtenerContentType(extension),
                    upsert: false
                })

            if (uploadError) {
                console.error('Error subiendo archivo:', uploadError)
                return false
            }

            // 7. Guardar metadata en base de datos
            const { error: dbError } = await supabaseAdmin
                .from('archivos_licitacion')
                .insert({
                    licitacion_id: licitacionId,
                    nombre_archivo: nombreArchivo,
                    nombre_original: nombreArchivo,
                    tipo_archivo: extension.replace('.', ''),
                    categoria_documento: categoria,
                    tamaño_bytes: buffer.length,
                    url_descarga: url,
                    ruta_storage: rutaStorage,
                    bucket_name: STORAGE_CONFIG.bucketName,
                    checksum_md5: hash,
                    descargado: true,
                    descarga_exitosa: true,
                    fecha_descarga: new Date().toISOString()
                } as any)

            if (dbError) {
                console.error('Error guardando metadata:', dbError)
                // Intentar eliminar archivo subido
                await supabaseAdmin.storage
                    .from(STORAGE_CONFIG.bucketName)
                    .remove([rutaStorage])
                return false
            }

            console.log(`Archivo descargado exitosamente: ${nombreArchivo}`)
            return true

        } catch (error) {
            console.error('Error descargando archivo:', error)
            await this.registrarErrorDescarga(url, licitacionId, nombreArchivo, error)
            return false
        }
    }

    private generarRutaStorage(licitacionId: string, categoria: string, nombreArchivo: string): string {
        const fecha = new Date()
        const año = fecha.getFullYear()
        const mes = String(fecha.getMonth() + 1).padStart(2, '0')
        const timestamp = Date.now()
        const extension = path.extname(nombreArchivo)
        const nombreLimpio = nombreArchivo.replace(/[^a-zA-Z0-9.-]/g, '_')

        return `${año}/${mes}/${licitacionId}/${categoria}/${timestamp}_${nombreLimpio}`
    }

    private obtenerContentType(extension: string): string {
        const mimeTypes: { [key: string]: string } = {
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.zip': 'application/zip',
            '.rar': 'application/x-rar-compressed',
            '.txt': 'text/plain'
        }
        return mimeTypes[extension.toLowerCase()] || 'application/octet-stream'
    }

    private async verificarArchivoExistente(url: string, licitacionId: string): Promise<boolean> {
        const { data } = await (supabaseAdmin as any)
            .from('archivos_licitacion')
            .select('id')
            .eq('url_descarga', url)
            .eq('licitacion_id', licitacionId)
            .eq('descarga_exitosa', true)
            .single()

        return !!data
    }

    private async registrarErrorDescarga(
        url: string,
        licitacionId: string,
        nombreArchivo: string,
        error: any
    ): Promise<void> {
        await (supabaseAdmin as any)
            .from('archivos_licitacion')
            .upsert({
                licitacion_id: licitacionId,
                nombre_archivo: nombreArchivo,
                url_descarga: url,
                descargado: false,
                descarga_exitosa: false,
                ultimo_error: (error as Error).message || 'Error desconocido',
                intentos_descarga: 1
            } as any, {
                onConflict: 'url_descarga, licitacion_id',
                ignoreDuplicates: false
            })
    }
}
