export class ItemCompra {
    private codigo: string;
    private codigoEvento: string;
    private localidad: string;
    private idAsientosLocalidad: string[];
    private cantidad: number;
    private precioUnitario: number;
  
    constructor() {
      this.codigo = '';
      this.codigoEvento = '';
      this.localidad = '';
      this.idAsientosLocalidad = [];
      this.cantidad = 0;
      this.precioUnitario = 0;
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
  
    getLocalidad(): string {
      return this.localidad;
    }
  
    setLocalidad(localidad: string): void {
      this.localidad = localidad;
    }
  
    getIdAsientosLocalidad(): string[] {
      return this.idAsientosLocalidad;
    }
  
    setIdAsientosLocalidad(idAsientosLocalidad: string[]): void {
      this.idAsientosLocalidad = idAsientosLocalidad;
    }
  
    getCantidad(): number {
      return this.cantidad;
    }
  
    setCantidad(cantidad: number): void {
      this.cantidad = cantidad;
    }
  
    getPrecioUnitario(): number {
      return this.precioUnitario;
    }
  
    setPrecioUnitario(precioUnitario: number): void {
      this.precioUnitario = precioUnitario;
    }
  }
  