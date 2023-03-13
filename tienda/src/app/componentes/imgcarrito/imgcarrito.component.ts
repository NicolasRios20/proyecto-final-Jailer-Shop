import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/product.model';

@Component({
  selector: 'app-img-carrito',
  templateUrl: './imgcarrito.component.html',
  styleUrls: ['./imgcarrito.component.css']
})
export class ImgCarritoComponent{

  @Output() addedProduct = new EventEmitter<Producto>();
  
  @Input() producto : Producto = {
    id: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }
  
  constructor() { }

  addToShoppingCart(producto: Producto): void {
    this.addedProduct.emit(producto);
  }

}