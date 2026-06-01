/**
 * Script de prueba de conexión a MySQL
 */
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔍 Intentando conectar a MySQL...');
    console.log(`Host: ${process.env.DB_HOST}`);
    console.log(`Usuario: ${process.env.DB_USER}`);
    console.log(`Base de datos: ${process.env.DB_NAME}`);
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'farmacia_db',
      port: process.env.DB_PORT || 3306
    });
    
    console.log('✅ Conexión exitosa!');
    
    // Verificar medicamentos
    const [medicamentos] = await connection.execute('SELECT COUNT(*) as total FROM medicamentos');
    console.log(`📊 Total de medicamentos: ${medicamentos[0].total}`);
    
    // Verificar clientes
    const [clientes] = await connection.execute('SELECT COUNT(*) as total FROM clientes');
    console.log(`👥 Total de clientes: ${clientes[0].total}`);
    
    await connection.end();
    console.log('✅ Prueba completada');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
