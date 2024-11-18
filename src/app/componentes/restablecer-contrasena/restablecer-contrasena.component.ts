import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControlOptions} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf y *ngFor
import Swal from 'sweetalert2';
import { AuthService } from '../../servicios/auth.service';
import { TokenService } from '../../servicios/token.service';
import { RestablecerContrasenaDTO } from '../../dto/restablecer-contrasena-dto';
import { ValidarCodigoDTO } from '../../dto/validar-codigo-dto';
import { CambiarContrasenaDTO } from '../../dto/cambiar-contrasena-dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrl: './restablecer-contrasena.component.css'
})
export class RestablecerContrasenaComponent {
  restablecerContrasenaForm!: FormGroup;
  verificarCodigoForm!: FormGroup;
  nuevaContrasenaForm!: FormGroup;

  idClient:string='';
  
  restablecerEmailDTO!:RestablecerContrasenaDTO;
  validarCodDTO!:ValidarCodigoDTO;
  cambiarContraDTO!:CambiarContrasenaDTO;
  
  emailEnviado: boolean = false;
  codigoVerificado: boolean = false;

  constructor(private router: Router,private formBuilder: FormBuilder,private authService: AuthService,private tokenService: TokenService) {
    this.crearFormularios();
  }

  private crearFormularios() {
    // Formulario para ingresar el correo electrónico
    this.restablecerContrasenaForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Formulario para ingresar el código de verificación
    this.verificarCodigoForm = this.formBuilder.group({
      codigoVerificacion: ['', [Validators.required]],
    });

    // Formulario para ingresar la nueva contraseña
    this.nuevaContrasenaForm = this.formBuilder.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator } as AbstractControlOptions );
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('nuevaContrasena')?.value;
    const confirmaPassword = formGroup.get('confirmarContrasena')?.value;
   
    // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
    return password == confirmaPassword ? null : { passwordsMismatch: true };
   }

  public restablecerContrasena() {
    if (this.restablecerContrasenaForm.valid) {
      console.log('Correo para Restablecer Contraseña:', this.restablecerContrasenaForm.value.email);

      this.restablecerEmailDTO = {
        emailClient:''
      };

      this.restablecerEmailDTO.emailClient=this.restablecerContrasenaForm.value.email as string;

      this.authService.restablecerContrasena(this.restablecerEmailDTO).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Verifica tu correo',
            text: 'Se ha enviado un código de verificacion a tu correo.',
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


      this.emailEnviado = true;
      this.restablecerContrasenaForm.get('email')?.disable();
    }
  

  public validarCodigo() {
    if (this.verificarCodigoForm.valid) {
      console.log('Código de Verificación:', this.verificarCodigoForm.value.codigoVerificacion);

      this.validarCodDTO = {
        emailClient:'',
        codVerif: ''
      };

      this.validarCodDTO.emailClient=this.restablecerContrasenaForm.value.email as string;
      this.validarCodDTO.codVerif=this.verificarCodigoForm.value.codigoVerificacion as string;

      this.authService.validarCodigoRecuperacion(this.validarCodDTO).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Codigo verificado',
            text: 'Ingresa tu nueva contraseña.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.idClient=data.respuesta as string;

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


      this.codigoVerificado = true;
    
  }

  public guardarNuevaContrasena() {
    if (this.nuevaContrasenaForm.valid) {
      console.log('Nueva Contraseña:', this.nuevaContrasenaForm.value.nuevaContrasena);
      this.cambiarContraDTO = {
        idClient:'',
        contrasenaNueva: ''
      };

      this.cambiarContraDTO.idClient=this.idClient;
      this.cambiarContraDTO.contrasenaNueva=this.nuevaContrasenaForm.value.nuevaContrasena as string;

      this.authService.cambiarContrasena(this.cambiarContraDTO).subscribe({
        next: (data) => {
          Swal.fire({
            title: 'Exito',
            text: 'Se ha actualizado tu contraseña.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
         
          this.router.navigate(["/login"]).then(() => {
            window.location.reload();
          });
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
  }
}