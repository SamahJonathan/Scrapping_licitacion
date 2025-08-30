-- Insertar configuración inicial
INSERT INTO scraping_config (clave, valor, descripcion, tipo_dato) VALUES
  ('user_agent', 'Mozilla/5.0 (+contacto@example.com)', 'User agent para las requests', 'string'),
  ('scraping_horario_inicio', '22:00', 'Hora de inicio del scraping (formato HH:MM)', 'string'),
  ('scraping_horario_fin', '06:00', 'Hora de fin del scraping (formato HH:MM)', 'string'),
  ('notificaciones_email', 'true', 'Enviar notificaciones por email', 'boolean'),
  ('max_paginas_busqueda', '50', 'Máximo de páginas a recorrer en una búsqueda', 'number')
ON CONFLICT (clave) DO NOTHING;
