import { EstadoTransferencia } from "../enum/EstadoTransferencia";

export class Transferencia {
  private codigo: string;
  private fechaHora: Date;
  private remitente: string;
  private destinatario: string;
  private ticket: string;
  private estadoTransferencia: EstadoTransferencia;

  constructor() {
    this.codigo = '';
    this.fechaHora = new Date();
    this.remitente = '';
    this.destinatario = '';
    this.ticket = '';
    this.estadoTransferencia = EstadoTransferencia.PENDIENTE; // Ejemplo de valor inicial
  }

  getCodigo(): string {
    return this.codigo;
  }

  setCodigo(codigo: string): void {
    this.codigo = codigo;
  }

  getFechaHora(): Date {
    return this.fechaHora;
  }

  setFechaHora(fechaHora: Date): void {
    this.fechaHora = fechaHora;
  }

  getRemitente(): string {
    return this.remitente;
  }

  setRemitente(remitente: string): void {
    this.remitente = remitente;
  }

  getDestinatario(): string {
    return this.destinatario;
  }

  setDestinatario(destinatario: string): void {
    this.destinatario = destinatario;
  }

  getTicket(): string {
    return this.ticket;
  }

  setTicket(ticket: string): void {
    this.ticket = ticket;
  }

  getEstadoTransferencia(): EstadoTransferencia {
    return this.estadoTransferencia;
  }

  setEstadoTransferencia(estadoTransferencia: EstadoTransferencia): void {
    this.estadoTransferencia = estadoTransferencia;
  }
}
