export class Ticket {
    private codigo: string;
    private codigoEvento: string;
    private nombreEvento: string;
    private fechaHora: Date;
    private localidad: string;
    private qr: string;
    private asiento: string;
  
    constructor() {
      this.codigo = '';
      this.codigoEvento = '';
      this.nombreEvento = '';
      this.fechaHora = new Date();
      this.localidad = '';
      this.qr = '';
      this.asiento = '';
    }
  
    getCodigo(): string {
      return this.codigo;
    }
  
    setCodigo(codigo: string): void {
      this.codigo = codigo;
    }
  
    getCodigoEvento(): string {
      return this.codigoEvento;
    }
  
    setCodigoEvento(codigoEvento: string): void {
      this.codigoEvento = codigoEvento;
    }
  
    getNombreEvento(): string {
      return this.nombreEvento;
    }
  
    setNombreEvento(nombreEvento: string): void {
      this.nombreEvento = nombreEvento;
    }
  
    getFechaHora(): Date {
      return this.fechaHora;
    }
  
    setFechaHora(fechaHora: Date): void {
      this.fechaHora = fechaHora;
    }
  
    getLocalidad(): string {
      return this.localidad;
    }
  
    setLocalidad(localidad: string): void {
      this.localidad = localidad;
    }
  
    getQr(): string {
      return this.qr;
    }
  
    setQr(qr: string): void {
      this.qr = qr;
    }
  
    getAsiento(): string {
      return this.asiento;
    }
  
    setAsiento(asiento: string): void {
      this.asiento = asiento;
    }
  }
  