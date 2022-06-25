import { Injectable } from '@angular/core';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../../../../../aws-exports';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    Amplify.configure(awsExports);
   }

  async returnLoggedUserEmail(){
    let email:any;
    await Auth.currentUserInfo().then((res)=>{
      email = res.attributes.email;
    });
    return email;
  }
}
