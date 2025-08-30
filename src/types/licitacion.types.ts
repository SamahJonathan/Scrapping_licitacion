export interface Licitacion {
    id: string;
    codigo_oportunidad: string;
    nombre: string;
    descripcion: string;
    organismo_publico: string;
    fecha_publicacion: string;
    fecha_cierre: string;
    estado: string;
    monto_estimado: number;
    moneda: string;
    url_licitacion: string;
    scraping_completado: boolean;
    created_at: string;
    updated_at: string;
}

export interface ArchivoLicitacion {
    id: string;
    licitacion_id: string;
    nombre_archivo: string;
    nombre_original: string;
    tipo_archivo: string;
    categoria_documento: string;
    tamaño_bytes: number;
    url_descarga: string;
    ruta_storage: string;
    bucket_name: string;
    checksum_md5: string;
    descargado: boolean;
    descarga_exitosa: boolean;
    fecha_descarga: string;
    intentos_descarga: number;
    ultimo_error: string;
    created_at: string;
    updated_at: string;
}
