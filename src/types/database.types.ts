export type Json = | string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      licitaciones: {
        Row: {
          id: string
          codigo_oportunidad: string
          nombre: string
          descripcion: string | null
          organismo_publico: string | null
          fecha_publicacion: string | null
          fecha_cierre: string | null
          estado: string | null
          monto_estimado: number | null
          moneda: string | null
          url_licitacion: string | null
          scraping_completado: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          codigo_oportunidad: string
          nombre: string
          descripcion?: string | null
          organismo_publico?: string | null
          fecha_publicacion?: string | null
          fecha_cierre?: string | null
          estado?: string | null
          monto_estimado?: number | null
          moneda?: string | null
          url_licitacion?: string | null
          scraping_completado?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          codigo_oportunidad?: string
          nombre?: string
          descripcion?: string | null
          organismo_publico?: string | null
          fecha_publicacion?: string | null
          fecha_cierre?: string | null
          estado?: string | null
          monto_estimado?: number | null
          moneda?: string | null
          url_licitacion?: string | null
          scraping_completado?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      archivos_licitacion: {
        Row: {
          id: string
          licitacion_id: string
          nombre_archivo: string
          nombre_original: string | null
          tipo_archivo: string | null
          categoria_documento: string | null
          tamaño_bytes: number | null
          url_descarga: string
          ruta_storage: string | null
          bucket_name: string | null
          checksum_md5: string | null
          descargado: boolean
          descarga_exitosa: boolean
          fecha_descarga: string | null
          intentos_descarga: number
          ultimo_error: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          licitacion_id: string
          nombre_archivo: string
          nombre_original?: string | null
          tipo_archivo?: string | null
          categoria_documento?: string | null
          tamaño_bytes?: number | null
          url_descarga: string
          ruta_storage?: string | null
          bucket_name?: string | null
          checksum_md5?: string | null
          descargado?: boolean
          descarga_exitosa?: boolean
          fecha_descarga?: string | null
          intentos_descarga?: number
          ultimo_error?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          licitacion_id?: string
          nombre_archivo?: string
          nombre_original?: string | null
          tipo_archivo?: string | null
          categoria_documento?: string | null
          tamaño_bytes?: number | null
          url_descarga?: string
          ruta_storage?: string | null
          bucket_name?: string | null
          checksum_md5?: string | null
          descargado?: boolean
          descarga_exitosa?: boolean
          fecha_descarga?: string | null
          intentos_descarga?: number
          ultimo_error?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      scraping_logs: {
        Row: {
          id: number
          tipo_operacion: string | null
          estado: string | null
          mensaje: string | null
          detalles: Json | null
          created_at: string
        }
        Insert: {
          id?: number
          tipo_operacion?: string | null
          estado?: string | null
          mensaje?: string | null
          detalles?: Json | null
          created_at?: string
        }
        Update: {
          id?: number
          tipo_operacion?: string | null
          estado?: string | null
          mensaje?: string | null
          detalles?: Json | null
          created_at?: string
        }
      }
      scraping_config: {
        Row: {
          id: number
          clave: string
          valor: string | null
          descripcion: string | null
          tipo_dato: string | null
          activo: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          clave: string
          valor?: string | null
          descripcion?: string | null
          tipo_dato?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          clave?: string
          valor?: string | null
          descripcion?: string | null
          tipo_dato?: string | null
          activo?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
