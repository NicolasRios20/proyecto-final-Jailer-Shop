import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categorias.interface';
import { CategoriasService } from '../../../services/categorias.service';

@Component({
  selector: 'app-nav-admi',
  templateUrl: './nav-admi.component.html',
  styleUrls: ['./nav-admi.component.css']
})
export class NavAdmiComponent implements OnInit {

  categoria: Categoria[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private router: Router,
  ) { }

  ngOnInit(): void {
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

}
