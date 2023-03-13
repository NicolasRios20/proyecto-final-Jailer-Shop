import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { LoginI } from '../../models/login.interface';
import jtw_decode from "jwt-decode";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombre: any= {};
  ingreso: boolean = false;
  usuario: LoginI[] = [];
  texto = "Mostrar contraseña"

  logiForm:any = new FormGroup({
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  })

  constructor( private url:TaskService) { 
    
   }

  ngOnInit(): void {
  }

  
  onLogin(form: any){
    const ingreso :LoginI  = {
      correo: form.email,
      contrasena: form.contrasena,

    };

    this.url.loginByEmail(ingreso)
    
    .subscribe((token) => {

      this.ingreso = true;
      if (this.ingreso == true) {
        console.log(token)
        localStorage.setItem('token',JSON.stringify(token))
        let datoToken: any = localStorage.getItem('token');
        let dato: any = jtw_decode(datoToken)
        console.log(dato.id)
        this.exitoso();
      }  
    },error=>{
      this.fallido();
    });
  };


  exitoso(){
    Swal.fire({
      title: 'INGRESO EXITOSO',
      icon: 'success',
      showCloseButton: true,
      confirmButtonText: '<a href="http://localhost:4200/productos" style="text-color: white;" t>OK</a>'
    })
  }

  fallido(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'EMAIL O CONTRASEÑA INVALIA INTENTE DE NUEVO',
    })
  }
  
  mostrar(){
    
    let mostrar: any = document.getElementById('password');
    console.log (mostrar);
    if(mostrar.type == 'password'){
      mostrar.type = 'text';
      this.texto = "Ocultar contraseña"
    } else{
      mostrar.type = 'password';
      this.texto = "Mostrar contraseña"
    }

  }



}
