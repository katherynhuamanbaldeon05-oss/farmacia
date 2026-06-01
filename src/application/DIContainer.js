/**
 * Contenedor de Inyección de Dependencias
 * Configura todas las dependencias de la aplicación
 */
const MedicamentoRepositoryMySQL = require('../adapters/out/database/MedicamentoRepositoryMySQL');
const ClienteRepositoryMySQL = require('../adapters/out/database/ClienteRepositoryMySQL');
const VentaRepositoryMySQL = require('../adapters/out/database/VentaRepositoryMySQL');
const UsuarioRepositoryMySQL = require('../adapters/out/database/UsuarioRepositoryMySQL');
const AlertaStockConsola = require('../adapters/out/alerts/AlertaStockConsola');

// Casos de uso
const CrearMedicamento = require('../domain/usecases/CrearMedicamento');
const ObtenerMedicamentos = require('../domain/usecases/ObtenerMedicamentos');
const ActualizarMedicamento = require('../domain/usecases/ActualizarMedicamento');
const EliminarMedicamento = require('../domain/usecases/EliminarMedicamento');
const RegistrarCliente = require('../domain/usecases/RegistrarCliente');
const ObtenerClientes = require('../domain/usecases/ObtenerClientes');
const ProcesarVenta = require('../domain/usecases/ProcesarVenta');
const ObtenerVentas = require('../domain/usecases/ObtenerVentas');
const VerificarStockBajo = require('../domain/usecases/VerificarStockBajo');

// Controladores
const MedicamentoController = require('../adapters/in/web/MedicamentoController');
const ClienteController = require('../adapters/in/web/ClienteController');
const VentaController = require('../adapters/in/web/VentaController');
const AutenticacionController = require('../adapters/in/web/AutenticacionController');

class DIContainer {
  constructor() {
    this.services = {};
    this.init();
  }

  init() {
    // Registrar repositorios
    this.services.medicamentoRepository = new MedicamentoRepositoryMySQL();
    this.services.clienteRepository = new ClienteRepositoryMySQL();
    this.services.ventaRepository = new VentaRepositoryMySQL();
    this.services.usuarioRepository = new UsuarioRepositoryMySQL();
    this.services.alertaStock = new AlertaStockConsola();

    // Registrar casos de uso
    this.services.crearMedicamento = new CrearMedicamento(this.services.medicamentoRepository);
    this.services.obtenerMedicamentos = new ObtenerMedicamentos(this.services.medicamentoRepository);
    this.services.actualizarMedicamento = new ActualizarMedicamento(this.services.medicamentoRepository);
    this.services.eliminarMedicamento = new EliminarMedicamento(this.services.medicamentoRepository);
    this.services.registrarCliente = new RegistrarCliente(this.services.clienteRepository);
    this.services.obtenerClientes = new ObtenerClientes(this.services.clienteRepository);
    this.services.procesarVenta = new ProcesarVenta(
      this.services.ventaRepository,
      this.services.medicamentoRepository,
      this.services.clienteRepository,
      this.services.alertaStock
    );
    this.services.obtenerVentas = new ObtenerVentas(this.services.ventaRepository);
    this.services.verificarStockBajo = new VerificarStockBajo(
      this.services.medicamentoRepository,
      this.services.alertaStock
    );

    // Registrar controladores
    this.services.medicamentoController = new MedicamentoController(
      this.services.crearMedicamento,
      this.services.obtenerMedicamentos,
      this.services.actualizarMedicamento,
      this.services.eliminarMedicamento
    );

    this.services.clienteController = new ClienteController(
      this.services.registrarCliente,
      this.services.obtenerClientes
    );

    this.services.ventaController = new VentaController(
      this.services.procesarVenta,
      this.services.obtenerVentas,
      this.services.verificarStockBajo
    );

    this.services.autenticacionController = new AutenticacionController(
      this.services.usuarioRepository
    );
  }

  get(serviceName) {
    if (!this.services[serviceName]) {
      throw new Error(`Servicio '${serviceName}' no encontrado en el contenedor`);
    }
    return this.services[serviceName];
  }
}

module.exports = DIContainer;
