import { Component } from '@angular/core';
import { Producto } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  imgUrl = '';
  estadoImg = true;

  EstadoImg(){
    this.estadoImg = !this.estadoImg
  }
}
