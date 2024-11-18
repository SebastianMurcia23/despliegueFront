import { EstadoPQRS } from "../enum/EstadoPQRS";

export interface DarEstadoPQRS {
    idPQRS: string;
    idAdmin: string;
    estadoPQRS: EstadoPQRS;
  }