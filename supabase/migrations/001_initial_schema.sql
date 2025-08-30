-- Tabla para almacenar las licitaciones extraídas
CREATE TABLE licitaciones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo_oportunidad VARCHAR(50) UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    organismo_publico VARCHAR(255),
    fecha_publicacion TIMESTAMPTZ,
    fecha_cierre TIMESTAMPTZ,
    estado VARCHAR(50),
    monto_estimado NUMERIC(20, 2),
    moneda VARCHAR(10),
    url_licitacion TEXT,
    scraping_completado BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla para los archivos asociados a una licitación
CREATE TABLE archivos_licitacion (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    licitacion_id UUID REFERENCES licitaciones(id) ON DELETE CASCADE,
    nombre_archivo TEXT NOT NULL,
    nombre_original TEXT,
    tipo_archivo VARCHAR(50),
    categoria_documento VARCHAR(100), -- ej: bases, anexos, aclaraciones
    tamaño_bytes BIGINT,
    url_descarga TEXT UNIQUE,
    ruta_storage TEXT,
    bucket_name VARCHAR(100),
    checksum_md5 VARCHAR(32),
    descargado BOOLEAN DEFAULT false,
    descarga_exitosa BOOLEAN DEFAULT false,
    fecha_descarga TIMESTAMPTZ,
    intentos_descarga INT DEFAULT 0,
    ultimo_error TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla para logs de operaciones de scraping
CREATE TABLE scraping_logs (
    id BIGSERIAL PRIMARY KEY,
    tipo_operacion VARCHAR(50), -- ej: extraccion, descarga, parseo
    estado VARCHAR(50), -- ej: iniciado, completado, error
    mensaje TEXT,
    detalles JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de configuración para el scraper
CREATE TABLE scraping_config (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    clave VARCHAR(100) UNIQUE NOT NULL,
    valor TEXT,
    descripcion TEXT,
    tipo_dato VARCHAR(20) DEFAULT 'string', -- string, number, boolean
    activo BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar RLS en todas las tablas
ALTER TABLE licitaciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE archivos_licitacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scraping_config ENABLE ROW LEVEL SECURITY;

-- Política para permitir operaciones del servicio
CREATE POLICY "Permitir todo al service role" ON licitaciones
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Permitir todo al service role" ON archivos_licitacion
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Permitir todo al service role" ON scraping_logs
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Permitir lectura config" ON scraping_config
    FOR SELECT USING (activo = true);

-- Política para usuarios autenticados (solo lectura)
CREATE POLICY "Lectura para usuarios autenticados" ON licitaciones
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Lectura archivos para usuarios autenticados" ON archivos_licitacion
    FOR SELECT USING (auth.role() = 'authenticated');
