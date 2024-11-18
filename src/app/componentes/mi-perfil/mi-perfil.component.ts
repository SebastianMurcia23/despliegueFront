import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import { PublicoService } from '../../servicios/publico.service';
import { TokenService } from '../../servicios/token.service';
import { Cliente } from '../../model/Cliente';
import { ActualizarClienteDTO } from '../../dto/actualizar-cliente-dto';
import Swal from 'sweetalert2';
import { EliminarCuentaDTO } from '../../dto/eliminar-cuenta-dto';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  idUser:string ='';
  clienteData!: Cliente;
  editarUsuarioForm!:FormGroup;

  isLogged = false;
  isAdmin = false;
  isClient = false;

  actualizarUsuarioDTO!:ActualizarClienteDTO;


  username:string='';
  nombreUsuario:string='';
  identificacionUsuario:string='';
  direccion:string='';
  telefono:string='';
  emailUser:string='';

  eliminarCuentaDTO!:EliminarCuentaDTO;


  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
    private publicService: PublicoService,
    private clientService: ClienteService,
   private tokenService:TokenService) {
if (this.isLogged) {
      this.isAdmin = this.tokenService.isAdmin();
     this.isClient = this.tokenService.isClient();
    }
      
    this.actualizarUsuarioDTO = {
      idCliente: "",               // Inicializado como cadena vacía
      identificacion: "",                 // Inicializado como cadena vacía
      nombreCompleto: "",              // Inicializado como cadena vacía
      direccion: "",                 // Inicializado como cadena vacía
      telefono: ""         // Inicializado como lista vacía
    };

    this.eliminarCuentaDTO = {
      idCLiente: "",               // Inicializado como cadena vacía
      identificacion: ""                // Inicializado como cadena vacía
            // Inicializado como lista vacía
    };
     

      this.route.params.subscribe((params) => {
      this.idUser = params['id'];
      this.obtenerCliente(params['id']);
      });




}


public iniciarFormularioActualizarUsuario(){
  this.editarUsuarioForm = this.formBuilder.group({

    nombreF: [this.nombreUsuario],
    direccionF: [this.direccion],
    telefonoF: [this.telefono]
  }
);
}

ngOnInit(): void {
  this.iniciarFormularioActualizarUsuario();
  
 }

 ngAfterViewInit(): void {
   // Llamar a listarCiudades después de que el DOM esté listo
   
 }


public obtenerCliente(id:string){

  this.publicService.obtenerUsuario(id).subscribe({
    next: (data) => {
      this.clienteData = data.respuesta as any;

    this.username=this.clienteData.cuenta.usuario;
    this.nombreUsuario=this.clienteData.nombreCompleto;
    this.identificacionUsuario=this.clienteData.identificacion;
    this.direccion=this.clienteData.direccion;
    this.telefono=this.clienteData.telefono ;
    this.emailUser=this.clienteData.email;
      
      console.log(this.clienteData);
    },
    error: (error) => {
      console.error(error);
    },
  });

}


public editarUsuario(){

  const valores = this.editarUsuarioForm.value;

this.actualizarUsuarioDTO.idCliente=this.idUser;
this.actualizarUsuarioDTO.identificacion=this.identificacionUsuario;
this.actualizarUsuarioDTO.nombreCompleto=valores.nombreF;
this.actualizarUsuarioDTO.direccion=valores.direccionF;
this.actualizarUsuarioDTO.telefono=valores.telefonoF;

this.actualizarUsuarioDTO.nombreCompleto=(this.actualizarUsuarioDTO.nombreCompleto === '' || this.actualizarUsuarioDTO.nombreCompleto === null)
 ? this.nombreUsuario : this.actualizarUsuarioDTO.nombreCompleto ;

 this.actualizarUsuarioDTO.direccion=(this.actualizarUsuarioDTO.direccion === '' || this.actualizarUsuarioDTO.direccion === null)
 ? this.direccion : this.actualizarUsuarioDTO.direccion ;

 this.actualizarUsuarioDTO.telefono=(this.actualizarUsuarioDTO.telefono === '' || this.actualizarUsuarioDTO.telefono === null)
 ? this.telefono : this.actualizarUsuarioDTO.telefono ;


 console.log(this.actualizarUsuarioDTO);

  this.publicService.editarUsuario(this.actualizarUsuarioDTO).subscribe({
    next: (data) => {
      this.clienteData = data.respuesta as any;
      Swal.fire({
        title: 'Exito',
        text: 'Se ha actualizado tu contraseña.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      
      //console.log(this.clienteData);
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

public desactivarCuenta(){

  this.eliminarCuentaDTO.idCLiente =this.idUser;
  this.eliminarCuentaDTO.identificacion = this.identificacionUsuario;

  this.clientService.desactivarCuenta(this.eliminarCuentaDTO).subscribe({
    next: (data) => {
      this.clienteData = data.respuesta as any;
      Swal.fire({
        title: 'Exito',
        text: 'Se ha desactivado esta cuenta.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.tokenService.logout();
      
      //console.log(this.clienteData);
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
