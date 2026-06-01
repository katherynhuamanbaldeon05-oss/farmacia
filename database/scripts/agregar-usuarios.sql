-- Agregar tabla de usuarios a farmacia_db
USE farmacia_db;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  usuario VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  rol ENUM('admin', 'vendedor', 'gerente') NOT NULL DEFAULT 'vendedor',
  activo BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_usuario (usuario),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar usuarios de ejemplo
-- Usuario: admin, Contraseña: admin123
-- Usuario: vendedor, Contraseña: vendedor123
INSERT INTO usuarios (nombre, email, usuario, contrasena, rol) VALUES
('Farmacia', 'farmacia@gmail.com', 'farmacia@gmail.com', '$2a$10$q.QmUmnWen2F./DD.8kh2Or1gYk0hpOCUAglxOI4SEAVOvl6laqsq', 'admin');

-- NOTA: La contraseña para este usuario es farmacia1234.
