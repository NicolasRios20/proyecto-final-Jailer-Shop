import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.interface';
import { ProveedorService } from '../../services/proveedor.service';
import { Producto } from 'src/app/models/product.model';
import { ProductosService } from 'src/app/services/productos.service';
import { FacturapoveedorService } from 'src/app/services/facturapoveedor.service';
@Component({
  selector: 'app-factura-proveedor',
  templateUrl: './factura-proveedor.component.html',
  styleUrls: ['./factura-proveedor.component.css']
})
export class FacturaProveedorComponent implements OnInit {

  nFactura: any = 0;
  id: any=0;
  fecha: Date = new Date();
  proveedores: Proveedor [] = []
  proveedor: any = {
    id: 0,
    nombre_proveedor: '',
    cedula: '',
    ubicacion_p: '',
    cuenta_bancaria: ''
  };
  productos: Producto [] = []
  producto: any = {
    idP: 0,
    nombre_producto: '',
    cantidad: 0,
    precio_producto: 0,
    id_categoria: 0,
    descripcion: '',
    imagen: '',
  }
  subtotal: any;
  total: any = 0; 
  valorId_proveedor: any;
  ngModel: any;
  datosTabla: any = [];
  remisiones: any = [];
  nmp: any = 1;

  
  constructor(private proveedorService: ProveedorService, private productosService: ProductosService,private facturaproveedor: FacturapoveedorService ) { }

  ngOnInit(): void {
    this.proveedorService.getproveedores().subscribe(data => {
      this.proveedores = data
      console.log(data)
      this.proveedor
    })

    this.proveedorService.numeroFactura().subscribe(data => {
      this.nFactura = data + 1
    })

    this.productosService.getAllproductos().subscribe(data => {
        this.productos = data;
        console.log(this.productos, 'holl')
    })

  }


  id_proveedor(event:any){
    let n = event.target.value;
    if(n < 0 ){
      n=0;
      alert("La categoria no existe");
    }else{
      let a = this.proveedores.filter(function(a) {
        return a.nombre_proveedor == n ;
      });
      this.proveedor = a
      this.id = this.proveedor[0].id_proveedor
      console.log(this.id, "soy yo")
    }
    
  }

  
  productosF(event:any){
    let n = event.target.value;
    if(n < 0 ){
      n=0;
      alert("La categoria no existe");
    }else{
      let a = this.productos.filter(function(a) {
        return a.nombre_producto == n ;
      });
      this.producto = a
      console.log(this.producto)
      this.subtotal = this.producto[0].cantidad * this.producto[0].precio_producto
      
    }
    
  }

  agregarFila(){
    const nuevaFila = {
      columna1: this.nmp,
      columna2 : this.producto[0].id_producto,
      columna3 : this.producto[0].nombre_producto,
      columna4: this.producto[0].cantidad,
      columna5: this.producto[0].precio_producto,
      columna6: this.subtotal,
    }


    this.datosTabla.push(nuevaFila)
    this.total = this.total + this.subtotal
    this.nmp = this.nmp + 1

    const remision = {
      id_compra: this.nFactura,
      cantidad: this.producto[0].cantidad,
      id_producto: this.producto[0].id_producto,
      costo: this.producto[0].precio_producto
    }
    this.remisiones.push(remision)
    console.log("soy el la primera remision" , remision)
  }

 enviar(){
  console.log("hola")
  const encabezado = {
    id_compra: this.nFactura ,
    id_proveedor: this.id,
    valor_total: this.total,
    produc: this.remisiones
    }
  console.log(encabezado.produc,"hola")
  this.facturaproveedor.guardarFactura(encabezado)
  .subscribe((data)=>{
    console.log(data);
  },error =>{
    console.log(error);
  }
  )}
}
