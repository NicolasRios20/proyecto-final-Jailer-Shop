import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jtw_decode from "jwt-decode";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardRutasGuard implements CanActivate{
    
  constructor(
    private route: Router,
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkuserLogin(route);
  }


  checkuserLogin(route:ActivatedRouteSnapshot): boolean{
    let datoToken: any = localStorage.getItem('token');
    let iduser: any = jtw_decode(datoToken)
    if(route.data['rol'] == iduser.rol ){
      return true
    }else{
      this.route.navigate(['/producto']);
      return false;
    }
  }

}




