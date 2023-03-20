import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  url = '/api/producto/';

  constructor(
    private http: HttpClient
  ) { }

  getAllproductos(){
    return this.http.get<Producto[]>(this.url);
  }

  create(data: any){
    return this.http.post<Producto>(this.url,data);
  }
  getProducto(idProducto:any){
    let url = `${this.url}${idProducto}`;
    return this.http.get<Producto>(url)
  }
}
