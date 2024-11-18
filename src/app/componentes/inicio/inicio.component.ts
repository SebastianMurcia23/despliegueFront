import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { EventoDTO } from '../../dto/evento-dto';
import { PublicoService } from '../../servicios/publico.service';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


  eventos: EventoDTO[];
  isLogged = false;
  isAdmin = false;
  isClient = false;
 
  constructor(public eventosService:EventosService,private publicoService: PublicoService,private tokenService: TokenService,) {
    this.eventos = [];
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.isAdmin = this.tokenService.isAdmin();
     this.isClient = this.tokenService.isClient();
    }
    this.obtenerEventos();
   //this.eventos = eventosService.listar();
  }

  public obtenerEventos(){
    this.publicoService.listarEventos().subscribe({
      next: (data) => {
        this.eventos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
   }
   
   
}
