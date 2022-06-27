import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { UserApiService } from './user-api.service';
import { Auth } from 'aws-amplify';
import { AuthService } from '../home/auth/services/auth.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public email: any;
  public admin: boolean = true;

  constructor(public model: MatDialog, private auth:AuthService, private authService: AuthGuardService,private router: Router, private service:UserApiService) {
    let user:any;
    
  }

  
   async canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Promise<boolean>{
    // return true if you want to navigate, otherwise return false

    let email = await this.auth.returnLoggedUserEmail();
    let admin = await this.auth.returnIsAdmin();

    if(admin.Item.isAdmin){
      return true;
    }else{
      console.log(admin.Item.isAdmin);
      let modelRef = this.model.open(AccessDeniedComponent,{
        width: '250px'
      });
  
      modelRef.afterClosed().subscribe((result: string) => {
        if(result == "close"){
         return false;
        }
        return false;
      });
    }

    return false;
  }
}
