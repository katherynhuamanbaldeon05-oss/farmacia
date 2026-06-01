/**
 * Controlador: Clientes
 */
class ClienteController {
  constructor(registrarCliente, obtenerClientes) {
    this.registrarCliente = registrarCliente;
    this.obtenerClientes = obtenerClientes;
  }

  async registrar(req, res) {
    try {
      const { nombre, dni, apellido, email, telefono } = req.body;
      const resultado = await this.registrarCliente.ejecutar(nombre, dni, apellido, email, telefono);
      res.status(201).json({ exito: true, datos: resultado });
    } catch (error) {
      res.status(400).json({ exito: false, error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const clientes = await this.obtenerClientes.ejecutar();
      res.json({ exito: true, datos: clientes });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await this.obtenerClientes.obtenerPorId(id);
      if (!cliente) {
        return res.status(404).json({ exito: false, error: 'Cliente no encontrado' });
      }
      res.json({ exito: true, datos: cliente });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerPorDNI(req, res) {
    try {
      const { dni } = req.params;
      const cliente = await this.obtenerClientes.obtenerPorDNI(dni);
      if (!cliente) {
        return res.status(404).json({ exito: false, error: 'Cliente no encontrado' });
      }
      res.json({ exito: true, datos: cliente });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }
}

module.exports = ClienteController;
