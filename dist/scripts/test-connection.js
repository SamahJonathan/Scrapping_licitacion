import { supabase } from '../config/supabase.js';
;
async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('scraping_config')
            .select('*')
            .limit(1);
        if (error) {
            console.error('❌ Error conectando a Supabase:', error.message);
        }
        else {
            console.log('✅ Conexión exitosa a Supabase');
            console.log('📊 Proyecto:', 'xxpwbkzxanrhtayzojly');
        }
    }
    catch (error) {
        console.error('❌ Error de red:', error);
    }
}
testConnection();
//# sourceMappingURL=test-connection.js.map