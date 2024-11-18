import { Component } from '@angular/core';
import { EventoDTO } from '../../dto/evento-dto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventosService } from '../../servicios/eventos.service';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { Localidad } from '../../model/Localidad';
import { LocalidadesCompletDTO } from '../../dto/localidades-complet-dto';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
 selector: 'app-detalle-evento',
 standalone: true,
 imports: [CommonModule,ReactiveFormsModule,RouterModule],
 templateUrl: './detalle-evento.component.html',
 styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent {


  codigoEvento: string = '';
  nombre: string = '';
  descripcion: string = '';
  fecha!:Date;
  tipo:string = '';
  ubicacion:string = '';
  direccion: string = '';
  estado: string = '';
  imagenPortada: string = '';
  imagenLocalidades: string = '';
 evento!: EventoDTO;

 localidadesList!: Localidad[];
 localidadesDTO!: LocalidadesCompletDTO[];


 constructor(private route: ActivatedRoute, private publicService: PublicoService) {
   this.route.params.subscribe((params) => {
     this.codigoEvento = params['id'];
     
     this.obtenerEvento(params['id']);
   });
 }


public obtenerEvento(id:string){
  this.publicService.obtenerEvento(id).subscribe({
    next: (data) => {
      this.evento = data.respuesta;
      
      this.imagenPortada = this.evento.imagenPortada;
      this.nombre = this.evento.nombre;
      this.descripcion = this.evento.descripcion;
      this.fecha = this.evento.fecha;
      this.tipo = this.evento.tipo;
      this.ubicacion = this.evento.ciudad;
      this.direccion = this.evento.direccion;
      this.estado = this.evento.estado;
      this.imagenLocalidades=this.evento.imagenLocalidades;


      this.localidadesList = this.evento.localidades.map((item: any) => this.mapToLocalidades(item));
        this.localidadesDTO = this.transformOBJDTO(this.localidadesList); // Transformar a DTO

    },
    error: (error) => {
      console.error(error);
    },
  });
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
}
