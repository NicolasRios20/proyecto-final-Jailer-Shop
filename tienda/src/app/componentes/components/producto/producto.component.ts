import { Component, Input, Output, EventEmitter} from '@angular/core';

import { Producto } from 'src/app/models/product.model';
import { ProductosService } from '../../../services/productos.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {
  
  @Output() addedProduct = new EventEmitter<Producto>();
  @Output() modelProducto = new EventEmitter<Producto>();
  
  @Input() producto : Producto = {
    id: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }
  constructor(
    private productosService: ProductosService
  ) {}
  productoModal:any
  onAddTocart(){
    
    this.addedProduct.emit(this.producto);
    console.log(this.producto)
  }
  addModalProducto(){
    this.modelProducto.emit(this.producto);
    console.log(this.producto)
    this.productosService.getProducto(34).subscribe(data=>{
      this.productoModal = data
      console.log(this.productoModal)
    })
  }

  

}
