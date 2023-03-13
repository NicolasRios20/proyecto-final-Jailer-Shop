import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import jtw_decode from "jwt-decode";
import { ProductosService } from 'src/app/services/productos.service';
import { SrviciosService } from 'src/app/services/srvicios.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  usuario: 0 = 0;
  myShoppingCart: Producto[] = [];
  total=0;
  productos: Producto[] = [];
  producto : any = [];

  
  constructor(
    private srviciosService: SrviciosService,
    private productosService: ProductosService,
    ) { 
    this.myShoppingCart = this.srviciosService.getMyShoppingCart();
   }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      let datoToken: any = localStorage.getItem('token');
      let iduser: any = jtw_decode(datoToken)
      this.usuario = iduser.rol;
    }else{
      this.usuario = 0;
    }

    this.productosService.getAllproductos()
    .subscribe(data => {
        this.productos = data.reverse();
    });
 
  }

  onAddToShoppingCart(produtos:Producto){
    this.producto = produtos
    let produc: any
    
    if (!localStorage.getItem('productos')) {
      localStorage.setItem('productos',JSON.stringify([]))
      this.srviciosService.addProductos(this.producto)
    }else{
      produc = localStorage.getItem('productos')
      const productosGuardados = JSON.parse(produc);
      const productoExistente = productosGuardados.find((producto: any) => producto.id_producto === this.producto.id_producto);
      if (productoExistente) {
        console.log("El producto ya existe en el carrito");
      } else {
        productosGuardados.push(this.producto);
        localStorage.setItem('productos', JSON.stringify(productosGuardados));
        console.log("Se agregó el producto al carrito");
      }
    }
    
  }
}
//this.total = this.srviciosService.getTotal();
        