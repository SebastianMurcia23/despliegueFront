export class CodigoValidacion {
    private codigo: string;
    private fechaCreacion: Date;
  
    constructor() {
      this.codigo = '';
      this.fechaCreacion = new Date();
    }
  
    getCodigo(): string {
      return this.codigo;
    }
  
    setCodigo(codigo: string): void {
      this.codigo = codigo;
    }
  
    getFechaCreacion(): Date {
      return this.fechaCreacion;
    }
  
    setFechaCreacion(fechaCreacion: Date): void {
      this.fechaCreacion = fechaCreacion;
    }
  }
  