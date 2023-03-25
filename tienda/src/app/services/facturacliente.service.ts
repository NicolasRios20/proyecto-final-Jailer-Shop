import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacturasC } from '../models/facturas.interfave';


@Injectable({
  providedIn: 'root'
})
export class FacturaclienteService {
  api = 'https://jailer-shop.onrender.com/api/facturaCliente/';
  factura = 'https://jailer-shop.onrender.com/api/facturaCliente/'
  urls = 'https://jailer-shop.onrender.com/api/facturaCliente/facturas';
  //url = '/api/facturaProveedor/facturas';



  constructor(
    private http: HttpClient
  ) { }
  guardarFactura(factura: any){
    const path = `${this.api}`;
    return this.http.post(path, factura);
  }

  numeroFactura(){
    return this.http.get<any>(this.factura);
  }

  getFacturasC(){
    return this.http.get<FacturasC[]>(this.urls);
  }

  verFactura(id:any){
    const path = `${this.api}${id}`
    return this.http.get<any>(path)
  }

}
