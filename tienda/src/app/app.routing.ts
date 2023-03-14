import {ModuleWithProviders} from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { CrearProductoComponent } from './componentes/crear-producto/crear-producto.component';
import { ProductosComponent } from './componentes/productos/productos.component'; 
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { ActualizarUsuariosComponent } from './componentes/actualizar-usuarios/actualizar-usuarios.component';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { GuardRutasGuard } from './guard/guardsCanActivate/guard-rutas.guard';
import { NavAdmiComponent } from './componentes/navAdmin/nav-admi/nav-admi.component';
import { FacturaProveedorComponent } from './componentes/factura-proveedor/factura-proveedor.component';
import { HistorialProveedorComponent } from './componentes/historial-proveedor/historial-proveedor.component';
import { VerFacturaComponent } from './componentes/ver-factura/ver-factura.component';
import { HistorialClienteComponent } from "./componentes/historial-cliente/historial-cliente.component";
import { VerFacturaCComponent } from './componentes/ver-factura-c/ver-factura-c.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';

const appRoutes:Routes =[

    //rutas compartidas
    {path:'registro', component:RegistroComponent},
    {path:'login', component:LoginComponent },
    {path:'productos', component:ProductosComponent},
    {path:'carrito', component:CarritoComponent},
    {path:'nav', component:NavAdmiComponent},
    {path:'facturacliente',component:CarritoComponent},
    {path:'categoria/:id', component:CategoriaComponent},
    
    //rutas del aministrador
    {path:'proveedor', component:ProveedorComponent, data:{rol: ['1']}, canActivate: [GuardRutasGuard]},
    {path:'crear-producto', component:CrearProductoComponent, data:{rol: ['1']}, canActivate: [GuardRutasGuard]},
    {path:'facturaP',component:FacturaProveedorComponent},
    {path:'historial-factura',component:HistorialProveedorComponent},
    {path:'verfacturas/:id',component:VerFacturaComponent},
    {path:'facturasC',component:HistorialClienteComponent},
    {path:'verfacturasC/:id',component:VerFacturaCComponent},

    //rutas del usuario
    {path:'perfil-usuario', component:ActualizarUsuariosComponent, data:{rol: ['0']}, canActivate: [GuardRutasGuard]},
    

    //ruta por defecto
    {path:'**',pathMatch:'full',redirectTo:'productos'},

];

export const appRoutingProvider: any[]=[];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);