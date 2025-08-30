import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types.js';

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

// Cliente para operaciones públicas/autenticadas
export const supabase: SupabaseClient<Database> = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            autoRefreshToken: true,
            persistSession: false // Para aplicaciones server-side
        }
    }
)

// Cliente administrador para operaciones del sistema
export const supabaseAdmin: SupabaseClient<Database> = createClient<Database>(
    supabaseUrl,
    supabaseServiceKey || supabaseAnonKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
)

// Configuración del bucket de storage
export const STORAGE_CONFIG = {
    bucketName: process.env.STORAGE_BUCKET_NAME || 'licitaciones-documentos',
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE_MB || '100') * 1024 * 1024,
    allowedMimeTypes: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/zip',
        'application/x-rar-compressed',
        'text/plain'
    ]
}
