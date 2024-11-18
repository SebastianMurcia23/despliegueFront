import { Component } from '@angular/core';
import { AdministradorService } from '../../servicios/administrador.service';
import { PublicoService } from '../../servicios/publico.service';
import { CuponDTO } from '../../dto/cupon-dto';
import { Cupon } from '../../model/Cupon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-cupones',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './gestion-cupones.component.html',
  styleUrl: './gestion-cupones.component.css'
})
export class GestionCuponesComponent {

  listCuponesDTO!: CuponDTO[];
  listCupones!: Cupon[];

  constructor(public adminService:AdministradorService,private publicoService: PublicoService) {
    this.obtenerCupones();
   }

   public obtenerCupones(){
    this.adminService.listarCupones().subscribe({
      next: (data) => {

        this.listCupones = data.respuesta.map((item: any) => this.mapToCupon(item));
        this.listCuponesDTO = this.transformOBJDTO(this.listCupones); // Transformar a DTO
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
   private transformOBJDTO(listaCupones: Cupon[]): CuponDTO[] {
    return listaCupones.map((item: Cupon) => {
      return {
        
        codigo: item.getCodigo(),
        codigoUsable: item.getCodigoUsable(),
        fechaVencimiento: item.getFechaVencimiento(),
        usosPermitidos: item.getUsosPermitidos(),
        usosRealizados: item.getUsosRealizados(),
        estadoCupon: item.getEstadoCupon(),
        tipoCupon: item.getTipoCupon(),
        porcentajeCupon: item.getPorcentajeCupon(),
        descripcion: item.getDescripcion()
        
      };
    });
  }
}
