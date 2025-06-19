import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { UsuarioService } from '../../../../api/services/usuario/usuario.service';
import { NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SignInResponse, Usuario } from '../../interfaces/usuario.interface';
import { AuthUsuarioService } from '../../../../api/services/usuario/auth-usuario.service';


@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, InputTextModule, SelectModule, ToastModule, NgIf, ButtonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [MessageService],
})
export class SigninComponent implements OnInit {

  messageService = inject(MessageService);
  router= inject(Router)
  authService= inject(AuthUsuarioService)
  form!: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  iniciarSesion() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El email o contraseña es invalido.'
          });
      return;
    }

  console.log('Datos para login:', this.form.value);  

    this.usuarioService.iniciarSesion(this.form.value).subscribe({
      next: (res: SignInResponse) => {

        console.log('Login OK', res);
        const { usuario } = res;
        this.authService.setUsuario(usuario)    

        this.router.navigate(['/']);
      },
      error: (errorResponse) => {
        const backendMsg = errorResponse.error?.error || 'Error desconocido';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: backendMsg });
      }
    });
  }
}
