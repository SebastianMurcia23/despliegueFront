import { TipoCupon } from "../enum/TipoCupon";

export interface CrearCuponDTO {
    codigoUsable: string;               // Código usable, similar a String
    fechaVencimiento: string;           // LocalDateTime se puede representar como una cadena ISO 8601
    usosPermitidos: number;             // Número de usos permitidos, tipo `number` en TS
    tipoCupon: TipoCupon;               // TipoCupon, un tipo personalizado que necesitarás definir
    porcentajeCupon: number;            // Porcentaje del cupón, tipo `number`
    descripcion: string;                // Descripción, tipo `string`
  }
