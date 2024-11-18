import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicoService } from '../../servicios/publico.service';
import { AdministradorService } from '../../servicios/administrador.service';
import { TokenService } from '../../servicios/token.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ObtenerLocalidadDTO } from '../../dto/obtener-localidad-dto';
import { Localidad } from '../../model/Localidad';
import { Asiento } from '../../model/Asiento';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-localidad',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './ver-localidad.component.html',
  styleUrl: './ver-localidad.component.css'
})
export class VerLocalidadComponent {
  codigoEvento:string='';
  codigoLocalidad:string='';

  isLogged = false;
  isAdmin = false;
  isClient = false;

  localidadActual!:Localidad;

  codigo: string='';
  nombreLocalidad: string='';
  precio!: number;
  capacidadMaxima!: number;
  cantAsientosDisponibles!: number;
  asientosLocalidad!: Asiento[];


  obtenerLocDTO!:ObtenerLocalidadDTO;

  constructor(private route: ActivatedRoute,
    private publicService: PublicoService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {

      this.isLogged = this.tokenService.isLogged();
      if (this.isLogged) {
        this.isAdmin = this.tokenService.isAdmin();
       this.isClient = this.tokenService.isClient();
      }
    
      this.localidadActual = new Localidad(
        "LOC123", // Código
        "Platea Baja", // Nombre de la localidad
        150.0, // Precio
        100, // Capacidad máxima
        95, // Cantidad de asientos disponibles
        this.asientosLocalidad // Lista de Asientos
      );


      this.route.params.subscribe((params) => {

        this.codigoEvento = params['idEvento'];
        
        this.codigoLocalidad = params['id'];

        this.obtenerLocDTO = {
          codEvento: '',
          codLocalidad: ''
        };

        this.obtenerLocDTO.codEvento=this.codigoEvento;
        this.obtenerLocDTO.codLocalidad=this.codigoLocalidad;
        
        console.log("Eventtt: "+this.obtenerLocDTO.codEvento+" Localidad:"+this.obtenerLocDTO.codLocalidad);


        this.obtenerLocalidad();
        
});

//this.iniciarFormularioActualizarEvento();
}
public obtenerLocalidad(){

  console.log(this.obtenerLocDTO);

  this.publicService.obtenerLocalidad(this.obtenerLocDTO).subscribe({
    next: (data) => {
      this.localidadActual = data.respuesta;
      
      console.log(this.localidadActual);

      this.codigo=this.codigoLocalidad;
      this.nombreLocalidad=this.localidadActual.nombreLocalidad;
      this.precio=this.localidadActual.precio;
      this.capacidadMaxima=this.localidadActual.capacidadMaxima;
      this.cantAsientosDisponibles=this.localidadActual.cantAsientosDisponibles;
      this.asientosLocalidad=this.localidadActual.asientosLocalidad;

    },
    error: (error) => {
      console.error(error);
    },
  });

}

}
