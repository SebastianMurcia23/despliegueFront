import { EstadoCuenta } from "../enum/EstadoCuenta";

export class Cuenta {
  private codigo: string;
  public usuario: string;
  private password: string;
  private estadoCuenta: EstadoCuenta;

  constructor() {
    this.codigo = '';
    this.usuario = '';
    this.password = '';
    this.estadoCuenta = EstadoCuenta.ACTIVA; // Asume un estado inicial
  }

  getCodigo(): string {
    return this.codigo;
  }

  setCodigo(codigo: string): void {
    this.codigo = codigo;
  }

  getUsuario(): string {
    return this.usuario;
  }

  setUsuario(usuario: string): void {
    this.usuario = usuario;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getEstadoCuenta(): EstadoCuenta {
    return this.estadoCuenta;
  }

  setEstadoCuenta(estadoCuenta: EstadoCuenta): void {
    this.estadoCuenta = estadoCuenta;
  }
}
