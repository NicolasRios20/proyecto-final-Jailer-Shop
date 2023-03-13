import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent implements OnInit {
  productos: Producto[] = [];

  producto : Producto = {
    id: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }
  constructor(
    private productosService: ProductosService,
  ) { }

  ngOnInit(): void {
      this.productosService.getAllproductos()
      .subscribe(data => {
          this.productos = data;
      })
  }

}
