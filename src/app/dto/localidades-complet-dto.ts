import { Asiento } from "../model/Asiento";

export interface LocalidadesCompletDTO {
    codigo: string;
    nombreLocalidad: string;
    precio: number;
    capacidadMaxima: number;
    cantAsientosDisponibles: number;
    asientosLocalidad: Asiento[];
}
