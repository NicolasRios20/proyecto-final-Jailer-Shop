import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/product.model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categorias.interface';


@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productos: Producto[] = [];
  categoria: Categoria[] = [];
  valorId_categoria: any;
  producCreat: Producto = {
    id: '',
    nombre_producto: '',
    cantidad: 0,
    id_categoria: 0,
    precio_producto: 0,
    descripcion: '',
    imagen:'',
  }


  formulario = new FormGroup({
    nombre_producto: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    precio_producto: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    id_categoria:new FormControl('',[Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  
  
  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService
    ) {};

  ngOnInit(): void {
    this.categoriasService.getAll()
    .subscribe(data => {
        this.categoria = data;
    })
  };

  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
        this.formulario.patchValue({
        fileSource: file
      });
    }
  }

  idCatecoria(event:any){
    let id = event.target.value;
    if(id < 0 ){
      id=0;
      alert("La categoria no existe");
    }else{
      let a = this.categoria.filter(function(a) {
        return a.nombre_categoria == id ;
      });
      
      for (let index = 0; index < a.length; index++) {
        let element = a[index];
        this.valorId_categoria = element.id_categoria;
      }
    }

  }

  limpiarCampos(){
    this.formulario.reset();
    this.valorId_categoria = 0;
    this.producCreat.imagen = "";
    this.producCreat.nombre_producto = "";
    this.producCreat.precio_producto = 0;
    this.producCreat.descripcion = "";
  }

  crearProducto(form: any){
    const formData = new FormData();
    const file = this.formulario.get('fileSource');
    
    formData.append('file', file?.value || '');
    formData.append('cantidad', this.formulario.get('cantidad')?.value || '');
    formData.append('nombre_producto', this.formulario.get('nombre_producto')?.value || '');
    formData.append('id_categoria', this.valorId_categoria);
    formData.append('descripcion', this.formulario.get('descripcion')?.value || '');
    formData.append('precio_producto', this.formulario.get('precio_producto')?.value || '');
    this.productosService.create(formData)
    .subscribe(data => {
      this.producCreat = data
      this.productos.unshift(data);
      alert("Registro Exitoso");
    },error =>{
      
      alert("Ocurrio un Error por favor Verificar los Campos");
    });
    

  }

}
