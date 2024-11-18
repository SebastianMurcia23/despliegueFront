import { Asiento } from "./Asiento";

export class Localidad {
    public codigo: string;
    public nombreLocalidad: string;
    public precio: number;
    public capacidadMaxima: number;
    public cantAsientosDisponibles: number;
    public asientosLocalidad: Asiento[]; // Suponiendo que Asiento es otro tipo definido

  

    constructor(
        codigo: string,
        nombreLocalidad: string,
        precio: number,
        capacidadMaxima: number,
        cantAsientosDisponibles: number,
        asientosLocalidad: Asiento[]
    ) {
        this.codigo = codigo;
        this.nombreLocalidad = nombreLocalidad;
        this.precio = precio;
        this.capacidadMaxima = capacidadMaxima;
        this.cantAsientosDisponibles = cantAsientosDisponibles;
        this.asientosLocalidad = asientosLocalidad;
    }

    // Getters
    public getCodigo(): string {
        return this.codigo;
    }

    public getNombreLocalidad(): string {
        return this.nombreLocalidad;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public getCapacidadMaxima(): number {
        return this.capacidadMaxima;
    }

    public getCantAsientosDisponibles(): number {
        return this.cantAsientosDisponibles;
    }

    public getAsientosLocalidad(): Asiento[] {
        return this.asientosLocalidad;
    }

    // Setters
    public setCodigo(codigo: string): void {
        this.codigo = codigo;
    }

    public setNombreLocalidad(nombreLocalidad: string): void {
        this.nombreLocalidad = nombreLocalidad;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public setCapacidadMaxima(capacidadMaxima: number): void {
        this.capacidadMaxima = capacidadMaxima;
    }

    public setCantAsientosDisponibles(cantAsientosDisponibles: number): void {
        this.cantAsientosDisponibles = cantAsientosDisponibles;
    }

    public setAsientosLocalidad(asientosLocalidad: Asiento[]): void {
        this.asientosLocalidad = asientosLocalidad;
    }
}