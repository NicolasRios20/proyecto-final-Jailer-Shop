import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaclienteService } from 'src/app/services/facturacliente.service';

import { encabezadoFC, productosFC } from "../../models/facturas.interfave";

@Component({
  selector: 'app-ver-factura-c',
  templateUrl: './ver-factura-c.component.html',
  styleUrls: ['./ver-factura-c.component.css']
})
export class VerFacturaCComponent implements OnInit {

  id: any;
  cliente: encabezadoFC[] = []
  productos: productosFC[] = []
  numero = 0

  constructor(private facturacliente: FacturaclienteService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      
    });

    this.facturacliente.verFactura(this.id).subscribe(data =>{
      this.cliente = data[0]
      this.productos = data[1]  
      console.log(this.productos[0].valor_total) 
    })
  }

}
