import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../models/categorias.interface';
import { Producto } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url = '/api/categorias/';
  constructor(
    private http: HttpClient
  ) { }
  getAll(){
    return this.http.get<[Categoria]>(this.url);
  }

  getCategoria(id:any){
    return this.http.get<Producto[]>(this.url,id);
  }
}
