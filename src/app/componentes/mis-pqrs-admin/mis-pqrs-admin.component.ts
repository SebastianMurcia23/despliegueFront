import { Component } from '@angular/core';
import { PQRS } from '../../model/PQRS';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { PQRSDTO } from '../../dto/pqrs-dto';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-mis-pqrs-admin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './mis-pqrs-admin.component.html',
  styleUrl: './mis-pqrs-admin.component.css'
})
export class MisPQRSAdminComponent {
  pqrsList!:PQRS[];
  pqrsListas!:PQRSDTO[];

  constructor(private tokenService: TokenService,private administradorServicio : AdministradorService) {
    this.getPQRS();
    
   }


   public getPQRS() {
    this.administradorServicio.obtenerAllPQRS().subscribe({
      next: (data) => {
        this.pqrsList = data.respuesta.map((item: any) => this.mapToPQRS(item));
        this.pqrsListas = this.transformOBJDTO(this.pqrsList); // Transformar a DTO
      },
      error: (error) => {
        console.error(error);
      },
    });

   }
   private mapToPQRS(json: any): PQRS {
    return new PQRS(
      json.codigo,
      json.idCliente,
      json.tipoSolicitud,
      json.titulo,
      json.mensaje,
      json.estadoPQRS,
      json.respuestas || [],
      json.idAdminAtiende || null
    );
  }
   private transformOBJDTO(listaPQRS: PQRS[]): PQRSDTO[] {
    return listaPQRS.map((item: PQRS) => {
      return {
        codigo: item.getCodigo(),
        idCliente: item.getIdCliente(),
        tipoSolicitud: item.getTipoSolicitud(),
        titulo: item.getTitulo(),
        mensaje: item.getMensaje(),
        estadoPQRS: item.getEstadoPQRS(),
        respuestas: item.getRespuestas(),
        idAdminAtiende: item.getIdAdminAtiende() || '',
      };
    });
  }
}
