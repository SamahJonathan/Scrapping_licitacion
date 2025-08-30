import { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types.js';
export declare const supabase: SupabaseClient<Database>;
export declare const supabaseAdmin: SupabaseClient<Database>;
export declare const STORAGE_CONFIG: {
    bucketName: string;
    maxFileSize: number;
    allowedMimeTypes: string[];
};
//# sourceMappingURL=supabase.d.ts.map