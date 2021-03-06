import { Injectable } from '@angular/core';
import { Auth, Amplify } from 'aws-amplify';
import { Subject } from 'rxjs';
import { UserApiService } from 'src/app/sub-systems/services/user-api.service';
import awsExports from '../../../../../aws-exports';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService:UserApiService) {
    Amplify.configure(awsExports);
   }

  async returnLoggedUserEmail(){
    let email:any;
    await Auth.currentUserInfo().then((res)=>{
      email = res.attributes.email;
    });
    return email;
  }
  
  async returnIsAdmin(){
    let isAdmin:any;
    let email = await this.returnLoggedUserEmail();
    await this.userService.getUser(email).then((res) => {
      isAdmin = res;
    });
    return isAdmin;
  }
}
