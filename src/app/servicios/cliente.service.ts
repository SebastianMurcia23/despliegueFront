import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearPQRS_DTO } from '../dto/crear-pqrs-dto';
import { EliminarCuentaDTO } from '../dto/eliminar-cuenta-dto';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clientURL = "http://localhost:8080/api/client";
  
  constructor(private http: HttpClient) { }

  public crearPQRS(crearPQRS_DTO: CrearPQRS_DTO ): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clientURL}/pqrs/crear-PQRS`, crearPQRS_DTO);
  }

  public obtenerMisPQRS(idUser: string ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clientURL}/pqrs/misPQRS/${idUser}`);
  }
  public obtenerPQRS(idUser: string ): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clientURL}/pqrs/obtenerPQRS/${idUser}`);
  }
  
  public desactivarCuenta(eliminar: EliminarCuentaDTO ): Observable<MensajeDTO> {

    const httpOptions = {
      body: eliminar
  };

    return this.http.delete<MensajeDTO>(`${this.clientURL}/eliminar`,httpOptions);
  }
  


}
