import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearEventoDTO } from '../dto/crear-evento-dto';
import { EventoDTO } from '../dto/evento-dto';
import { CrearCuponDTO } from '../dto/crear-cupon-dto';
import { ResponderPQRSDTO } from '../dto/responder-pqrs-dto';
import { DarEstadoPQRS } from '../dto/dar-estado-pqrs';
import { ActualizarCuponDTO } from '../dto/actualizar-cupon-dto';
import { EditarEventoDTO } from '../dto/editar-evento-dto';


@Injectable({
 providedIn: 'root'
})
export class AdministradorService {


 private adminURL = "http://localhost:8080/api/admin";


 constructor(private http: HttpClient) { }


 public crearEvento(crearEventoDTO: CrearEventoDTO ): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/evento/crear-Evento`, crearEventoDTO);
 }
 public editarEvento(editarEventoDTO: EditarEventoDTO ): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/evento/moificar-Evento`,editarEventoDTO);
}

 public crearCupon(crearCuponDTO: CrearCuponDTO ): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.adminURL}/cupon/crear-Cupon`, crearCuponDTO);
}
public actualizarCupon(actualizarCuponDTO: ActualizarCuponDTO ): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/cupon/actualizar-Cupon`, actualizarCuponDTO);
}


public obtenerAllPQRS(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/pqrs/obtenerAllPQRS`);
}


public responderPQRS(responderPQRSDTO:ResponderPQRSDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/pqrs/responder-PQRS`,responderPQRSDTO);
}

public darEstadoPQRS(darEstadoPQRS:DarEstadoPQRS): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.adminURL}/pqrs/darEstado-PQRS`,darEstadoPQRS);
}
public listarCupones(): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/listar-Cupones`);
}

public obtenerCupon(idUser: string ): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.adminURL}/cupon/obtenerCupon/${idUser}`);
}
/*

 public actualizarEvento(editarEventoDTO: EditarEventoDTO): Observable<MensajeDTO> {
   return this.http.put<MensajeDTO>(`${this.adminURL}/evento/editar`, editarEventoDTO);
 }


 public obtenerEvento(id: string): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener/${id}`);
 }


 public eliminarEvento(id: string): Observable<MensajeDTO> {
   return this.http.delete<MensajeDTO>(`${this.adminURL}/evento/eliminar/${id}`);
 }
*/

 public listarEventosAdmin(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.adminURL}/evento/obtener-todos`);
 }


 public subirImagen(imagen: FormData): Observable<MensajeDTO> {
   return this.http.post<MensajeDTO>(`${this.adminURL}/imagen/subir`, imagen);
 }


}
