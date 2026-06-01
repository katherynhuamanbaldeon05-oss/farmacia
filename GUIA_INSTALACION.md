# 📋 GUÍA DE INSTALACIÓN Y USO

## Sistema de Gestión de Farmacia - Arquitectura Hexagonal

---

## 1️⃣ REQUISITOS PREVIOS

- **Node.js** v14 o superior
- **MySQL** (incluido en XAMPP)
- **npm** (incluido con Node.js)
- **XAMPP** instalado en `C:\xampp` (o tu ruta correspondiente)

---

## 2️⃣ PASOS DE INSTALACIÓN

### Paso 1: Preparar la Base de Datos

1. Abre **phpMyAdmin** (generalmente en `http://localhost/phpmyadmin`)
2. Ve a la pestaña **SQL**
3. Copia y pega el contenido de `database/scripts/schema.sql`
4. Haz clic en **Ejecutar**

Esto creará:
- Base de datos: `farmacia_db`
- Tablas: `medicamentos`, `clientes`, `ventas`, `detalles_venta`
- Vistas útiles para reportes
- Datos de ejemplo

### Paso 2: Instalar Dependencias

```bash
cd d:\xampp\htdocs\farmacia
npm install
```

### Paso 3: Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
```bash
copy .env.example .env
```

2. Edita `.env` con tus credenciales (generalmente ya están correctas):
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=farmacia_db
DB_PORT=3306
SERVER_PORT=3000
NODE_ENV=development
```

### Paso 4: Iniciar la Aplicación

```bash
npm start
```

O para modo desarrollo con reinicio automático:

```bash
npm run dev
```

---

## 3️⃣ ACCESO A LA APLICACIÓN

Una vez iniciado el servidor, accede en tu navegador:

```
http://localhost:3000
```

---

## 4️⃣ ESTRUCTURA DE LA ARQUITECTURA

```
src/
├── domain/
│   ├── entities/          # Modelos del negocio
│   │   ├── Medicamento.js
│   │   ├── Cliente.js
│   │   ├── Venta.js
│   │   └── DetalleVenta.js
│   ├── ports/            # Interfaces/Puertos
│   │   ├── MedicamentoRepository.js
│   │   ├── ClienteRepository.js
│   │   ├── VentaRepository.js
│   │   └── AlertaStockPort.js
│   └── usecases/         # Casos de uso
│       ├── CrearMedicamento.js
│       ├── ObtenerMedicamentos.js
│       ├── RegistrarCliente.js
│       ├── ProcesarVenta.js
│       └── VerificarStockBajo.js
│
├── application/
│   └── DIContainer.js    # Inyección de dependencias
│
├── adapters/
│   ├── in/web/           # Controladores HTTP
│   │   ├── MedicamentoController.js
│   │   ├── ClienteController.js
│   │   ├── VentaController.js
│   │   └── *Routes.js
│   └── out/
│       ├── database/     # Repositorios MySQL
│       └── alerts/       # Implementación de alertas
│
└── index.js             # Punto de entrada
```

---

## 5️⃣ ENDPOINTS API

### 📦 Medicamentos

- **GET** `/api/medicamentos` - Obtener todos
- **GET** `/api/medicamentos/:id` - Obtener por ID
- **GET** `/api/medicamentos?nombre=...` - Buscar por nombre
- **GET** `/api/medicamentos/stock-bajo` - Obtener stock bajo
- **POST** `/api/medicamentos` - Crear
- **PUT** `/api/medicamentos/:id` - Actualizar
- **DELETE** `/api/medicamentos/:id` - Eliminar

### 👥 Clientes

- **GET** `/api/clientes` - Obtener todos
- **GET** `/api/clientes/:id` - Obtener por ID
- **GET** `/api/clientes/dni/:dni` - Buscar por DNI
- **POST** `/api/clientes` - Registrar

### 💳 Ventas

- **GET** `/api/ventas` - Obtener todas
- **GET** `/api/ventas/cliente/:clienteId` - Ventas de cliente
- **GET** `/api/ventas/stock-bajo` - Verificar stock bajo
- **POST** `/api/ventas` - Procesar venta

---

## 6️⃣ CARACTERÍSTICAS PRINCIPALES

### ✅ Gestión de Medicamentos
- Crear, actualizar y eliminar medicamentos
- Búsqueda por nombre
- Control de inventario
- Alertas de stock bajo

### ✅ Gestión de Clientes
- Registro por DNI único
- Sistema de puntos de fidelización
- Beneficios automáticos según puntos

### ✅ Sistema de Puntos
- **S/10 de compra = 1 punto**
- **50 puntos = 5% descuento**
- **100 puntos = 10% descuento**

### ✅ Gestión de Ventas
- Procesamiento completo de ventas
- Aplicación automática de descuentos
- Actualización de puntos
- Alertas de stock bajo

### ✅ Reportes
- Reporte de stock
- Reporte de clientes y fidelización
- Reporte de ventas

---

## 7️⃣ EJEMPLO DE USO - CREAR MEDICAMENTO

### Vía API (curl):
```bash
curl -X POST http://localhost:3000/api/medicamentos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Paracetamol 500mg",
    "descripcion": "Analgésico y antipirético",
    "precio": 5.50,
    "cantidad": 100
  }'
