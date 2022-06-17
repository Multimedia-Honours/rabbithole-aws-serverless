import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth, Amplify } from 'aws-amplify';


import awsExports from '../../../../../aws-exports';

@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss']
})
export class ChatLandingComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
    console.log('enetered init');
    let email:any;
    const userAuthObj =  Auth.currentUserInfo().then((res)=>{
      email = res.attributes.email;
      const domain = email.substring(email.indexOf('@') + 1);
      console.log(domain);
      if(domain != 'tuks.co.za' && domain != 'retrorabbit.co.za' ){
        alert('You need to be a registered \n employee of Retro Rabbit to continue');
        this.authenticator.signOut();
      }

    });
  }

}
