import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturapoveedorService } from 'src/app/services/facturapoveedor.service';


import { FacturasP } from "../../models/facturas.interfave";

@Component({
  selector: 'app-historial-proveedor',
  templateUrl: './historial-proveedor.component.html',
  styleUrls: ['./historial-proveedor.component.css']
})
export class HistorialProveedorComponent implements OnInit {

  constructor(private facturaproveedor: FacturapoveedorService, private route: Router,) { }

  facturas: FacturasP[] = []

  ngOnInit(): void {
    this.facturaproveedor.getFacturasP().subscribe(data => {
        console.log(data);
        this.facturas = data
    });
  }

  mostrarFactura(id_compra:any){
    this.route.navigate(['/verfacturas',id_compra]);
    console.log(id_compra)
  }

}
