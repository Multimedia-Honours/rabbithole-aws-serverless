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
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';
import { UserApiService } from '../../../profile/services/user-api.service';


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
  public loadingMessage:boolean = false;

  @ViewChild('contactBox') contactBox!:ElementRef;
  @ViewChild('messageContainer') appendMessage!:ElementRef;
  @ViewChild('receiverName') receiverName:any;
  @ViewChild('messageTextbox') textMessage:any;
  htmlToAdd!: string;
  
  constructor(public authenticator: AuthenticatorService, public CS:ChatServiceService, private http: HttpClient,private service: UserApiService,public dialog: MatDialog) {
    Amplify.configure(awsExports);
    

  }
  contactSelected: boolean = false;
  public newUser = false;
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
      console.log(email);
      this.service.getUser(email).subscribe((res) => {
        console.log(res);
        if (!res.Item) {
          this.newUser = true;
          console.log('user does not exist, adding to database');
          /*this.service.insertUser(email).subscribe((res)=>{
            console.log(res);
          })*/
          this.openDialog();
        } else {
          console.log('User exists within db');
          this.newUser = false;
        }
        console.log(this.newUser);
      });
    });


    const emailObj = Auth.currentUserInfo().then((data) => {
      this.currentUserEmail = data.attributes.email;
      this.CS.getAllUsers(this.currentUserEmail).subscribe(
        data => {
          // this.contacts = data;
          data.map(
            (contact: any) => {
              this.contacts.push(contact);
            }
          )
        }
      );
    });

      
          
        console.log(this.contacts);
    


  }

  openDialog() {
    this.dialog.open(PreferencesPopupComponent,  {
      panelClass: 'custom-modalbox',
      disableClose: true 
    });
    console.log('test');
  }

  async changeDisplayedUser(value:any)
  {
    
    this.messages = [];
    // this.messages.push('');
    (await this.CS.getUserMessages(value, this.currentUserEmail)).subscribe(
      (data: any[]) => {
        data.map(
          (message:any) => 
          {
            this.loadingMessage = true;
            setTimeout(async () =>{
            this.messages.push(message);
            this.loadingMessage = false;
            
            }, 1000);
            // console.log("doos");
          }
        );
        console.log(this.messages);
      });
      this.activeRecipient = value;
      this.loadingMessage = false;

      const contactsArray = this.contactBox.nativeElement.children;

      // console.log(contactsArray);
      console.log("---------------------------")
  
      for (let item of contactsArray) 
      {
        if (item.getAttribute("id") == this.activeRecipient) 
        {
          //still working on this
        }
      }


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
        await this.CS.discordMessage(messageBody,discordID, this.currentUserEmail);
      }
      if(data.ryverPreference)
      {
        let ryverID = data.ryverForumID;
        this.CS.RyverMessage(messageBody, this.currentUserEmail);
      }
      if (data.emailPreference)
      {
        let email = data.email;
        await this.CS.EmailMessage(email, messageBody, this.currentUserEmail)
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
