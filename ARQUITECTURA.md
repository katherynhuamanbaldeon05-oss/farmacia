# 🏗️ DOCUMENTACIÓN DE ARQUITECTURA HEXAGONAL

## Introducción

El **Sistema de Gestión de Farmacia** implementa la **Arquitectura Hexagonal** (también conocida como Puertos y Adaptadores), un patrón de arquitectura que separa la lógica de negocio del sistema de cualquier dependencia externa.

---

## 📊 Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERFAZ DE USUARIO                       │
│         (HTML, CSS, JavaScript - Bootstrap)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              ADAPTADORES DE ENTRADA (IN)                     │
│    Controladores HTTP (Express) y Rutas API REST             │
│  - MedicamentoController     - medicamentoRoutes             │
│  - ClienteController         - clienteRoutes                 │
│  - VentaController           - ventaRoutes                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│         CAPA DE APLICACIÓN (DIContainer)                     │
│     - Inyección de Dependencias                              │
│     - Orquestación de Servicios                              │
│     - Ensamblaje de Componentes                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
┌──────────────────────┐    ┌──────────────────────┐
│   PUERTOS (Interfaces)     │   CASOS DE USO       │
│─────────────────────       │─────────────────────│
│ MedicamentoRepository      │ CrearMedicamento    │
│ ClienteRepository          │ ObtenerMedicamentos │
│ VentaRepository            │ ActualizarMedicamento
│ AlertaStockPort            │ EliminarMedicamento │
│                            │ RegistrarCliente    │
│                            │ ObtenerClientes     │
│                            │ ProcesarVenta       │
│                            │ ObtenerVentas       │
│                            │ VerificarStockBajo  │
└──────────────────────┘    └──────────────────────┘
        │                             │
        │    ┌────────────────────────┤
        │    │    DOMINIO (Núcleo)    │
        │    │───────────────────────│
        │    │ Entidades:            │
        │    │  - Medicamento        │
        │    │  - Cliente            │
        │    │  - Venta              │
        │    │  - DetalleVenta       │
        │    │                       │
        │    │ Lógica de Negocio     │
        │    └───────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│            ADAPTADORES DE SALIDA (OUT)                       │
│              Implementaciones de Puertos                      │
│─────────────────────────────────────────────────────────────│
│ Database:                                                    │
│  - MedicamentoRepositoryMySQL    - connection.js            │
│  - ClienteRepositoryMySQL                                   │
│  - VentaRepositoryMySQL                                     │
│                                                              │
│ Alerts:                                                      │
│  - AlertaStockConsola                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │    SERVICIOS EXTERNOS        │
        ├──────────────────────────────┤
        │ • MySQL (Base de Datos)      │
        │ • Console (Alertas)          │
        └──────────────────────────────┘
