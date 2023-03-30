import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.model';
import jtw_decode from "jwt-decode";
import { ProductosService } from 'src/app/services/productos.service';
import { SrviciosService } from 'src/app/services/srvicios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  myShoppingCart: Producto[] = [];
  productos: Producto[] = [];
  producto : any = [];
  usuario: 0 = 0;
  total=0;

  //para el detalle del producto
  produc : any = {
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
      this.agregar()
    }else{
      produc = localStorage.getItem('productos')
      const productosGuardados = JSON.parse(produc);
      const productoExistente = productosGuardados.find((producto: any) => producto.id_producto === this.producto.id_producto);
      if (productoExistente) {
        console.log("El producto ya existe en el carrito");
        this.yaExiste()
      } else {
        productosGuardados.push(this.producto);
        localStorage.setItem('productos', JSON.stringify(productosGuardados));
        this.agregar()

      }
    }
    
  }

  detalleProducto(id: string){
    this.productosService.getProducto(id)
    .subscribe(data =>{
      this.produc = data
      console.log(this.produc.nombre_producto);
    })
  }

  yaExiste(){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'El producto ya se ecuentra en el carrito de compras',
      showConfirmButton: false,
      timer: 1500
    })
  }
  agregar(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agrego al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }
}

        