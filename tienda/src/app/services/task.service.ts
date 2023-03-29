import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginI } from '../models/login.interface';





import { datosUsuario, Task } from '../models/task';
import { UrlHandlingStrategy } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
   api = '/api/users/';


  constructor(
    private http: HttpClient
  ) { }
  
  loginByEmail(form: LoginI){
    return this.http.post<LoginI>(`${this.api}email/`,form);
  }

  getAllTasks(){
    return this.http.get(this.api);
  }

  getTask(cc: any){
    const path = `${this.api}${cc}`;
    return this.http.get<datosUsuario[]>(path);
  }

  crearUsuario(task: Task){
    const path = `${this.api}`;
    return this.http.post(path, task);
  }
  actualizarUsuario(id: any){
    const token = localStorage.getItem('token')
    return this.http.get<[datosUsuario]>(`${this.api}${id}`);
  }

  actualizar(form: any, id:any){
    const path = `${this.api}${id}`
    const token = localStorage.getItem('token')
    return this.http.put<datosUsuario>(path,form)
  }

  elimnar(id: any){
    localStorage.clear()
    return this.http.delete(`${this.api}${id}`);
  }
  
}
