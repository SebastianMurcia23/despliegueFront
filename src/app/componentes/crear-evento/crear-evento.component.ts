import { Component, OnInit, AfterViewInit } from '@angular/core';  // Asegúrate de importar AfterViewInit
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { LocalidadDTO } from '../../dto/localidad-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';
import { TipoEvento } from '../../enum/TipoEvento';
import { CiudadesEnum } from '../../enum/CiudadesEnum';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit, AfterViewInit {
 // tiposDeEventoSeleccionado!: TipoEvento;
  //ciudadSeleccionada!: CiudadesEnum;
  crearEventoForm!: FormGroup;
  localidadesForm!: FormGroup;
  listLocalidadesDTO!: LocalidadDTO[];
  eventoDTO!: CrearEventoDTO;
  imagenPortadaUrl!: File;
  imgBoletaUrl!: File;
  imagenLocalidadesUrl!: File;

  // Constructor
  constructor(
    private formBuilder: FormBuilder,
    private publicoService: PublicoService,
    private adminService: AdministradorService
  ) {
   // this.tiposDeEventoSeleccionado = TipoEvento.CONCIERTOS;
   // this.ciudadSeleccionada = CiudadesEnum.Bogota;
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.listarCiudades();
    this.listarTipos();
  }

  ngAfterViewInit(): void {
    // Llamar a listarCiudades después de que el DOM esté listo
    
  }

  private crearFormulario() {
    this.crearEventoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      poster: ['', [Validators.required]],
      imgBoleta: ['', [Validators.required]],
      imgDistribucionLocalidades: ['', [Validators.required]],
      fechaEvento: ['', [Validators.required]],
      localidades: this.formBuilder.array([this.crearLocalidad()]),
    });
  }

  get localidades(): FormArray {
    return this.crearEventoForm.get('localidades') as FormArray;
  }

  crearLocalidad(): FormGroup {
    return this.formBuilder.group({
      nombreLoc: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      capacidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  agregarLocalidad(): void {
    this.localidades.push(this.crearLocalidad());
  }

  eliminarLocalidad(index: number): void {
    if (this.localidades.length > 1) {
      this.localidades.removeAt(index);
    }
  }

  todosLosCamposCompletos(): boolean {
    const lastLocalidad = this.localidades.at(this.localidades.length - 1);
    return lastLocalidad && lastLocalidad.valid;
  }

  // Función para manejar el cambio de archivo (cargar las imágenes)
  onFileChange(event: any, tipo: string) {
    const file = event.target.files[0];


    if (file) {
      if (tipo === 'imagenPortada') {
        this.imagenPortadaUrl = file;
      } else if (tipo === 'imgBoleta') {
        this.imgBoletaUrl = file;
      } else if (tipo === 'imagenLocalidades') {
        this.imagenLocalidadesUrl = file;
      }
    }


    
  }

  public subirImagen(tipo:string){
    const formData = new FormData();
   
   
    if (tipo === 'imagenPortada') {
      const imagen= this.imagenPortadaUrl;
      const formControl='poster';
      formData.append('imagen', imagen!);
      this.adminService.subirImagen(formData).subscribe({
        next: (data) => {
          this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
          Swal.fire("Exito!", "Se ha subido la imagen.", "success");
        },
        error: (error) => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    } else if (tipo === 'imgBoleta') {
      const imagen= this.imgBoletaUrl;
      const formControl='imgBoleta';
      formData.append('imagen', imagen!);
      this.adminService.subirImagen(formData).subscribe({
        next: (data) => {
          this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
          Swal.fire("Exito!", "Se ha subido la imagen.", "success");
        },
        error: (error) => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    }else if (tipo === 'imagenLocalidades') {
      const imagen= this.imagenLocalidadesUrl;
      const formControl='imgDistribucionLocalidades';
      formData.append('imagen', imagen!);
      this.adminService.subirImagen(formData).subscribe({
        next: (data) => {
          this.crearEventoForm.get(formControl)?.setValue(data.respuesta);
          Swal.fire("Exito!", "Se ha subido la imagen.", "success");
        },
        error: (error) => {
          Swal.fire("Error!", error.error.respuesta, "error");
        }
      });
    }
   
   
    
   
   
   }
   
   
  public listarTipos() {
    const dropdown = document.getElementById('tipoSelected') as HTMLSelectElement;
    const control = this.crearEventoForm.get('tipoEvento');  // Obtener el FormControl
  
    if (dropdown && control) {  // Verifica que el dropdown y el control existen
      // Itera sobre las claves del enum y agrega cada una como una opción
      for (const key in TipoEvento) {
        const option = document.createElement('option');
        option.value = TipoEvento[key as keyof typeof TipoEvento];
        option.text = TipoEvento[key as keyof typeof TipoEvento];
        dropdown.appendChild(option);
      }
  
      // Asigna el valor por defecto si ya se seleccionó
      control.setValue(TipoEvento.CONCIERTOS);  // Establece un valor por defecto, si es necesario
    }
  }
  
  public listarCiudades() {
    const dropdown = document.getElementById('ciudadSelected') as HTMLSelectElement;
    const control = this.crearEventoForm.get('ciudad');  // Obtener el FormControl
  
    if (dropdown && control) {  // Verifica que el dropdown y el control existen
      // Itera sobre las claves del enum y agrega cada una como una opción
      for (const key in CiudadesEnum) {
        const option = document.createElement('option');
        option.value = CiudadesEnum[key as keyof typeof CiudadesEnum];
        option.text = CiudadesEnum[key as keyof typeof CiudadesEnum];
        dropdown.appendChild(option);
      }
  
      // Asigna el valor por defecto si ya se seleccionó
      control.setValue(CiudadesEnum.Bogota);  // Establece un valor por defecto, si es necesario
    }
  }
  





  

  // Función para crear evento
  public crearEvento() {
    console.log(this.crearEventoForm.value);
    const eventoDTO = this.crearEventoForm.value as CrearEventoDTO;

    if (this.crearEventoForm.valid) {
      const localidadesList: LocalidadDTO[] = this.localidades.value.map((localidad: any) => {
        return {
          nombre: localidad.nombreLoc,
          precio: localidad.precio,
          capacidad: localidad.capacidad
        };
      });
      eventoDTO.localidades = localidadesList;
      
    }
    console.log(eventoDTO);
    this.adminService.crearEvento(eventoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Registro de evento',
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
