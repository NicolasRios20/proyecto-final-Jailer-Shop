import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaclienteService } from 'src/app/services/facturacliente.service';


import { FacturasC } from 'src/app/models/facturas.interfave';

@Component({
  selector: 'app-historial-cliente',
  templateUrl: './historial-cliente.component.html',
  styleUrls: ['./historial-cliente.component.css']
})
export class HistorialClienteComponent implements OnInit {

  constructor(private facturacliente: FacturaclienteService, private route: Router,) { }

  facturas: FacturasC[] = []

  ngOnInit(): void {
    this.facturacliente.getFacturasC().subscribe(data => {
        console.log(data);
        this.facturas = data
    });
  }

  mostrarFactura(no_venta:any){
    this.route.navigate(['/verfacturasC',no_venta]);
    console.log(no_venta)
  }

}
