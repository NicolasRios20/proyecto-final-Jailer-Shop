import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categorias.interface';
import jtw_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() value:any
  categoria: Categoria[] = [];
  imagen: any;
  login: any;

  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.botonLogin();
    this.categoriasService.getAll()
    .subscribe(data => {
        this.categoria = data; 
    })
  }

  idCategoria(even: any){
    console.log(even)
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

}
