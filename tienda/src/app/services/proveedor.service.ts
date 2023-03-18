import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/proveedor.interface';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url = '/api/proveedor/';
  factura = '/api/facturaProveedor/';

  constructor(
    private http: HttpClient,
  ) { }

  //crear proveedor
  createProveedor(data: any){
    return this.http.post<Proveedor>(this.url,data);
  }

  //listar proveedores de la base de datos
  getproveedores(){
    return this.http.get<Proveedor[]>(this.url);
  }

  //listar un proveedor por cedula
  getProveedor(cedula:any){
    let url = `${this.url}${cedula}`;
    return this.http.get<Proveedor>(url);
  }

  numeroFactura(){
    return this.http.get<any>(this.factura);
  }

  //elimina un proveedor por el documento
  eliminarProveedor(cedula:any){
    return this.http.delete<Proveedor[]>(`${this.url}${cedula}`);
  }

  //actualizar proveedor
  actualizarProveedor(id: any, dato:any){
    const urlapi = `${this.url}${id}`
    console.log(urlapi, dato)
    return this.http.put<[Proveedor]>(urlapi, dato);
  }


}
