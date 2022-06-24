import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ChatServiceService } from 'src/app/sub-systems/chat/services/chat-service.service';
// import { FormsModule } from '@angular/forms';
// import Amplify from 'aws-amplify';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../../../../../aws-exports';
import { ViewChild,ElementRef,ViewContainerRef} from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Console } from 'console';
import { MessageBoxComponent } from '../message-box/message-box/message-box.component';


@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss']
})
export class ChatLandingComponent implements OnInit {
  contacts:any = [];
  messages:any = [];
  // @ViewChild('container', { read: ViewContainerRef }) template!: ElementRef;
  // contentElement!: ViewContainerRef;
  @ViewChild('receiverName') receiverName:any;
  @ViewChild('messageTextbox') textMessage:any;
  
  constructor(public authenticator: AuthenticatorService, public CS:ChatServiceService, private http: HttpClient) {
    Amplify.configure(awsExports);

  }
  contactSelected: boolean = false;

  ngOnInit():void 
  {
    console.log('entered init');
    let email:any;
    const userAuthObj =  Auth.currentUserInfo().then((res)=>{
      email = res.attributes.email;
      const domain = email.substring(email.indexOf('@') + 1);
      console.log(domain);
      if(domain != 'tuks.co.za' && domain != 'retrorabbit.co.za' ){
        alert('You need to be a registered \n employee of Retro Rabbit to continue');
        this.authenticator.signOut();
      }

      this.CS.getAllUsers().subscribe(
        data => {
          // this.contacts = data;
          data.map(
            (contact: any) => {
              this.contacts.push(contact);
            }
          )
        }
      );
          
        console.log(this.contacts);
    });
  }


  changeDisplayedUser(value:any)
  {
    this.CS.getUserMessages(value)
  }
 

  messageClickEvent (messageSearchInput:string, messageTextbox:string)
  {
    //check receiving user's communication preferences 

    //here we need to generate the component
    
    this.CS.generateMessageBox(messageTextbox)

    // this.CS.RyverMessage(messageTextbox);
    // this.CS.discordMessage(messageTextbox);
    // this.CS.EmailMessage();

    this.receiverName.nativeElement.value = '';
    this.textMessage.nativeElement.value = '';
  }





}
