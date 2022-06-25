import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { UserApiService } from './user-api.service';
import { Auth } from 'aws-amplify';
import { AuthService } from '../home/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public email: any;
  public admin: boolean = true;

  constructor(private auth:AuthService, private authService: AuthGuardService,private router: Router, private service:UserApiService) {
    let user:any;
    
  }

  
   async canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Promise<boolean>{
    // return true if you want to navigate, otherwise return false

    let email = await this.auth.returnLoggedUserEmail();
    console.log(email);
    let admin = await this.auth.returnIsAdmin();
    return admin.Item.isAdmin;
   }
}
