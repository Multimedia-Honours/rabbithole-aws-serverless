import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {this.LogUser() }

  async LogUser(){
    try{
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();
      const email =  await Auth.currentUserInfo();
      cognitoUser.refreshSession(currentSession.getRefreshToken(), ( err: any, session: any) => {
        console.log('session', err, session);
        const { idToken, refreshToken, accessToken } = session;
         console.log(email.attributes.email);               
      });
    } catch (authError) {
      console.log('Unable to refresh Token', authError);
      console.log(Auth.currentUserInfo);
    }
  }  

  ngOnInit(): void {
  }

}
