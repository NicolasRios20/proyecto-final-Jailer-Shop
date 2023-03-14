import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.interface';
import { Router } from '@angular/router';
import { ModalfuormularioproveedorComponent } from '../modalfuormularioproveedor/modalfuormularioproveedor.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  
  proveedor: Proveedor[] = []

  constructor(
    private proveedorService: ProveedorService,    
  ) { 

  }

  ngOnInit(): void {
    this.proveedorService.getproveedores().subscribe(data => {
      this.proveedor = data.reverse()
  });
  }

  formulario = new FormGroup({
    nombre_proveedor: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required]),
    ubicacion_p: new FormControl('', [Validators.required]),
    cuenta_bancaria: new FormControl('', [Validators.required]),
  });

  crearProveedor(form: any){
    this.proveedor = form;
    this.proveedorService.createProveedor(form)
    .subscribe(data => {
      alert("Registro Exitoso");
      this.ngOnInit()
      this.formulario.reset();
    },error =>{
      if(error.status == 400){
        alert("Verificar Campos")
      }else if(error.status == 500){
        alert("El Usuario ya Existe");
      }
    });
  }

  proveedorEliminar(event:any){
    console.log(event)
    let resultado = window.confirm('Estas seguro?');
    if (resultado === true) {
      let cedula = event;
      this.proveedorService.eliminarProveedor(cedula)
      .subscribe(data =>{
        this.ngOnInit()
      });
    } else { 
        window.alert('Pareces indeciso');
    }
  }

}
