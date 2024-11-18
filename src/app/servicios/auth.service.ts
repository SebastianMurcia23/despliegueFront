import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { RegistrarClienteDTO } from '../dto/registrar-cliente-dto';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/login-dto';
import { RestablecerContrasenaDTO } from '../dto/restablecer-contrasena-dto';
import { ValidarCodigoDTO } from '../dto/validar-codigo-dto';
import { CambiarContrasenaDTO } from '../dto/cambiar-contrasena-dto';


@Injectable({
 providedIn: 'root'
})
export class AuthService {


 private authURL = "http://localhost:8080/api/auth";
 private clientURL = "http://localhost:8080/api/client";

 constructor(private http: HttpClient) {

  }

 public registrarse(registrarClienteDTO: RegistrarClienteDTO ): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.clientURL}/registrarse`, registrarClienteDTO);
 }
 
 
 public iniciarSesionUsuario(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
 }
 
 public restablecerContrasena(restablecerContrasenaDTO: RestablecerContrasenaDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/restablecer-Contrasena`, restablecerContrasenaDTO);
   }
   
   public validarCodigoRecuperacion(validarCodDTO:ValidarCodigoDTO ): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/validar-Contrasena`, validarCodDTO);
   }
   
   public cambiarContrasena(cambiarContrasenaDTO:CambiarContrasenaDTO ): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/cambiar-Contrasena`, cambiarContrasenaDTO);
   }
}
