import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormGroup, FormControl } from '@angular/forms'
import Swal from "sweetalert2";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroF = new FormGroup({
    nombre:new FormControl(''),
    email: new FormControl(''),
    contrasena: new FormControl(''),
    
  })

  title = 'registro-login';
  
  
  constructor(
    private thaskService: TaskService
  ){}
  
  
  getAllTasks(){
    this.thaskService.getAllTasks().subscribe(data => {
    console.log(data);
    });
  }

  crearUsuario(registroF:any){
    const task = {
    nombre: registroF.nombre , 
    correo: registroF.email,
    contrasena: registroF.contrasena,
    };
    this.thaskService.crearUsuario(task)
    .subscribe((nuevoTask)=>{
      this.exitoso();
    },error =>{
      this.fallido();
    }
    );
  }

  exitoso(){
    Swal.fire({
      title: 'INGRESO EXITOSO',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText: '<a href="http://localhost:4200/login">OK</a>'
    })
  }

  fallido(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'VERIFIQUE EL FORMULARIO INTENTE DE NUEVO',
    })
  }

  
}