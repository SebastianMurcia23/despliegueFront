import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { ClienteService } from '../../servicios/cliente.service';
import { PQRSDTO } from '../../dto/pqrs-dto';
import { Mensaje } from '../../model/Mensaje';
import { EstadoPQRS } from '../../enum/EstadoPQRS';
import { TipoSolicitud } from '../../enum/TipoSolicitud';
import { MensajeDTO } from '../../dto/mensaje-dto';
import { MensajePqrsDTO } from '../../dto/mensaje-pqrs-dto';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponderPQRSDTO } from '../../dto/responder-pqrs-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-detalle-pqrs-client',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './detalle-pqrs-client.component.html',
  styleUrl: './detalle-pqrs-client.component.css'
})
export class DetallePQRSClientComponent {
  codigoPQRS: string = '';
  pqrsDTO!:PQRSDTO;


  

  idAdmin!:string;

  idCliente!: string;
  tipoSolicitud!: TipoSolicitud;
  titulo!: string;
  mensaje!: string;
  estadoPQRS!: string;
  respuestas!: Mensaje[];
  idClientLoggued!: string;
  isLogged = false;

  listaRespuestas!: Mensaje[];
  listaRespuestasDto!:MensajePqrsDTO[];

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
             private clienteService: ClienteService,
             private adminService: AdministradorService,
            private tokenService:TokenService) {

             

    this.route.params.subscribe((params) => {
      this.codigoPQRS = params['id'];
      this.obtenerPQRS(params['id']);
    });

    
   

    this.isLogged = this.tokenService.isLogged();
   

   

  }
 
 
 public obtenerPQRS(id:string){

   this.clienteService.obtenerPQRS(id).subscribe({
     next: (data) => {

       this.pqrsDTO = data.respuesta;

       this.idCliente = this.pqrsDTO.idCliente;
       this.tipoSolicitud = this.pqrsDTO.tipoSolicitud;
       this.titulo = this.pqrsDTO.titulo;
       this.mensaje = this.pqrsDTO.mensaje;
       this.estadoPQRS=this.pqrsDTO.estadoPQRS;
       this.respuestas=this.pqrsDTO.respuestas;
       this.idClientLoggued=this.pqrsDTO.idAdminAtiende;

       this.listaRespuestas = this.respuestas.map((item: any) => this.mapToMensaje(item));
       this.listaRespuestasDto = this.transformOBJDTO(this.listaRespuestas); // Transformar a DTO

     },
     error: (error) => {
       console.error(error);
     },
   });
  }



  private mapToMensaje(json: any): Mensaje {
    return new Mensaje(

      json.codigo,
      json.idAutor,
      json.titulo,
      json.mensaje
    );
  }
   private transformOBJDTO(listaMensajes: Mensaje[]): MensajePqrsDTO[] {
    return listaMensajes.map((item: Mensaje) => {
      return {
        codigo: item.getCodigo(),
        idAutor: item.getIdAutor(),
        titulo: item.getTitulo(),
        mensaje: item.getMensaje(),
        
      };
    });
  }
  

}
