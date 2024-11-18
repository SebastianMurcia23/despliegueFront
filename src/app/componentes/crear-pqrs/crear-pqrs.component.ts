import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearPQRS_DTO } from '../../dto/crear-pqrs-dto';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-crear-pqrs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-pqrs.component.html',
  styleUrl: './crear-pqrs.component.css'
})
export class CrearPqrsComponent {
  crearPqrsForm!: FormGroup;
  tiposDeSolicitud: string[] ; 

  constructor(private formBuilder: FormBuilder,private clientService: ClienteService,private tokenService: TokenService) {
    this.crearFormulario();
    this.tiposDeSolicitud = ['QUEJA', 'RECLAMO', 'PETICION', 'SOLICITUD'];
  }

  private crearFormulario() {
    this.crearPqrsForm = this.formBuilder.group({
      tipoSolicitud: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public enviarPQRS() {
    if (this.crearPqrsForm.valid) {
      console.log('Formulario de PQRS:', this.crearPqrsForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al backend
      const crearPQRS_DTO = this.crearPqrsForm.value as CrearPQRS_DTO;
      crearPQRS_DTO.identificacionAutor = ''+this.tokenService.getIDCuenta();
      this.clientService.crearPQRS(crearPQRS_DTO).subscribe({
                        next: (data) => {
                                          Swal.fire({
                                            title: 'Registro de PQRS',
                                            text: 'Ha realizado con éxito el registro',
                                            icon: 'success',
                                            confirmButtonText: 'Aceptar'
                                          });
                                        },
                        error: (error) => {
                                            Swal.fire({
                                              icon: 'error',
                                              title: 'Error',
                                              text: error.error.respuesta
                                            });
                                          }
      });
    }
  }
}
