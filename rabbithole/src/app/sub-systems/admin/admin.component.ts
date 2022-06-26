import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewChild,ElementRef,ViewContainerRef} from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth, Amplify } from 'aws-amplify';
import { ChatServiceService } from 'src/app/sub-systems/chat/services/chat-service.service';




@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contacts:any = [];
  constructor(public authenticator: AuthenticatorService, private http: HttpClient) { }
  searchText!:string;
  currentUserEmail:string = "";

  @ViewChild('contactBox') contactBox!:ElementRef;

  ngOnInit(): void {
    this.searchText = "";


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

    }



}
