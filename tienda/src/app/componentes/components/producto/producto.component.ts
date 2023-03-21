import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Producto } from 'src/app/models/product.model';
import { ProductosService } from '../../../services/productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {
  
  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() detalleProduct = new EventEmitter<string>();


  @Input() producto : any = {
    id_producto: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }

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
) {}

  onAddTocart(){
    
    this.addedProduct.emit(this.producto);
  }

  addModalProducto(){
    this.detalleProduct.emit(this.producto.id_producto)
  }

}
