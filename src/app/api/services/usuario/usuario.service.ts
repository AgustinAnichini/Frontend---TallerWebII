import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.development';
import { SignInResponse, Usuario, UsuarioRegistro } from '../../../modules/usuario/interfaces/usuario.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    http = inject(HttpClient)

  constructor() { }

  crearUsuario(usuario: UsuarioRegistro) {
       return this.http.post<Usuario>(`${environment.api_url}/usuario/signup`, usuario);
  }

 iniciarSesion(data: { email: string; password: string }) : Observable<SignInResponse>{
  return this.http.post<SignInResponse>(`${environment.api_url}/usuario/signin`, data);
}

}
