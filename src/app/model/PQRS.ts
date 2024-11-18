import { EstadoPQRS } from "../enum/EstadoPQRS";
import { TipoSolicitud } from "../enum/TipoSolicitud";
import { Mensaje } from "./Mensaje";

export class PQRS {
  private codigo: string;
    private idCliente: string;
    private tipoSolicitud: TipoSolicitud;
    private titulo: string;
    private mensaje: string;
    private estadoPQRS: EstadoPQRS;
    private respuestas: Mensaje[];
    private idAdminAtiende: string | null;
  
    constructor(
      codigo: string,
      idCliente: string,
      tipoSolicitud: TipoSolicitud,
      titulo: string,
      mensaje: string,
      estadoPQRS: EstadoPQRS,
      respuestas: Mensaje[] = [],
      idAdminAtiende: string | null = null
    ) {
      this.codigo = codigo;
      this.idCliente = idCliente;
      this.tipoSolicitud = tipoSolicitud;
      this.titulo = titulo;
      this.mensaje = mensaje;
      this.estadoPQRS = estadoPQRS;
      this.respuestas = respuestas;
      this.idAdminAtiende = idAdminAtiende;
    }
  
    // Getters
    public getCodigo(): string {
      return this.codigo;
    }
  
    public getIdCliente(): string {
      return this.idCliente;
    }
  
    public getTipoSolicitud(): TipoSolicitud {
      return this.tipoSolicitud;
    }
  
    public getTitulo(): string {
      return this.titulo;
    }
  
    public getMensaje(): string {
      return this.mensaje;
    }
  
    public getEstadoPQRS(): EstadoPQRS {
      return this.estadoPQRS;
    }
  
    public getRespuestas(): Mensaje[] {
      return this.respuestas;
    }
  
    public getIdAdminAtiende(): string | null {
      return this.idAdminAtiende;
    }
  
    // Setters
    public setCodigo(codigo: string): void {
      this.codigo = codigo;
    }
  
    public setIdCliente(idCliente: string): void {
      this.idCliente = idCliente;
    }
  
    public setTipoSolicitud(tipoSolicitud: TipoSolicitud): void {
      this.tipoSolicitud = tipoSolicitud;
    }
  
    public setTitulo(titulo: string): void {
      this.titulo = titulo;
    }
  
    public setMensaje(mensaje: string): void {
      this.mensaje = mensaje;
    }
  
    public setEstadoPQRS(estadoPQRS: EstadoPQRS): void {
      this.estadoPQRS = estadoPQRS;
    }
  
    public setRespuestas(respuestas: Mensaje[]): void {
      this.respuestas = respuestas;
    }
  
    public setIdAdminAtiende(idAdminAtiende: string | null): void {
      this.idAdminAtiende = idAdminAtiende;
    }
  }