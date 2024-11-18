import { TipoEvento } from "../enum/TipoEvento";
import { Localidad } from "../model/Localidad";

export interface EditarEventoDTO {
    codEvent: string;
    nombre: string;
    direccion: string;
    ciudad: string;
    descripcion: string;
    tipoEvento: TipoEvento;
    poster: string;
    imgBoleta: string;
    imgDistribucionLocalidades: string;
    fechaEvento: Date; // Usando string para representar una fecha (ISO 8601)
    localidades: Localidad[]; // Lista de objetos de tipo Localidad
  }