/**
 * Script para hashear contraseñas y generar SQL
 * Ejecutar en Node.js: node hash-passwords.js
 */
const bcrypt = require('bcryptjs');

const usuarios = [
  { usuario: 'admin', contrasena: 'admin123' },
  { usuario: 'vendedor', contrasena: 'vendedor123' },
  { usuario: 'gerente', contrasena: 'gerente123' }
];

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║  Script para hashear contraseñas                        ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

(async () => {
  for (const user of usuarios) {
    const hash = await bcrypt.hash(user.contrasena, 10);
    console.log(`Usuario: ${user.usuario}`);
    console.log(`Contraseña: ${user.contrasena}`);
    console.log(`Hash: ${hash}`);
    console.log('---\n');
  }
})();
