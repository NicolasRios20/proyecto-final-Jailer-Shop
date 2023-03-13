import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturapoveedorService } from 'src/app/services/facturapoveedor.service';

import { encabezadoFP, productosFP } from "../../models/facturas.interfave";

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent implements OnInit {
  id: any;
  proveedor: encabezadoFP[] = []
  productos: productosFP[] = []
  numero = 0
  constructor(private facturaproveedor: FacturapoveedorService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    	
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      
    });

    this.facturaproveedor.verFactura(this.id).subscribe(data =>{
      this.proveedor = data[0]
      this.productos = data[1]  
      console.log(this.proveedor) 
    })
  }

}
