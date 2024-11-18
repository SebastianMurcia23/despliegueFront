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
import { DarEstadoPQRS } from '../../dto/dar-estado-pqrs';

@Component({
  selector: 'app-detalle-pqrs-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './detalle-pqrs-admin.component.html',
  styleUrl: './detalle-pqrs-admin.component.css'
})
export class DetallePQRSAdminComponent {
  codigoPQRS: string = '';
  pqrsDTO!:PQRSDTO;

  darEstadoPQRS!:DarEstadoPQRS;

  crearMensajePqrs!:ResponderPQRSDTO;
  crearMensajeForm!: FormGroup;
  
  mensajeEnviar!:string;
  tituloEnviar!:string;
  idAdmin!:string;

  idCliente!: string;
  tipoSolicitud!: TipoSolicitud;
  titulo!: string;
  mensaje!: string;
  estadoPQRS!: string;
  respuestas!: Mensaje[];
  idAdminAtiende!: string;
  isLogged = false;

  listaRespuestas!: Mensaje[];
  listaRespuestasDto!:MensajePqrsDTO[];

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
             private clienteService: ClienteService,
             private adminService: AdministradorService,
            private tokenService:TokenService) {

              this.crearMensajePqrs = {
                idPQRS: '',
                idAdmin: '',
                titulo: '',
                mensaje: ''
              };
              


              this.crearMensajeForm = this.formBuilder.group({
                tituloEnviar: ['', [Validators.required]],
                mensajeEnviar: ['', [Validators.required]]
              });

    this.route.params.subscribe((params) => {
      this.codigoPQRS = params['id'];
      this.obtenerPQRS(params['id']);
    });

    this.darEstadoPQRS={
      idPQRS: this.codigoPQRS,
      idAdmin: this.tokenService.getIDCuenta(),
      estadoPQRS: EstadoPQRS.SOLUCIONADA
    };
   

    this.isLogged = this.tokenService.isLogged();
   

    if (this.isLogged) {
      this.crearMensajePqrs.idAdmin=this.tokenService.getIDCuenta();
    }

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
       this.idAdminAtiende=this.pqrsDTO.idAdminAtiende;

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
  public crearMensaje() {
    
    
    
    this.crearMensajePqrs.idPQRS=this.codigoPQRS;
    this.crearMensajePqrs.titulo = this.crearMensajeForm.get('tituloEnviar')?.value || ''; // Toma el valor de 'tituloEnviar'
    this.crearMensajePqrs.mensaje = this.crearMensajeForm.get('mensajeEnviar')?.value || ''; // Toma el valor de 'mensajeEnviar'

    //const responderPQRSDTO = this.crearMensajeForm.value as ResponderPQRSDTO;   
   
    this.adminService.responderPQRS(this.crearMensajePqrs).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Mensaje Creado',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        //this.tokenService.login(data.respuesta.token);
        
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
        });
      },
    });

  }

  public reactivarPQRS() {
    this.darEstadoPQRS.estadoPQRS=EstadoPQRS.EN_REVISION;

    this.adminService.darEstadoPQRS(this.darEstadoPQRS).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'PQRS actualizada',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      
        
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
        });
      },
    });

  }
  public darSolucionPQRS() {
    this.darEstadoPQRS.estadoPQRS=EstadoPQRS.SOLUCIONADA;

    this.adminService.darEstadoPQRS(this.darEstadoPQRS).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'PQRS actualizada',
          text: '',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      
        
      },
      error: (error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta
        });
      },
    });
  }

}
