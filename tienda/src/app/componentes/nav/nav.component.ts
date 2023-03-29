import { Component,OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categorias.interface';
import jtw_decode from "jwt-decode";
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { datosUsuario } from '../../models/task';
import { SrviciosService } from 'src/app/services/srvicios.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  categoria: Categoria[] = [];
  usuario: datosUsuario[] = [];
  imagen = "https://i.ibb.co/94D9z5P/logo.jpg";
  login!: boolean;
  id:any;
  contador:any 

  constructor(
    private categoriasService: CategoriasService,
    private taskService: TaskService,
    private router: Router,
    private srviciosService: SrviciosService,
  ) { }

  ngOnInit(): void {
    this.cantidad()
    this.categoriasService.getAll()
    .subscribe(data => {
        this.categoria = data; 
    })
    this.botonLogin();
    this.fotoperfil();
  }

  idCategoria(even: any){
    if(even){
      this.router.navigate(['/categoria',even]);
    }
  }

  cerrarSesion(){
    localStorage.clear();
  }

  botonLogin(){
    if(localStorage.getItem('token')){
      this.login = true;
    }else{
      this.login = false;
    }
  }

  fotoperfil(){

    let datoToken: any = localStorage.getItem('token');
    let iduser: any = jtw_decode(datoToken)
    this.id = parseInt(iduser.id)

    this.taskService.getTask(this.id)
    .subscribe(data => {

        if(!data[0].foto){
          this.imagen = "https://i.ibb.co/94D9z5P/logo.jpg";
        }else{
          this.imagen = data[0].foto;
        }
    })

  }

  cantidad(){
    console.log( this.contador)
    this.srviciosService.contador
    .subscribe(data =>{
      this.contador = data;
      console.log(this.contador, "soy la cantida")
    });
  }

}
