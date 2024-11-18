import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { ObtenerLocalidadDTO } from '../dto/obtener-localidad-dto';
import { ActualizarClienteDTO } from '../dto/actualizar-cliente-dto';


@Injectable({
 providedIn: 'root'
})
export class PublicoService {


 private publicoURL = "http://localhost:8080/api/publico";


 constructor(private http: HttpClient) { }




 public listarEventos(): Observable<MensajeDTO> {
   return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-todos`);
 }


 public obtenerEvento(id :String): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.publicoURL}/evento/obtener-evento/${id}` );
}

public obtenerLocalidad(obtenerLocalidad :ObtenerLocalidadDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.publicoURL}/evento/obtener-Localidad`,obtenerLocalidad );
}

public obtenerUsuario(id :String): Observable<MensajeDTO> {
  return this.http.get<MensajeDTO>(`${this.publicoURL}/usuario/obtener-Usuario/${id}` );
}

public editarUsuario(actualizar :ActualizarClienteDTO): Observable<MensajeDTO> {
  return this.http.put<MensajeDTO>(`${this.publicoURL}/usuario/editarUsuario`,actualizar);
}
}
