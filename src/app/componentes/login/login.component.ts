import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { LoginDTO } from '../../dto/login-dto';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { TokenService } from '../../servicios/token.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  codigoVerificado: boolean = false;
  estadoCuenta: boolean = false;

  constructor(private formBuilder: FormBuilder,private authService: AuthService,private tokenService: TokenService) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public iniciarSesion() {

    const loginDTO = this.loginForm.value as LoginDTO;   
   
    this.authService.iniciarSesionUsuario(loginDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Ingreso exitoso',
          text: 'Bienvenid@',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.tokenService.login(data.respuesta.token);
        this.codigoVerificado = true;
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