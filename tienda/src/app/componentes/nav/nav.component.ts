import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categorias.interface';
import jtw_decode from "jwt-decode";
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { datosUsuario } from '../../models/task';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  categoria: Categoria[] = [];
  usuario: datosUsuario[] = [];
  imagen = "https://i.ibb.co/94D9z5P/logo.jpg";
  login: any;
  id:any;

  constructor(
    private categoriasService: CategoriasService,
    private taskService: TaskService,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.botonLogin();
    this.fotoperfil();
    this.categoriasService.getAll()
    .subscribe(data => {
        this.categoria = data; 
    })
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
      this.login = null;
    }else{
      this.login = '';
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

}
