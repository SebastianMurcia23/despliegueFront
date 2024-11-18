import { CiudadesEnum } from "../enum/CiudadesEnum";
import { TipoEvento } from "../enum/TipoEvento";
import { LocalidadDTO } from "./localidad-dto";

export interface CrearEventoDTO {
   
    nombre:string,
    direccion:string,
    ciudad:string,
    descripcion:string,
    tipoEvento:TipoEvento,
    poster:string,
    imgBoleta:string,
    imgDistribucionLocalidades:string,
    fechaEvento:Date,
     localidades:LocalidadDTO[],

  }