import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, AbstractControlOptions, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { RegistrarClienteDTO } from '../../dto/registrar-cliente-dto';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
 selector: 'app-registro',
 standalone: true,
 imports: [ReactiveFormsModule,RouterModule],
 templateUrl: './registro.component.html',
 styleUrl: './registro.component.css'
})
export class RegistroComponent{


 registroForm!: FormGroup;
 mensaje!: String;


 constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) { 
  this.crearFormulario();
 }
 public registrar() {
  const crearCuentaF = this.registroForm.value as RegistrarClienteDTO;


  this.authService.registrarse(crearCuentaF).subscribe({
    next: (data) => {
      this.mensaje=data.respuesta.mensaje;
      Swal.fire({
        title: 'Registro exitoso',
        text: 'Se ha registrado correctamente'+this.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.router.navigate(["/"]);
    },
    error: (error) => {
      Swal.fire({
        title: 'Error: No se ha podido registrar.',
        text: error.error.respuesta,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  });
 
 }

 private crearFormulario() {
  this.registroForm = this.formBuilder.group({
    identificacion: ['', [Validators.required]],
    nombreCompleto: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required, Validators.maxLength(10)]],
    confirmaPassword: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
   
    
  },
  { validators: this.passwordsMatchValidator } as AbstractControlOptions
);
 }

passwordsMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmaPassword = formGroup.get('confirmaPassword')?.value;
 
  // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
  return password == confirmaPassword ? null : { passwordsMismatch: true };
 }
 
}
