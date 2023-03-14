import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SrviciosService } from 'src/app/services/srvicios.service';
import { CategoriasService } from '../../services/categorias.service';
import { Producto } from '../../models/product.model';
import jtw_decode from "jwt-decode";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  id: any;
  categoria: Producto[] = [];
  producto : any = [];
  usuario: 0 = 0;
  constructor(
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private srviciosService: SrviciosService,

  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      let datoToken: any = localStorage.getItem('token');
      let iduser: any = jtw_decode(datoToken)
      this.usuario = iduser.rol;
    }else{
      this.usuario = 0;
    }

    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.categoria = []
      this.getCategoria(this.id)
    })
  }

  getCategoria(id: any){
    this.categoriasService.getCategoria(id)
    .subscribe(data => {
        this.categoria = data;
        console.log(this.categoria); 
    })

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
