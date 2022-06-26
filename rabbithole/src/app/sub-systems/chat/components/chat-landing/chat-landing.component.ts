import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { ChatServiceService } from 'src/app/sub-systems/chat/services/chat-service.service';
import { FormsModule } from '@angular/forms';
// import Amplify from 'aws-amplify';
import { Auth, Amplify } from 'aws-amplify';
import awsExports from '../../../../../aws-exports';
import { ViewChild,ElementRef,ViewContainerRef} from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Console } from 'console';
import { MessageBoxComponent } from '../message-box/message-box/message-box.component';
import { NativeDateModule } from '@angular/material/core';
import { FilterPipe } from '../../pipes/filter.pipe';


@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss']
})
export class ChatLandingComponent implements OnInit {
  contacts:any = [];
  messages:any = [];
  activeRecipient: string = '';
  currentUserEmail:string = "";
  searchText!:string;

  @ViewChild('contactBox') contactBox!:ElementRef;
  @ViewChild('messageContainer') appendMessage!:ElementRef;
  @ViewChild('receiverName') receiverName:any;
  @ViewChild('messageTextbox') textMessage:any;
  htmlToAdd!: string;
  
  constructor(public authenticator: AuthenticatorService, public CS:ChatServiceService, private http: HttpClient) {
    Amplify.configure(awsExports);
    

  }
  contactSelected: boolean = false;

  ngOnInit():void 
  {
    this.searchText = "";
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

    const emailObj = Auth.currentUserInfo().then((data) => {
      this.currentUserEmail = data.attributes.email;
    });
  }


  changeDisplayedUser(value:any)
  {

    this.messages = []

    this.CS.getUserMessages(value,this.currentUserEmail).subscribe(
      data => {
        data.map(
          (message:any) => 
          {
          
            this.messages.push(message);
          }
        );
        console.log(this.messages);
      });
      this.activeRecipient = value;



  }
 

  async messageClickEvent (messageSearchInput:any, messageBody:string)
  {
    //check receiving user's communication preferences 

    //here we need to generate the component using active recipient, message and timestamp

    const current = new Date();
    const timestamp = current.toLocaleString();
    console.log(timestamp);
    console.log(this.activeRecipient);
    console.log(messageBody);

    

    this.CS.sendMessage(this.currentUserEmail, this.activeRecipient, timestamp, messageBody);
    let response = await this.CS.getUserPreferences(this.activeRecipient);
    
    response.subscribe(async (data) => {
      if(data.discordPreference)
      {
        let discordID = data.discordID;
        console.log(discordID);
        console.log("-------------------------")
        await this.CS.discordMessage(messageBody,discordID);
      }
      if(data.ryverPreference)
      {
        let ryverID = data.ryverForumID;
        this.CS.RyverMessage(messageBody);
      }
      if (data.emailPreference)
      {
        let email = data.email;
        await this.CS.EmailMessage(email, messageBody)
      }

      const contactsArray = this.contactBox.nativeElement.children;

      console.log(contactsArray);
      console.log("---------------------------")
  
      for (let item of contactsArray) {
        if (item.getAttribute("id") == this.activeRecipient) 
        {
            item.dispatchEvent(new Event('click'));
        }
  
    }

    })



    this.receiverName.nativeElement.value = '';
    this.textMessage.nativeElement.value = '';
  }





}
