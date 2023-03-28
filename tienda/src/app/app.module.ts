import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SwiperModule } from 'swiper/angular';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { ImgComponent } from './componentes/img/img.component';
import { ProductoComponent } from './componentes/components/producto/producto.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { NavComponent } from './componentes/nav/nav.component';
import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { appRoutingProvider, routing } from './app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { ImgCarritoComponent } from '../app/componentes/imgcarrito/imgcarrito.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ActualizarUsuariosComponent } from './componentes/actualizar-usuarios/actualizar-usuarios.component';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { InterceptorService } from './interceptors/interceptor.service';
import { FacturaProveedorComponent } from './componentes/factura-proveedor/factura-proveedor.component';
import { NavAdmiComponent } from './componentes/navAdmin/nav-admi/nav-admi.component';
import { HistorialProveedorComponent } from './componentes/historial-proveedor/historial-proveedor.component';
import { VerFacturaComponent } from './componentes/ver-factura/ver-factura.component';
import { HistorialClienteComponent } from './componentes/historial-cliente/historial-cliente.component';
import { VerFacturaCComponent } from './componentes/ver-factura-c/ver-factura-c.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { DetalleProductoComponent } from './componentes/detalle-producto/detalle-producto.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';




@NgModule({
  declarations: [
    AppComponent,
    ImgComponent,
    ProductoComponent,
    ProductosComponent,
    NavComponent,
    CrearProductoComponent,
    CarritoComponent,
    RegistroComponent,
    LoginComponent,
    ImgCarritoComponent,
    CarruselComponent,
    FooterComponent,
    ActualizarUsuariosComponent,
    ProveedorComponent,
    FacturaProveedorComponent,
    NavAdmiComponent,
    HistorialProveedorComponent,
    VerFacturaComponent,
    HistorialClienteComponent,
    VerFacturaCComponent,
    CategoriaComponent,
    DetalleProductoComponent,
    RecuperarContrasenaComponent,
    NosotrosComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
  ],
  providers: [appRoutingProvider,
    {provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
