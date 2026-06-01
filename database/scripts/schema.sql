-- Crear base de datos
CREATE DATABASE IF NOT EXISTS farmacia_db;
USE farmacia_db;

-- Tabla de Medicamentos
CREATE TABLE medicamentos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL UNIQUE,
  descripcion TEXT,
  precio DECIMAL(10, 2) NOT NULL,
  cantidad INT NOT NULL DEFAULT 0,
  alerta_stock INT NOT NULL DEFAULT 5,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_nombre (nombre),
  INDEX idx_stock (cantidad)
);

-- Tabla de Clientes
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  dni VARCHAR(8) NOT NULL UNIQUE,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  telefono VARCHAR(20),
  puntos INT NOT NULL DEFAULT 0,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_dni (dni),
  INDEX idx_nombre (nombre),
  INDEX idx_puntos (puntos)
);

-- Tabla de Ventas
CREATE TABLE ventas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(12, 2) NOT NULL,
  descuento_aplicado DECIMAL(12, 2) DEFAULT 0,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT,
  INDEX idx_cliente_id (cliente_id),
  INDEX idx_fecha (fecha)
);

-- Tabla de Detalles de Venta
CREATE TABLE detalles_venta (
  id INT PRIMARY KEY AUTO_INCREMENT,
  venta_id INT NOT NULL,
  medicamento_id INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (medicamento_id) REFERENCES medicamentos(id) ON DELETE RESTRICT,
  INDEX idx_venta_id (venta_id),
  INDEX idx_medicamento_id (medicamento_id)
);

-- Insertar medicamentos de ejemplo
INSERT INTO medicamentos (nombre, descripcion, precio, cantidad, alerta_stock) VALUES
('Paracetamol 500mg', 'Analgésico y antipirético', 5.50, 100, 10),
('Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo', 7.00, 50, 10),
('Amoxicilina 500mg', 'Antibiótico de amplio espectro', 15.00, 30, 5),
('Omeprazol 20mg', 'Inhibidor de la bomba de protones', 12.00, 25, 5),
('Metformina 500mg', 'Antidiabético', 8.50, 45, 5),
('Vitamina C 500mg', 'Suplemento vitamínico', 6.00, 120, 10),
('Vitamina D3 1000IU', 'Suplemento de vitamina D', 14.50, 60, 5),
('Loratadina 10mg', 'Antihistamínico', 9.00, 40, 5),
('Atorvastatina 20mg', 'Reductor de colesterol', 18.00, 35, 5),
('Aspirina 100mg', 'Antiagregante plaquetario', 4.00, 150, 10);

-- Insertar clientes de ejemplo
INSERT INTO clientes (nombre, dni, apellido, email, telefono, puntos) VALUES
('Juan', '12345678', 'García López', 'juan.garcia@email.com', '999111222', 50),
('María', '23456789', 'Martínez Silva', 'maria.martinez@email.com', '999222333', 75),
('Carlos', '34567890', 'Rodríguez Pérez', 'carlos.rodriguez@email.com', '999333444', 120),
('Ana', '45678901', 'Fernández Gómez', 'ana.fernandez@email.com', '999444555', 30),
('Pedro', '56789012', 'López Hernández', 'pedro.lopez@email.com', '999555666', 95);

-- Vistas útiles
CREATE VIEW vw_medicamentos_stock_bajo AS
SELECT 
  id,
  nombre,
  descripcion,
  precio,
  cantidad,
  alerta_stock,
  CASE 
    WHEN cantidad < alerta_stock THEN 'BAJO'
    WHEN cantidad < alerta_stock * 2 THEN 'MEDIO'
    ELSE 'NORMAL'
  END AS estado_stock
FROM medicamentos
WHERE cantidad < alerta_stock * 2
ORDER BY cantidad ASC;

CREATE VIEW vw_resumen_ventas AS
SELECT 
  v.id,
  v.fecha,
  c.nombre as cliente_nombre,
  c.dni,
  COUNT(dv.id) as cantidad_items,
  v.total,
  v.descuento_aplicado,
  (v.total - v.descuento_aplicado) as total_neto
FROM ventas v
JOIN clientes c ON v.cliente_id = c.id
LEFT JOIN detalles_venta dv ON v.id = dv.venta_id
GROUP BY v.id, v.fecha, c.nombre, c.dni, v.total, v.descuento_aplicado
ORDER BY v.fecha DESC;

CREATE VIEW vw_cliente_puntos AS
SELECT 
  id,
  nombre,
  dni,
  apellido,
  puntos,
  CASE 
    WHEN puntos >= 100 THEN '10% descuento'
    WHEN puntos >= 50 THEN '5% descuento'
    ELSE 'Sin descuento'
  END AS nivel_fidelizacion
FROM clientes
ORDER BY puntos DESC;

COMMIT;
