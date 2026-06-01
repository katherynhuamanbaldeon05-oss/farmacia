/**
 * Controlador: Medicamentos
 */
class MedicamentoController {
  constructor(
    crearMedicamento,
    obtenerMedicamentos,
    actualizarMedicamento,
    eliminarMedicamento
  ) {
    this.crearMedicamento = crearMedicamento;
    this.obtenerMedicamentos = obtenerMedicamentos;
    this.actualizarMedicamento = actualizarMedicamento;
    this.eliminarMedicamento = eliminarMedicamento;
  }

  async crear(req, res) {
    try {
      const { nombre, descripcion, precio, cantidad } = req.body;
      const resultado = await this.crearMedicamento.ejecutar(nombre, descripcion, precio, cantidad);
      res.status(201).json({ exito: true, datos: resultado });
    } catch (error) {
      res.status(400).json({ exito: false, error: error.message });
    }
  }

  async obtenerTodos(req, res) {
    try {
      const medicamentos = await this.obtenerMedicamentos.ejecutar();
      res.json({ exito: true, datos: medicamentos });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      const medicamento = await this.obtenerMedicamentos.obtenerPorId(id);
      if (!medicamento) {
        return res.status(404).json({ exito: false, error: 'Medicamento no encontrado' });
      }
      res.json({ exito: true, datos: medicamento });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async buscar(req, res) {
    try {
      const { nombre } = req.query;
      if (!nombre) {
        return res.status(400).json({ exito: false, error: 'Nombre requerido' });
      }
      const medicamentos = await this.obtenerMedicamentos.buscarPorNombre(nombre);
      res.json({ exito: true, datos: medicamentos });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async obtenerStockBajo(req, res) {
    try {
      const medicamentos = await this.obtenerMedicamentos.obtenerStockBajo();
      res.json({ exito: true, datos: medicamentos });
    } catch (error) {
      res.status(500).json({ exito: false, error: error.message });
    }
  }

  async actualizar(req, res) {
    try {
      const { id } = req.params;
      const { nombre, descripcion, precio, cantidad } = req.body;
      const resultado = await this.actualizarMedicamento.ejecutar(id, nombre, descripcion, precio, cantidad);
      res.json({ exito: true, datos: resultado });
    } catch (error) {
      res.status(400).json({ exito: false, error: error.message });
    }
  }

  async eliminar(req, res) {
    try {
      const { id } = req.params;
      const resultado = await this.eliminarMedicamento.ejecutar(id);
      res.json({ exito: true, datos: resultado });
    } catch (error) {
      res.status(400).json({ exito: false, error: error.message });
    }
  }
}

module.exports = MedicamentoController;