```

### Vía Interfaz Web:
1. Ir a **Medicamentos**
2. Hacer clic en **Nuevo Medicamento**
3. Completar formulario
4. Guardar

---

## 8️⃣ EJEMPLO DE USO - PROCESAR VENTA

1. Ir a **Ventas**
2. Hacer clic en **Nueva Venta**
3. Seleccionar cliente
4. Agregar medicamentos (cantidad)
5. El descuento se calcula automáticamente
6. Procesar venta
7. Los puntos se acumulan automáticamente

---

## 9️⃣ DATOS DE EJEMPLO

La base de datos incluye:

- **10 medicamentos** variados
- **5 clientes** de prueba
- **Todos con stock suficiente** para hacer pruebas

Puedes:
- Modificar datos existentes
- Crear nuevos medicamentos/clientes
- Realizar transacciones de prueba

---

## 🔟 SOLUCIÓN DE PROBLEMAS

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "connect ECONNREFUSED" (Base de datos)
- Asegúrate que MySQL esté corriendo en XAMPP
- Verifica las credenciales en `.env`
- Confirma que la base de datos existe

### Error: Puerto 3000 en uso
Cambia el puerto en `.env`:
```
SERVER_PORT=3001
```

### Base de datos vacía
Re-ejecuta el script SQL en phpMyAdmin:
```sql
-- Copia el contenido de database/scripts/schema.sql
```

---

## 1️⃣1️⃣ NOTAS IMPORTANTES

1. **Primera ejecución**: Espera a que la consola muestre el mensaje de "Servidor iniciado"
2. **Actualización**: La interfaz web se actualiza automáticamente
3. **Errores en consola**: Revisa la terminal de Node.js para detalles
4. **Descuentos**: Se aplican automáticamente al procesar la venta

---

## 1️⃣2️⃣ TECNOLOGÍAS UTILIZADAS

| Capa | Tecnología |
|------|-----------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript |
| **Backend** | Node.js, Express.js |
| **Base de Datos** | MySQL |
| **Arquitectura** | Hexagonal (Puertos y Adaptadores) |

---

## 1️⃣3️⃣ AUTOR Y LICENCIA

- **Proyecto**: Sistema de Gestión de Farmacia
- **Arquitectura**: Hexagonal
- **Licencia**: MIT
- **Año**: 2024

---

## 📞 SOPORTE

Para reportar problemas o sugerencias:
1. Verifica los logs en la consola
2. Revisa que todos los servicios estén activos
3. Consulta esta guía

---

**¡Sistema listo para usar! 🎉**
