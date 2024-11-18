import { EstadoCupon } from "../enum/EstadoCupon";
import { TipoCupon } from "../enum/TipoCupon";

export interface CuponDTO {

     codigo: string,
     codigoUsable: string,
     fechaVencimiento: Date,
     usosPermitidos: number,
     usosRealizados: number,
     estadoCupon: EstadoCupon,
     tipoCupon: TipoCupon,
     porcentajeCupon: number,
     descripcion: string
}
