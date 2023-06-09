import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Producto } from 'src/app/models/product.model';
import { ProductosService } from '../../../services/productos.service';
import { SrviciosService } from 'src/app/services/srvicios.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {


  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() detalleProduct = new EventEmitter<string>();

  // listar todos los productos.
  @Input() producto : any = {
    id_producto: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }

  //objeto para mostrar el detalle del producto.
  @Input() produc : any = {
    id_producto: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }

  constructor(
    private srviciosService: SrviciosService,
) {
  let contador =  JSON.parse(localStorage.getItem("productos") || "[]" );
  this.srviciosService.contador.emit(contador.length);
}

  onAddTocart(){
    this.addedProduct.emit(this.producto);
  }

  addModalProducto(){
    this.detalleProduct.emit(this.producto.id_producto)
  }

  contadorProductosCarrito(){
    let contador =  JSON.parse(localStorage.getItem("productos") || "[]" );
    this.srviciosService.contador.emit(contador.length);
  }

}
