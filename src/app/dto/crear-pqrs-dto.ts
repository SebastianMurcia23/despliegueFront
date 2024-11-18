import { TipoSolicitud } from "../enum/TipoSolicitud";
export interface CrearPQRS_DTO {
    identificacionAutor: string;
    tipoSolicitud: TipoSolicitud;
    titulo: string;
    mensaje: string;
  }