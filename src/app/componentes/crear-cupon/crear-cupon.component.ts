import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearCuponDTO } from '../../dto/crear-cupon-dto';
import { TipoCupon } from '../../enum/TipoCupon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-cupon',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-cupon.component.html',
  styleUrl: './crear-cupon.component.css'
})
export class CrearCuponComponent implements OnInit, AfterViewInit{
  crearCuponForm!: FormGroup;
  //tiposDeCupon!: TipoCupon[];

  constructor(private formBuilder: FormBuilder,private adminService: AdministradorService) {
    
    this.crearFormulario();

  }
  ngOnInit(): void {
    this.listarCupones();
    
  }
  ngAfterViewInit(): void {
    // Llamar a listarCiudades después de que el DOM esté listo
    
  }

  private crearFormulario() {
    this.crearCuponForm = this.formBuilder.group({
      codigoUsable: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      usosPermitidos: [1, [Validators.required, Validators.min(1)]],
      tipoCupon: ['', [Validators.required]],
      porcentajeCupon: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  public crearCupon() {

    if (this.crearCuponForm.valid) {
      console.log('Formulario de Cupón:', this.crearCuponForm.value);
      const cuponDTO = this.crearCuponForm.value as CrearCuponDTO;
      

      this.adminService.crearCupon(cuponDTO).subscribe({
                        next: (data) => {
                                          Swal.fire({
                                            title: 'Registro de Cupón',
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

  public listarCupones() {
    const dropdown = document.getElementById('tipoCupons') as HTMLSelectElement;
    const control = this.crearCuponForm.get('tipoCupon');  // Obtener el FormControl
  
    if (dropdown && control) {  // Verifica que el dropdown y el control existen
      // Itera sobre las claves del enum y agrega cada una como una opción
      for (const key in TipoCupon) {
        const option = document.createElement('option');
        option.value = TipoCupon[key as keyof typeof TipoCupon];
        option.text = TipoCupon[key as keyof typeof TipoCupon];
        dropdown.appendChild(option);
      }
  
      // Asigna el valor por defecto si ya se seleccionó
      control.setValue(TipoCupon.UNICO);  // Establece un valor por defecto, si es necesario
    }
  }
  }
