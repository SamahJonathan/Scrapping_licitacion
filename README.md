# Mercado Publico Scraper

## Flujo Principal

```mermaid
flowchart TD
    A[Iniciar Scraping] --> B[Cargar Configuración desde Supabase]
    B --> C[Verificar Rate Limiting]
    C --> D[Buscar Licitaciones en MercadoPublico.cl]
    D --> E{¿Encontró Licitaciones?}
    E -->|Sí| F[Procesar cada Licitación]
    E -->|No| G[Esperar y Reintentar]

    F --> H[Extraer Datos Básicos]
    H --> I[Guardar en tabla 'licitaciones']
    I --> J[Obtener URLs de Archivos]
    J --> K{¿Hay Archivos?}

    K -->|Sí| L[Descargar Archivo]
    K -->|No| P[Marcar Scraping Completado]

    L --> M[Subir a Supabase Storage]
    M --> N[Guardar metadata en 'archivos_licitacion']
    N --> O{¿Más Archivos?}
    O -->|Sí| L
    O -->|No| P

    P --> Q[Log de Operación Exitosa]
    Q --> R{¿Más Licitaciones?}
    R -->|Sí| F
    R -->|No| S[Finalizar]

    G --> T[Log de Error]
    T --> S
```

## API Endpoints

- `GET /api/licitaciones` - Listar licitaciones con filtros
- `GET /api/licitaciones/:id` - Obtener licitación específica
- `GET /api/licitaciones/:id/archivos` - Listar archivos de una licitación
- `POST /api/scraping/iniciar` - Iniciar proceso de scraping
- `GET /api/scraping/status` - Estado actual del scraping
- `GET /api/configuracion` - Obtener configuración actual
- `PUT /api/configuracion` - Actualizar configuración
