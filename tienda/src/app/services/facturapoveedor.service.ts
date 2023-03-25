import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacturasP } from '../models/facturas.interfave';


@Injectable({
  providedIn: 'root'
})
export class FacturapoveedorService {
  api = 'https://jailer-shop.onrender.com/api/facturaProveedor/';
  urls = 'https://jailer-shop.onrender.com/api/facturaProveedor/facturas';
  url = 'https://jailer-shop.onrender.com/api/facturaProveedor/facturas';



  constructor(
    private http: HttpClient
  ) { }
  guardarFactura(factura: any){
    const path = `${this.api}`;
    return this.http.post(path, factura);
  }

  getFacturasP(){
    return this.http.get<FacturasP[]>(this.urls);
  }

  verFactura(id:any){
    const path = `${this.api}${id}`
    return this.http.get<any>(path)
  }

}
