import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CuponDTO } from '../../dto/cupon-dto';
import { Cupon } from '../../model/Cupon';
import { FormBuilder, ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdministradorService } from '../../servicios/administrador.service';
import { TokenService } from '../../servicios/token.service';
import { CommonModule } from '@angular/common';
import { EstadoCupon } from '../../enum/EstadoCupon';
import { TipoCupon } from '../../enum/TipoCupon';
import { ActualizarCuponDTO } from '../../dto/actualizar-cupon-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-cupon',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './ver-cupon.component.html',
  styleUrl: './ver-cupon.component.css'
})
export class VerCuponComponent  implements OnInit, AfterViewInit {

  


  codigoCupon!:string;

  isLogged = false;
  isAdmin = false;
  isClient = false;
  email: string = "";
  rol: string = "";

  mensaje!:string;

  actualizarCuponForm!:FormGroup;

  codigo!: string;
  codigoUsable!: string;
  fechaVencimiento!: Date;
  usosPermitidos!: number;
  usosRealizados!: number;
  estadoCupon!: EstadoCupon;
  tipoCupon!: TipoCupon;
  porcentajeCupon!: number;
  descripcion!: string;

  cuponDTO!: CuponDTO;
  cupon!: Cupon;

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private adminService: AdministradorService,private tokenService:TokenService) {
    this.isLogged = this.tokenService.isLogged();
    this.mensaje='';
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.rol= this.tokenService.getRol();
      this.isAdmin = this.tokenService.isAdmin();
     this.isClient = this.tokenService.isClient();
    }
    
     
      
      this.route.params.subscribe((params) => {
        this.codigoCupon = params['id'];
        this.obtenerCupon(params['id']);
        });
        this.iniciarFormularioActualizarCupon();
    }


    ngOnInit(): void {
      
      this.iniciarListaEstadoCupon();

      
    }
    ngAfterViewInit(): void {
      // Llamar a listarCiudades después de que el DOM esté listo
      
    }

    public iniciarFormularioActualizarCupon(){
      this.actualizarCuponForm = this.formBuilder.group({
        idCodCupon: [this.codigo],
        fechaVencimiento: [this.fechaVencimiento],
        usosPermitidos: [this.usosPermitidos],
        porcentajeCupon: [this.porcentajeCupon],
        descripcion: [this.descripcion],
        estadoCupon: [this.estadoCupon],
       
        
      }
    );
    }

    public actualizarCupon() {
      if (this.actualizarCuponForm.valid) {
        // Usa getRawValue() para obtener todos los valores, incluso si no han sido tocados
        const actualizarCuponDTO = this.actualizarCuponForm.value as ActualizarCuponDTO;
       // console.log(actualizarCuponDTO);
        actualizarCuponDTO.idCodCupon=(actualizarCuponDTO.idCodCupon === '' || actualizarCuponDTO.idCodCupon === null) ? this.cuponDTO.codigo : actualizarCuponDTO.idCodCupon ;
        actualizarCuponDTO.fechaVencimiento=( actualizarCuponDTO.fechaVencimiento === null) ? this.cuponDTO.fechaVencimiento : actualizarCuponDTO.fechaVencimiento ;
        actualizarCuponDTO.usosPermitidos=( actualizarCuponDTO.usosPermitidos === null) ? this.cuponDTO.usosPermitidos : actualizarCuponDTO.usosPermitidos ;
        actualizarCuponDTO.porcentajeCupon=( actualizarCuponDTO.porcentajeCupon === null) ? this.cuponDTO.porcentajeCupon : actualizarCuponDTO.porcentajeCupon ;
        actualizarCuponDTO.descripcion=(actualizarCuponDTO.descripcion === '' || actualizarCuponDTO.descripcion === null) ? this.cuponDTO.descripcion : actualizarCuponDTO.descripcion ;
        actualizarCuponDTO.estadoCupon=( actualizarCuponDTO.estadoCupon === null) ? this.cuponDTO.estadoCupon : actualizarCuponDTO.estadoCupon ;
    
//console.log(actualizarCuponDTO);
    
        this.adminService.actualizarCupon(actualizarCuponDTO).subscribe({
          next: (data) => {
            this.mensaje = data.respuesta.mensaje;
            Swal.fire({
              title: 'Se ha actualizado',
              text: 'Se ha actualizado correctamente' + this.mensaje,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error: No se ha podido actualizar el cupón.',
              text: error.error.respuesta,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      } else {
        console.log("Formulario no válido");
        Swal.fire({
          title: 'Error',
          text: 'Por favor, completa todos los campos correctamente.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }





public obtenerCupon(idCupon:string){

  this.adminService.obtenerCupon(idCupon).subscribe({
    next: (data) => {

      
      this.cuponDTO = data.respuesta;

      this.codigo=this.cuponDTO.codigo;
      this.codigoUsable=this.cuponDTO.codigoUsable;
      this.fechaVencimiento=this.cuponDTO.fechaVencimiento;
      this.usosPermitidos=this.cuponDTO.usosPermitidos;
      this.usosRealizados=this.cuponDTO.usosRealizados;
      this.estadoCupon=this.cuponDTO.estadoCupon;
      this.tipoCupon=this.cuponDTO.tipoCupon;
      this.porcentajeCupon=this.cuponDTO.porcentajeCupon;
      this.descripcion=this.cuponDTO.descripcion;

      console.log(this.cuponDTO);

    },
    error: (error) => {
      console.error(error);
    },
  });

}
private mapToCupon(json: any): Cupon {
  return new Cupon(
    json.codigo,
    json.codigoUsable,
    json.fechaVencimiento,
    json.usosPermitidos,
    json.usosRealizados,
    json.estadoCupon,
    json.tipoCupon,
    json.porcentajeCupon,
    json.descripcion
  );
}
 private transformOBJDTO(cupon: Cupon): CuponDTO {
  
    return {
      
      codigo: cupon.getCodigo(),
      codigoUsable: cupon.getCodigoUsable(),
      fechaVencimiento: cupon.getFechaVencimiento(),
      usosPermitidos: cupon.getUsosPermitidos(),
      usosRealizados: cupon.getUsosRealizados(),
      estadoCupon: cupon.getEstadoCupon(),
      tipoCupon: cupon.getTipoCupon(),
      porcentajeCupon: cupon.getPorcentajeCupon(),
      descripcion: cupon.getDescripcion()
      
    };
  
}

public iniciarListaEstadoCupon() {
  const dropdown = document.getElementById('estadoCupons') as HTMLSelectElement;
  const control = this.actualizarCuponForm.get('estadoCupon');  // Obtener el FormControl

  if (dropdown && control) {  // Verifica que el dropdown y el control existen
    // Itera sobre las claves del enum y agrega cada una como una opción
    for (const key in EstadoCupon) {
      const option = document.createElement('option');
      option.value = EstadoCupon[key as keyof typeof EstadoCupon];
      option.text = EstadoCupon[key as keyof typeof EstadoCupon];
      dropdown.appendChild(option);
    }

    // Asigna el valor por defecto si ya se seleccionó
   // control.setValue(this.cuponDTO.estadoCupon);  // Establece un valor por defecto, si es necesario
  }
}
}
