import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
 selector: 'app-header',
 standalone: true,
 imports: [RouterModule],
 templateUrl: './header.component.html',
 styleUrl: './header.component.css'
})
export class HeaderComponent {
 title = 'Unieventos';
 isLogged = false;
 isAdmin = false;
 isClient = false;
 email: string = "";
 rol: string = "";
 selectedOption: string = '';
 idUser:string ='';

 constructor(private tokenService: TokenService,private router: Router) {
   this.isLogged = this.tokenService.isLogged();
   

   if (this.isLogged) {
     this.email = this.tokenService.getEmail();
     this.rol= this.tokenService.getRol();
     this.isAdmin = this.tokenService.isAdmin();
    this.isClient = this.tokenService.isClient();
    this.idUser=this.tokenService.getIDCuenta();
   }
 }


 public logout() {
   this.tokenService.logout();
 }


}
