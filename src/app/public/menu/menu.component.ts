import { Component, effect, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { Usuario } from '../../modules/usuario/interfaces/usuario.interface';
import { NgIf } from '@angular/common';
import { AuthUsuarioService } from '../../api/services/usuario/auth-usuario.service';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, ButtonModule, RouterOutlet, NgIf],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{

  
private authService = inject(AuthUsuarioService);

  usuarioLogueado = this.authService.usuario;

  ngOnInit(): void {
    effect(() => {
    console.log('Usuario en menú:', this.usuarioLogueado());
  });
  }

}
