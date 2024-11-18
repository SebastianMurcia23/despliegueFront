import { TipoUsuario } from "../enum/TipoUsuario";
import { CarritoDeCompras } from "./CarritoDeCompras";
import { CodigoValidacion } from "./CodigoValidacion";
import { Cuenta } from "./Cuenta";
import { Cupon } from "./Cupon";
import { Ticket } from "./Ticket";
import { Transferencia } from "./Transferencia";


export class Cliente {
  private codigo: string;
  public identificacion: string;
  public nombreCompleto: string;
  public email: string;
  public cuenta: Cuenta;
  public direccion: string;
  public telefono: string;
  private primerCompra: boolean;
  private tipoUsuario: TipoUsuario;
  private carritoDeCompras: CarritoDeCompras;
  private codigoValidacion: CodigoValidacion;
  private misTransferenciasEnviadas: Transferencia[];
  private misTransferenciasRecibidas: Transferencia[];
  private misTickets: Ticket[];
  private misCupones: Cupon[];
  private misOrdenesCompra: string[];

  constructor() {
    this.codigo = '';
    this.identificacion = '';
    this.nombreCompleto = '';
    this.email = '';
    this.cuenta = new Cuenta(); // Suponiendo que `Cuenta` tiene un constructor por defecto
    this.direccion = '';
    this.telefono = '';
    this.primerCompra = false;
    this.tipoUsuario = {} as TipoUsuario; // O ajusta según la implementación de TipoUsuario
    this.carritoDeCompras = new CarritoDeCompras(); // Suponiendo que tiene un constructor por defecto
    this.codigoValidacion = new CodigoValidacion(); // Suponiendo que tiene un constructor por defecto
    this.misTransferenciasEnviadas = [];
    this.misTransferenciasRecibidas = [];
    this.misTickets = [];
    this.misCupones = [];
    this.misOrdenesCompra = [];
}

  // Getters and Setters
  getCodigo(): string {
    return this.codigo;
  }
  setCodigo(value: string): void {
    this.codigo = value;
  }

  getIdentificacion(): string {
    return this.identificacion;
  }
  setIdentificacion(value: string): void {
    this.identificacion = value;
  }

  getNombreCompleto(): string {
    return this.nombreCompleto;
  }
  setNombreCompleto(value: string): void {
    this.nombreCompleto = value;
  }

  getEmail(): string {
    return this.email;
  }
  setEmail(value: string): void {
    this.email = value;
  }

  getCuenta(): Cuenta {
    return this.cuenta;
  }
  setCuenta(value: Cuenta): void {
    this.cuenta = value;
  }

  getDireccion(): string {
    return this.direccion;
  }
  setDireccion(value: string): void {
    this.direccion = value;
  }

  getTelefono(): string {
    return this.telefono;
  }
  setTelefono(value: string): void {
    this.telefono = value;
  }

  getPrimerCompra(): boolean {
    return this.primerCompra;
  }
  setPrimerCompra(value: boolean): void {
    this.primerCompra = value;
  }

  getTipoUsuario(): TipoUsuario {
    return this.tipoUsuario;
  }
  setTipoUsuario(value: TipoUsuario): void {
    this.tipoUsuario = value;
  }

  getCarritoDeCompras(): CarritoDeCompras {
    return this.carritoDeCompras;
  }
  setCarritoDeCompras(value: CarritoDeCompras): void {
    this.carritoDeCompras = value;
  }

  getCodigoValidacion(): CodigoValidacion {
    return this.codigoValidacion;
  }
  setCodigoValidacion(value: CodigoValidacion): void {
    this.codigoValidacion = value;
  }

  getMisTransferenciasEnviadas(): Transferencia[] {
    return this.misTransferenciasEnviadas;
  }
  setMisTransferenciasEnviadas(value: Transferencia[]): void {
    this.misTransferenciasEnviadas = value;
  }

  getMisTransferenciasRecibidas(): Transferencia[] {
    return this.misTransferenciasRecibidas;
  }
  setMisTransferenciasRecibidas(value: Transferencia[]): void {
    this.misTransferenciasRecibidas = value;
  }

  getMisTickets(): Ticket[] {
    return this.misTickets;
  }
  setMisTickets(value: Ticket[]): void {
    this.misTickets = value;
  }

  getMisCupones(): Cupon[] {
    return this.misCupones;
  }
  setMisCupones(value: Cupon[]): void {
    this.misCupones = value;
  }

  getMisOrdenesCompra(): string[] {
    return this.misOrdenesCompra;
  }
  setMisOrdenesCompra(value: string[]): void {
    this.misOrdenesCompra = value;
  }
}
