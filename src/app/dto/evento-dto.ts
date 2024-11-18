import { TipoEvento } from "../enum/TipoEvento";
import { Localidad } from "../model/Localidad";
import { LocalidadDTO } from "./localidad-dto";


export interface EventoDTO {
   id: string;
   nombre: string;
   descripcion: string;
   fecha: Date; // LocalDateTime en Java se traduce generalmente a Date en TypeScript
   tipo: TipoEvento;
   direccion: string;
   ciudad: string;
   localidades: Localidad[]; // Suponiendo que Localidad es otro tipo definido
   imagenPortada: string;
   imagenBoleta: string;
   imagenLocalidades: string;
   estado: string;
}
