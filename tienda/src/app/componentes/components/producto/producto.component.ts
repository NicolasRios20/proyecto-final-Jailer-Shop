import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Producto } from 'src/app/models/product.model';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {

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

  onAddTocart(){
    
    this.addedProduct.emit(this.producto);
    
  }

  constructor() { }

}
