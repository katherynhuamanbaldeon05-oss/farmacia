## 🚀 INICIO RÁPIDO

### 1️⃣ Instalar dependencias
```bash
npm install
```

### 2️⃣ Configurar base de datos
1. Abre phpMyAdmin: `http://localhost/phpmyadmin`
2. Ve a SQL y copia todo de `database/scripts/schema.sql`
3. Ejecuta

### 3️⃣ Iniciar servidor
```bash
npm start
```

### 4️⃣ Acceder a la aplicación
```
http://localhost:3000
```

---

## 📊 Características

✅ CRUD Medicamentos  
✅ CRUD Clientes (por DNI)  
✅ Sistema de Puntos (S/10 = 1 punto)  
✅ Descuentos automáticos (50pts→5%, 100pts→10%)  
✅ Procesamiento de Ventas  
✅ Alertas de Stock Bajo  
✅ Reportes Completos  

---

## 📁 Estructura

```
Arquitectura Hexagonal
├── Domain (Lógica de negocio)
├── Application (Inyección de dependencias)
├── Adapters (Controladores + Repositorios)
└── Public (HTML/CSS/JS)
```

---

## 📚 Documentación Completa

- **GUIA_INSTALACION.md** - Instalación paso a paso
- **ARQUITECTURA.md** - Explicación de la arquitectura
- **README.md** - Visión general del proyecto

---

## 💡 Ejemplo de API

**Crear Medicamento:**
```json
POST /api/medicamentos
{
  "nombre": "Paracetamol",
  "descripcion": "Analgésico",
  "precio": 5.50,
  "cantidad": 100
}
```

**Registrar Cliente:**
```json
POST /api/clientes
{
  "nombre": "Juan",
  "apellido": "García",
  "dni": "12345678",
  "email": "juan@email.com",
  "telefono": "999111222"
}
```

**Procesar Venta:**
```json
POST /api/ventas
{
  "clienteId": 1,
  "detalles": [
    { "medicamentoId": 1, "cantidad": 2 },
    { "medicamentoId": 3, "cantidad": 1 }
  ]
}
```

---

## 🛠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| "Cannot find module" | Ejecuta `npm install` |
| BD no conecta | Verifica MySQL activo en XAMPP |
| Puerto 3000 en uso | Cambia en `.env` a otro puerto |
| Datos no aparecer | Vuelve a ejecutar schema.sql en phpMyAdmin |

---

## 📞 Stack Tecnológico

- **Backend**: Node.js + Express
- **BD**: MySQL
- **Frontend**: HTML5 + CSS3 + Bootstrap 5 + JS Vanilla
- **Arquitectura**: Hexagonal

---

**¡Todo listo para usar! 🎉**
