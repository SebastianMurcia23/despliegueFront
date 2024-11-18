import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { CrearPqrsComponent } from './componentes/crear-pqrs/crear-pqrs.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { TransferirTicketComponent } from './componentes/transferir-ticket/transferir-ticket.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { RestablecerContrasenaComponent } from './componentes/restablecer-contrasena/restablecer-contrasena.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { DetalleEventoComponent } from './componentes/detalle-evento/detalle-evento.component';
import { LoginGuard } from './servicios/permiso.service';
import { RolesGuard } from './servicios/roles.service';
import { MisPqrsComponent } from './componentes/mis-pqrs/mis-pqrs.component';
import { DetallePQRSAdminComponent } from './componentes/detalle-pqrs-admin/detalle-pqrs-admin.component';
import { MisPQRSAdminComponent } from './componentes/mis-pqrs-admin/mis-pqrs-admin.component';
import { DetallePQRSClientComponent } from './componentes/detalle-pqrs-client/detalle-pqrs-client.component';
import { GestionCuponesComponent } from './componentes/gestion-cupones/gestion-cupones.component';
import { VerCuponComponent } from './componentes/ver-cupon/ver-cupon.component';
import { VerEventoAdminComponent } from './componentes/ver-evento-admin/ver-evento-admin.component';
import { VerLocalidadComponent } from './componentes/ver-localidad/ver-localidad.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';


export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'crearPqrs', component: CrearPqrsComponent },
   { path: 'crearCupon', component: CrearCuponComponent },
   { path: 'transferirTicket', component: TransferirTicketComponent },
   { path: 'editarCliente', component: EditarClienteComponent },
   { path: 'restablecerContrasena', component: RestablecerContrasenaComponent },
   { path: "gestion-eventos", component: GestionEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'detalle-evento/:id', component: DetalleEventoComponent },
   { path: 'misPQRS', component: MisPqrsComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENT"] } },
   { path: 'misPQRS-Admin', component: MisPQRSAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'detallePQRS-Admin/:id', component: DetallePQRSAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'detallePQRS-Client/:id', component: DetallePQRSClientComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENT"] } },
   { path: 'gestion-Cupones', component: GestionCuponesComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'ver-Cupon/:id', component: VerCuponComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'verEventoAdmin/:id', component: VerEventoAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMIN"] } },
   { path: 'verLocalidad/:idEvento/:id', component: VerLocalidadComponent },
   { path: 'miPerfil/:id', component: MiPerfilComponent },
   { path: "**", pathMatch: "full", redirectTo: "" }
   

];
