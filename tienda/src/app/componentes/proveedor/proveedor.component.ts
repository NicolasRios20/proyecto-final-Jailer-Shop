import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Proveedor } from '../../models/proveedor.interface';


@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  
  proveedores: Proveedor[] = [];
  proveedor: any;

  constructor(
    private proveedorService: ProveedorService,    
  ) {}

  ngOnInit(): void {
    this.proveedorService.getproveedores().subscribe(data => {
      this.proveedores = data.reverse()
    });
  }

  //formulario para crear el proveedor
  formulario = new FormGroup({
    nombre_proveedor: new FormControl('', [Validators.required]),
    cedula: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]),
    ubicacion_p: new FormControl('', [Validators.required]),
    cuenta_bancaria: new FormControl(''),
  });

  //formulario del modal 
  formularioActualizacion = new FormGroup({
    nombre_proveedor: new FormControl('', [Validators.required]),
    cedula: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11), Validators.pattern(/^([0-9])*$/)]),
    ubicacion_p: new FormControl('', [Validators.required]),
    cuenta_bancaria: new FormControl(''),
  });

  crearProveedor(form: any){

    if(this.formulario.valid){
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
    }else(
      alert("la cedula deve tener de 8 a 10 digitos")
    )

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

  ConsultarProveedor(event:any){
    this.proveedorService.getProveedor(event)
    .subscribe(dato => {
      this.proveedor = dato;
      this.formularioActualizacion.setValue({
        nombre_proveedor: this.proveedor[0].nombre_proveedor,
        cedula: this.proveedor[0].cedula,
        ubicacion_p: this.proveedor[0].ubicacion_p,
        cuenta_bancaria: this.proveedor[0].cuenta_bancaria,
      })
      console.log(this.formularioActualizacion);
      console.log(this.proveedor);
    })
  }

  actualizarProveedor(id:any){

    if (this.formularioActualizacion.valid){ 
      
        const formData = new FormData()
        formData.append('nombre_proveedor',this.formularioActualizacion.get('nombre_proveedor')?.value || '');
        formData.append('cedula',this.formularioActualizacion.get('cedula')?.value || '');
        formData.append('ubicacion_p', this.formularioActualizacion.get('ubicacion_p')?.value || '');
        formData.append('cuenta_bancaria', this.formularioActualizacion.get('cuenta_bancaria')?.value || '');
        
        this.proveedorService.actualizarProveedor(id, formData).subscribe(dato=>{
          alert("registro exitoso")
          this.cerrar()
        },error =>{
          alert("Ocurrio un Error por favor Verificar los Campos");
        })
    }else{ 
      alert("verificar campos")
    }

  }

  cerrar() {
    close();
    this.ngOnInit()
  }


}
