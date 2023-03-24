import { Component, OnInit } from '@angular/core';
import { SrviciosService } from '../../services/srvicios.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import jtw_decode from "jwt-decode";
import { FacturaclienteService } from 'src/app/services/facturacliente.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  nFactura = 0;
  cantidadp = 0;
  myShoppingCart: any;
  datosTabla: any = []
  cantidad = 1;
  precio = 0;
  subtotal = 0;
  productos: any [] = []
  remisiones: any [] = []
  total = 0;
  sub = 0;
  

  constructor(
    private srviciosService: SrviciosService,private route: Router,private location: Location, private facturacliente: FacturaclienteService){ }

  ngOnInit(): void { 
    this.facturacliente.numeroFactura().subscribe(data => {
      this.nFactura = data + 1
      console.log(this.nFactura)
    })  
    const producto = localStorage.getItem('productos');
    if (producto !== null) {
      this.productos = JSON.parse(producto);
    } else {
      this.productos = [];
    }
    
    for (let i = 0; i < this.productos.length; i++) {
      this.subtotal = 0;
      const nuevaFila = {
        columna1: this.productos[i].id_producto,
        columna2 : this.productos[i].nombre_producto,
        columna3: this.cantidad,
        columna4: this.productos[i].precio_producto,
        columna5: this.subtotal += this.productos[i].precio_producto * this.cantidad,  
        columna6: this.productos[i].imagen,
      }
      this.datosTabla.push(nuevaFila);
      this.total += this.subtotal
    }
  }
    
  eliminar() {
    localStorage.clear();
    
  }
    
  incrementarCantidad(index: number) {
    this.cantidadp = this.productos[index].cantidad
    if (this.cantidadp == this.datosTabla[index].columna3) {
      this.agotado();
    } else {
      this.datosTabla[index].columna3++;
      const nuevaSuma = this.datosTabla[index].columna4 * this.datosTabla[index].columna3;
      this.datosTabla[index].columna5 = nuevaSuma;
      this.subtotal = this.datosTabla.reduce((acumulador: any, elemento: any) => acumulador + elemento.columna5, 0);
      this.total = this.subtotal;
      console.log(this.total); 
      
    }

  }
    
  decrementarCantidad(index: number) {
    if (this.datosTabla[index].columna3 == 1) {
      
    } else {
      this.datosTabla[index].columna3--;
      const nuevaSuma = this.datosTabla[index].columna4 * this.datosTabla[index].columna3;
      this.datosTabla[index].columna5 = nuevaSuma;
      this.subtotal = this.datosTabla.reduce((acumulador: any, elemento: any) => acumulador + elemento.columna5, 0);
      this.total = this.subtotal;
    }
  }

  eliminarCantidad(id: any){
    console.log(id)
    let produc: any
    produc = localStorage.getItem('productos')
    this.productos = JSON.parse(produc);
    for (let i = 0; i < this.productos.length; i++) {
      // Comparar el ID del producto actual con el ID a eliminar
      if (this.productos[i].id_producto === id) {
          // Eliminar el producto del arreglo
          //this.productos.splice(i, 1);
          console.log(this.productos.splice(i, 1), "hola")
      }
      console.log(this.productos, 'hola')
      let produ: any = this.productos
      localStorage.removeItem('productos')
      localStorage.setItem('productos',JSON.stringify(produ))
      location.reload();
    }
  }

  vaciarCarrito(){
    localStorage.removeItem('productos')
    location.reload();
  }

  comprar(){
    for (let i = 0; i < this.datosTabla.length; i++) {
      const producto = {
          cantidad: this.datosTabla[i].columna3,
          valor_total: this.datosTabla[i].columna5,
          no_venta: this.nFactura,
          id_producto : this.datosTabla[i].columna1,
          
      }
      this.remisiones.push(producto);
    }
    console.log(this.datosTabla)
    let datoToken: any = localStorage.getItem('token');
    let id: any = jtw_decode(datoToken)
    console.log("hola")
    const encabezado = {
      id_cliente: id.id,
      valor_total: this.total,
      no_venta: this.nFactura,
      produc: this.remisiones
      }
    console.log(encabezado.produc,"hola")
    this.facturacliente.guardarFactura(encabezado)
    .subscribe((data)=>{
      console.log(data);
    },error =>{
      console.log(error);
    }
    )}


  agotado(){
    Swal.fire({
      title: 'Stock Insuficiente ',
      icon: 'warning',
      showCloseButton: true,
    })
  }
  


}
