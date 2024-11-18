import { EstadoCupon } from "../enum/EstadoCupon";
import { TipoCupon } from "../enum/TipoCupon";

export class Cupon {
    private codigo: string;
    private codigoUsable: string;
    private fechaVencimiento: Date;
    private usosPermitidos: number;
    private usosRealizados: number;
    private estadoCupon: EstadoCupon;
    private tipoCupon: TipoCupon;
    private porcentajeCupon: number;
    private descripcion: string;
  
    constructor(
      codigo: string,
      codigoUsable: string,
      fechaVencimiento: Date,
      usosPermitidos: number,
      usosRealizados: number,
      estadoCupon: EstadoCupon,
      tipoCupon: TipoCupon,
      porcentajeCupon: number,
      descripcion: string
    ) {
      this.codigo = codigo;
      this.codigoUsable = codigoUsable;
      this.fechaVencimiento = fechaVencimiento;
      this.usosPermitidos = usosPermitidos;
      this.usosRealizados = usosRealizados;
      this.estadoCupon = estadoCupon;
      this.tipoCupon = tipoCupon;
      this.porcentajeCupon = porcentajeCupon;
      this.descripcion = descripcion;
    }
  
    // Getters
    public getCodigo(): string {
      return this.codigo;
    }
  
    public getCodigoUsable(): string {
      return this.codigoUsable;
    }
  
    public getFechaVencimiento(): Date {
      return this.fechaVencimiento;
    }
  
    public getUsosPermitidos(): number {
      return this.usosPermitidos;
    }
  
    public getUsosRealizados(): number {
      return this.usosRealizados;
    }
  
    public getEstadoCupon(): EstadoCupon {
      return this.estadoCupon;
    }
  
    public getTipoCupon(): TipoCupon {
      return this.tipoCupon;
    }
  
    public getPorcentajeCupon(): number {
      return this.porcentajeCupon;
    }
  
    public getDescripcion(): string {
      return this.descripcion;
    }
  
    // Setters
    public setCodigo(codigo: string): void {
      this.codigo = codigo;
    }
  
    public setCodigoUsable(codigoUsable: string): void {
      this.codigoUsable = codigoUsable;
    }
  
    public setFechaVencimiento(fechaVencimiento: Date): void {
      this.fechaVencimiento = fechaVencimiento;
    }
  
    public setUsosPermitidos(usosPermitidos: number): void {
      this.usosPermitidos = usosPermitidos;
    }
  
    public setUsosRealizados(usosRealizados: number): void {
      this.usosRealizados = usosRealizados;
    }
  
    public setEstadoCupon(estadoCupon: EstadoCupon): void {
      this.estadoCupon = estadoCupon;
    }
  
    public setTipoCupon(tipoCupon: TipoCupon): void {
      this.tipoCupon = tipoCupon;
    }
  
    public setPorcentajeCupon(porcentajeCupon: number): void {
      this.porcentajeCupon = porcentajeCupon;
    }
  
    public setDescripcion(descripcion: string): void {
      this.descripcion = descripcion;
    }
  }