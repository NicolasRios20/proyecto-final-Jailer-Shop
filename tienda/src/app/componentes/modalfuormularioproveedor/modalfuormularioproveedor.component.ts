import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.interface';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-modalfuormularioproveedor',
  templateUrl: './modalfuormularioproveedor.component.html',
  styleUrls: ['./modalfuormularioproveedor.component.css']
})
export class ModalfuormularioproveedorComponent implements OnInit {

  proveedor: any;

  constructor(
    private proveedorService:ProveedorService,
  ) { }


  ngOnInit(): void {}

  proveedorEditar(event:any){
    this.proveedorService.getProveedor(event)
    .subscribe(data => {
      this.proveedor = data;
      console.log(this.proveedor);
    });

    this.ngOnInit();
  }

}
