import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import jtw_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { datosUsuario } from 'src/app/models/task';



@Component({
  selector: 'app-actualizar-usuarios',
  templateUrl: './actualizar-usuarios.component.html',
  styleUrls: ['./actualizar-usuarios.component.css']
})
export class ActualizarUsuariosComponent implements OnInit {
  

  constructor(
    private taskservice : TaskService,
    ) { }
  id:any
  user: datosUsuario[]=[]
  value:any;

  ngOnInit(): void {
    let datoToken: any = localStorage.getItem('token');
    let iduser: any = jtw_decode(datoToken)
    this.id = parseInt(iduser.id)
    this.taskservice.actualizarUsuario(this.id)
    .subscribe(data => {
      this.user = data
        this.formulario.setValue({
          nombre: this.user[0].nombre,
          correo: this.user[0].correo,
          ciudad: this.user[0].ciudad,
          direccion: this.user[0].direccion,
          telefono: this.user[0].telefono,
          file: this.user[0].foto,
          fileSource: this.user[0].foto
        })
        this.value = this.user[0].foto
    },error =>{
      alert("Ocurrio un Error por favor Verificar los Campos");
    }); 
  }

  formulario = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  actualizarUser(form:any){
    const formData = new FormData()
    const file = this.formulario.get('fileSource')
    formData.append('nombre',this.formulario.get('nombre')?.value || '');
    formData.append('correo',this.formulario.get('correo')?.value || '');
    formData.append('ciudad', this.formulario.get('ciudad')?.value || '');
    formData.append('direccion', this.formulario.get('direccion')?.value || '');
    formData.append('telefono', this.formulario.get('telefono')?.value || '');
    formData.append('file', file?.value || '');
    this.taskservice.actualizar(formData,this.id).subscribe(data =>{
      console.log(data)
    })
    
    this.ngOnInit()
  }



  imagenFile(event:any){

    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.formulario.patchValue({
        fileSource: file
      })
    }
  }

  eliminar():void{

    this.taskservice.elimnar(this.id).subscribe(data =>{
      localStorage.clear()
      console.log('elimidado', this.id)
    })
  }
}


