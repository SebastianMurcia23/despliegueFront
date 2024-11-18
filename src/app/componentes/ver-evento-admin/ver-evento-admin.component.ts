import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { CommonModule } from '@angular/common';
import { Localidad } from '../../model/Localidad';
import { EventoDTO } from '../../dto/evento-dto';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalidadDTO } from '../../dto/localidad-dto';
import { CrearEventoDTO } from '../../dto/crear-evento-dto';
import { TipoEvento } from '../../enum/TipoEvento';
import { CiudadesEnum } from '../../enum/CiudadesEnum';
import { TokenService } from '../../servicios/token.service';
import { LocalidadesCompletDTO } from '../../dto/localidades-complet-dto';
import { EditarEventoDTO } from '../../dto/editar-evento-dto';
import { AdministradorService } from '../../servicios/administrador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-evento-admin',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './ver-evento-admin.component.html',
  styleUrl: './ver-evento-admin.component.css'
})
export class VerEventoAdminComponent {
  evento!: EventoDTO;
  codigoEvento: string = '';
  mensaje:string='';

  eventoEditado!: EditarEventoDTO;

  nombre: string = '';
  descripcion: string = '';
  fecha!:Date;
  tipo!:TipoEvento;
  ubicacion:string = '';
  direccion: string = '';
  estado: string = '';
  imagenPortada: string = '';
  imgBoleta:string='';
  imagenLocalidades: string = '';

  actualizarEventoForm!:FormGroup;


  editarEventoForm!: FormGroup;
  localidadesList!: Localidad[];
  localidadesDTO!: LocalidadesCompletDTO[];

  constructor(private route: ActivatedRoute,
              private publicService: PublicoService,
              private adminService: AdministradorService,
              private tokenService: TokenService,
              private formBuilder: FormBuilder) {
    this.route.params.subscribe((params) => {
      this.codigoEvento = params['id'];
      
      this.obtenerEvento(params['id']);
    });
    this.eventoEditado = {
      codEvent: "",               // Inicializado como cadena vacía
      nombre: "",                 // Inicializado como cadena vacía
      direccion: "",              // Inicializado como cadena vacía
      ciudad: "",                 // Inicializado como cadena vacía
      descripcion: "",            // Inicializado como cadena vacía
      tipoEvento: TipoEvento.CONCIERTOS,  // Ejemplo de valor de tipo enum
      poster: "",                 // Inicializado como cadena vacía
      imgBoleta: "",              // Inicializado como cadena vacía
      imgDistribucionLocalidades: "",   // Inicializado como cadena vacía
      fechaEvento: new Date(1699747200000),            // Inicializado como cadena vacía
      localidades: []             // Inicializado como lista vacía
    };
    //this.iniciarFormularioActualizarEvento();
  }

  ngOnInit(): void {
   this.crearFormulario();
   this.iniciarFormularioActualizarEvento();
  }

  ngAfterViewInit(): void {
    // Llamar a listarCiudades después de que el DOM esté listo
    
  }
 
