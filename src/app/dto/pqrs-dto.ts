import { EstadoPQRS } from "../enum/EstadoPQRS";
import { TipoSolicitud } from "../enum/TipoSolicitud";
import { Mensaje } from "../model/Mensaje";

export interface PQRSDTO {
    
        codigo: string;
        idCliente: string;
        tipoSolicitud: TipoSolicitud;
        titulo: string;
        mensaje: string;
        estadoPQRS: EstadoPQRS;
        respuestas: Mensaje[];
        idAdminAtiende: string;
      
}