```

---

## 🎯 Principios Clave

### 1. **Independencia del Dominio**
El dominio (casos de uso y entidades) no depende de ningún framework ni tecnología externa. Contiene toda la lógica de negocio pura.

### 2. **Puertos**
Son interfaces que definen qué servicios externos el sistema necesita:
- `MedicamentoRepository` - Para persistir medicamentos
- `ClienteRepository` - Para persistir clientes
- `VentaRepository` - Para persistir ventas
- `AlertaStockPort` - Para enviar alertas

### 3. **Adaptadores**
Implementan los puertos usando tecnologías específicas:
- **Entrada**: Controladores Express que reciben HTTP y llaman casos de uso
- **Salida**: Repositorios MySQL que implementan los puertos

### 4. **Inyección de Dependencias**
El `DIContainer` se encarga de:
- Instanciar todas las dependencias
- Conectar casos de uso con adaptadores
- Pasar controladores a las rutas

---

## 📁 Estructura de Carpetas Explicada

```
src/
├── domain/                          # ⭐ NÚCLEO DEL NEGOCIO
│   ├── entities/                    # Modelos puros del dominio
│   │   ├── Medicamento.js          # Entidad medicamento con lógica de negocio
│   │   ├── Cliente.js              # Entidad cliente con puntos y descuentos
│   │   ├── Venta.js                # Entidad venta
│   │   └── DetalleVenta.js         # Entidad detalle venta
│   │
│   ├── ports/                       # 🔌 Interfaces/Puertos
│   │   ├── MedicamentoRepository.js # Puerto para medicamentos
│   │   ├── ClienteRepository.js     # Puerto para clientes
│   │   ├── VentaRepository.js       # Puerto para ventas
│   │   └── AlertaStockPort.js       # Puerto para alertas
│   │
│   └── usecases/                    # 💼 Casos de Uso
│       ├── CrearMedicamento.js
│       ├── ObtenerMedicamentos.js
│       ├── ActualizarMedicamento.js
│       ├── EliminarMedicamento.js
│       ├── RegistrarCliente.js
│       ├── ObtenerClientes.js
│       ├── ProcesarVenta.js         # Caso de uso crítico
│       ├── ObtenerVentas.js
│       └── VerificarStockBajo.js
│
├── application/                     # 📦 CAPA DE APLICACIÓN
│   └── DIContainer.js              # Orquestación y ensamblaje
│
├── adapters/                        # 🔄 ADAPTADORES
│   ├── in/                          # ENTRADA (requests HTTP)
│   │   └── web/
│   │       ├── MedicamentoController.js
│   │       ├── ClienteController.js
│   │       ├── VentaController.js
│   │       ├── medicamentoRoutes.js
│   │       ├── clienteRoutes.js
│   │       └── ventaRoutes.js
│   │
│   └── out/                         # SALIDA (servicios externos)
│       ├── database/
│       │   ├── connection.js
│       │   ├── MedicamentoRepositoryMySQL.js
│       │   ├── ClienteRepositoryMySQL.js
│       │   └── VentaRepositoryMySQL.js
│       │
│       └── alerts/
│           └── AlertaStockConsola.js
│
└── index.js                         # 🚀 Punto de entrada
```

---

## 🔄 Flujo de Datos - Ejemplo: Procesar Venta

### 1. **Solicitud HTTP (Adaptador IN)**
```
POST /api/ventas
{
  "clienteId": 1,
  "detalles": [
    { "medicamentoId": 1, "cantidad": 2 },
    { "medicamentoId": 3, "cantidad": 1 }
  ]
}
```

### 2. **Controlador**
```javascript
// VentaController.js
async procesar(req, res) {
  const { clienteId, detalles } = req.body;
  const resultado = await this.procesarVenta.ejecutar(clienteId, detalles);
  res.status(201).json({ exito: true, datos: resultado });
}
```

### 3. **Caso de Uso**
```javascript
// ProcesarVenta.js (Lógica de Negocio Pura)
async ejecutar(clienteId, detallesVenta) {
  // 1. Validar cliente
  const cliente = await this.clienteRepository.obtenerPorId(clienteId);
  
  // 2. Validar stock y detalles
  for (const detalle of detallesVenta) {
    const medicamento = await this.medicamentoRepository.obtenerPorId(...);
    // Validaciones...
  }
  
  // 3. Crear venta
  const venta = await this.ventaRepository.crear(...);
  
  // 4. Actualizar stock
  // 5. Verificar alertas
  // 6. Acumular puntos
}
```

### 4. **Adaptador OUT (Repositorio)**
```javascript
// MedicamentoRepositoryMySQL.js
async obtenerPorId(id) {
  const query = 'SELECT * FROM medicamentos WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  return rows.length > 0 ? rows[0] : null;
}
```

### 5. **Respuesta al Cliente**
```json
{
  "exito": true,
  "datos": {
    "venta": { "id": 5, "clienteId": 1, "total": 45.50 },
    "totalFinal": 40.95,
    "descuentoAplicado": 4.55,
    "puntosGanados": 4,
    "puntosActuales": 54
  }
}
```

---

## 🔐 Ventajas de la Arquitectura Hexagonal

| Ventaja | Descripción |
|---------|-----------|
| **Independencia** | El dominio no depende de frameworks |
| **Testeable** | Fácil crear tests unitarios sin bases de datos |
| **Flexible** | Cambiar MySQL por PostgreSQL sin tocar el dominio |
| **Mantenible** | Código organizado y separado por responsabilidades |
| **Escalable** | Fácil agregar nuevos adaptadores |
| **Reutilizable** | La lógica de negocio es agnóstica de UI |

---

## 🧪 Testing en Arquitectura Hexagonal

### Test de Caso de Uso (Sin base de datos)

```javascript
// test/usecases/ProcesarVenta.test.js
describe('ProcesarVenta', () => {
  it('debe procesar una venta correctamente', async () => {
    // Mock repositories
    const mockVentaRepo = {
      crear: jest.fn().mockResolvedValue({ id: 1 })
    };
    
    const procesarVenta = new ProcesarVenta(
      mockVentaRepo,
      mockMedicamentoRepo,
      mockClienteRepo,
      mockAlertaPort
    );
    
    const resultado = await procesarVenta.ejecutar(1, detalles);
    
    expect(resultado.exito).toBe(true);
    expect(mockVentaRepo.crear).toHaveBeenCalled();
  });
});
```

---

## 🔄 Cómo Agregar una Nueva Funcionalidad

### Ejemplo: Descuento por promoción

1. **Crear caso de uso** en `domain/usecases/AplicarPromocion.js`
2. **Crear puerto** en `domain/ports/PromocionRepository.js`
3. **Implementar repositorio** en `adapters/out/database/PromocionRepositoryMySQL.js`
4. **Crear controlador** en `adapters/in/web/PromocionController.js`
5. **Crear ruta** en `adapters/in/web/promocionRoutes.js`
6. **Registrar en DIContainer** en `application/DIContainer.js`
7. **Conectar ruta en index.js**

---

## 📚 Referencias

- [Arquitectura Hexagonal - Alistair Cockburn](http://alistair.cockburn.us/Hexagonal+architecture)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

---

**¡La Arquitectura Hexagonal permite crear sistemas profesionales, mantenibles y escalables!** 🚀
