import { EstadoCupon } from "../enum/EstadoCupon";

export interface ActualizarCuponDTO {
    idCodCupon: string;
    fechaVencimiento: Date;  // Puedes usar string si prefieres fechas como cadena
    usosPermitidos: number;
    porcentajeCupon: number;
    descripcion: string;
    estadoCupon: EstadoCupon;
  }