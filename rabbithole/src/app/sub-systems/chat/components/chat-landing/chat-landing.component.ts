import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ChatServiceService } from 'src/app/services/chat-service.service';
// import { FormsModule } from '@angular/forms';
// import Amplify from 'aws-amplify';
import { Auth, Amplify } from 'aws-amplify';


import awsExports from '../../../../../aws-exports';
import { ViewChild} from '@angular/core';
import { Console } from 'console';

@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss']
})
export class ChatLandingComponent implements OnInit {
  @ViewChild('receiverName') receiverName:any;
  @ViewChild('messageTextbox') textMessage:any;
  constructor(public authenticator: AuthenticatorService, public CS:ChatServiceService) {
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


  recolorInput(x : any): void {
    console.log(x);
    // x.style.color = "#EDEDED";
}
  
  //onButtonClick event, call chat service
  messageClickEvent (messageSearchInput:string, messageTextbox:string)
  {
    //check receiving user's communication preferences 
    

    this.CS.RyverMessage(messageTextbox);
    this.receiverName.nativeElement.value = '';
    this.textMessage.nativeElement.value = '';
    
    //this.CS.EmailMessage();
  }


}