  public obtenerEvento(id:string){
    this.publicService.obtenerEvento(id).subscribe({
      next: (data) => {
        this.evento = data.respuesta;
        this.localidadesList = this.evento.localidades.map((item: any) => this.mapToLocalidades(item));
        this.localidadesDTO = this.transformOBJDTO(this.localidadesList); // Transformar a DTO

        this.imagenPortada = this.evento.imagenPortada;
        this.nombre = this.evento.nombre;
        this.descripcion = this.evento.descripcion;
        this.fecha = this.evento.fecha;
        this.tipo = this.evento.tipo;
        this.ubicacion = this.evento.ciudad;
        this.direccion = this.evento.direccion;
        this.estado = this.evento.estado;
        this.imagenLocalidades=this.evento.imagenLocalidades;
        this.imgBoleta=this.evento.imagenBoleta;
       


      },
      error: (error) => {
        console.error(error);
      },
    });
   }
public editarEvento(){

  const valores = this.editarEventoForm.value;
  this.eventoEditado.codEvent=this.codigoEvento;

  this.eventoEditado.nombre=valores.nombre;
  this.eventoEditado.direccion=valores.direccion;
  this.eventoEditado.ciudad=valores.ciudad;
  this.eventoEditado.descripcion=valores.descripcion;

  this.eventoEditado.tipoEvento=valores.tipoEvento;

  this.eventoEditado.poster=valores.poster;
  this.eventoEditado.imgDistribucionLocalidades=valores.imgDistribucionLocalidades;
  this.eventoEditado.imgBoleta=valores.imgBoleta;
  this.eventoEditado.fechaEvento=valores.fechaEvento;
  this.eventoEditado.localidades=this.evento.localidades;

//llenar en caso de que no se editen

this.eventoEditado.nombre=(this.eventoEditado.nombre === '' || this.eventoEditado.nombre === null)
 ? this.evento.nombre : this.eventoEditado.nombre ;

 this.eventoEditado.direccion=(this.eventoEditado.direccion === '' || this.eventoEditado.direccion === null)
 ? this.evento.direccion : this.eventoEditado.direccion ;

 this.eventoEditado.ciudad=(this.eventoEditado.ciudad === '' || this.eventoEditado.ciudad === null)
 ? this.evento.ciudad : this.eventoEditado.ciudad ;

 this.eventoEditado.descripcion=(this.eventoEditado.descripcion === '' || this.eventoEditado.descripcion === null)
 ? this.evento.descripcion : this.eventoEditado.descripcion ;


 this.eventoEditado.tipoEvento=( this.eventoEditado.tipoEvento === null)
 ? this.evento.tipo : this.eventoEditado.tipoEvento ;

 this.eventoEditado.poster=(this.eventoEditado.poster === '' || this.eventoEditado.poster === null)
 ? this.evento.imagenPortada : this.eventoEditado.poster ;

 this.eventoEditado.imgDistribucionLocalidades=(this.eventoEditado.imgDistribucionLocalidades === '' || this.eventoEditado.imgDistribucionLocalidades === null)
 ? this.evento.imagenLocalidades : this.eventoEditado.imgDistribucionLocalidades ;
//console.log("GG:"+this.evento.imagenBoleta);
 this.eventoEditado.imgBoleta=(this.eventoEditado.imgBoleta === '' || this.eventoEditado.imgBoleta ==='undefined'|| this.eventoEditado.imgBoleta === null)
 ? this.imgBoleta : this.eventoEditado.imgBoleta ;

 this.eventoEditado.fechaEvento=( this.eventoEditado.fechaEvento === null)
 ? this.evento.fecha : this.eventoEditado.fechaEvento ;
      
console.log(this.eventoEditado);

this.adminService.editarEvento(this.eventoEditado).subscribe({
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



}
   public iniciarFormularioActualizarEvento(){
    this.editarEventoForm = this.formBuilder.group({
      nombre: [this.nombre],
      direccion: [this.direccion],
      ciudad: [this.ubicacion],
      descripcion: [this.descripcion],
      tipoEvento: [this.tipo],
      poster: [this.imagenPortada],
      imgBoleta:[this.imgBoleta],
      imgDistribucionLocalidades: [this.imagenLocalidades],
      fechaEvento: [this.fecha]
    }
  );
  }




   private mapToLocalidades(json: any): Localidad {
    return new Localidad(
      json.codigo,
      json.nombreLocalidad,
      json.precio,
      json.capacidadMaxima,
      json.cantAsientosDisponibles,
      json.asientosLocalidad
    );
  }
   private transformOBJDTO(localidadesXX: Localidad[]): LocalidadesCompletDTO[] {
    return localidadesXX.map((item: Localidad) => {
      return {
        codigo: item.getCodigo(),
        nombreLocalidad: item.getNombreLocalidad(),
        precio: item.getPrecio(),
        capacidadMaxima: item.getCapacidadMaxima(),
        cantAsientosDisponibles: item.getCantAsientosDisponibles(),
        asientosLocalidad: item.getAsientosLocalidad()
      };
    });
  }

  private crearFormulario() {
    this.editarEventoForm = this.formBuilder.group({
      listLocalidadesDTO: this.formBuilder.array([this.crearLocalidad()]),
    });
  }

   
  crearLocalidad(): FormGroup {
    return this.formBuilder.group({
      nombreLoc: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      capacidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get localidades(): FormArray {
    return this.editarEventoForm.get('localidades') as FormArray;
  }
}
