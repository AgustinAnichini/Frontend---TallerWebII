import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit,OnDestroy {
  private fb = inject(FormBuilder);
  messageService = inject(MessageService);
  form!: FormGroup;
  spinner = true;

  ngOnInit(): void {
    this.spinner = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    
  }

  crearUsuario(){
    console.log('Se envio el Formulario')
    // if(this.form.valid){
    //   this.empleadoService.crearEmpleado({nombre: this.form.value.nombre, id_empresa: this.form.value.empresa}).subscribe({
    //     next: (data) => {
    //       this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'El empleado creado con exito' });

    //     },
    //     error: (error) =>{
    //       console.log(error)
    //     },
    //     complete:()=>{

    //     }
    //   })
    // }else{
    //   this.messageService.add({ severity: 'success', summary: '?????', detail: 'El empleado ha sido eliminado' });

    // }
  }
}
