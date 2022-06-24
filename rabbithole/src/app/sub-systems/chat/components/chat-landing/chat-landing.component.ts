import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import { UserApiService } from '../../../profile/services/user-api.service';
import { Auth } from 'aws-amplify';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesPopupComponent } from '../preferences-popup/preferences-popup.component';

import awsExports from '../../../../../aws-exports';

@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss'],
})
export class ChatLandingComponent implements OnInit {
  constructor(
    public authenticator: AuthenticatorService,
    private service: UserApiService,
    public dialog: MatDialog
  ) {
    Amplify.configure(awsExports);
  }
  public newUser = false;
  ngOnInit(): void {
    console.log('enetered init');
    let email: any;
    const userAuthObj = Auth.currentUserInfo().then((res) => {
      email = res.attributes.email;
      /*  const domain = email.substring(email.indexOf('@') + 1);
      console.log(domain);
      if(domain != 'tuks.co.za' && domain != 'retrorabbit.co.za' ){
        alert('You need to be a registered \n employee of Retro Rabbit to continue');
        this.authenticator.signOut();
      }*/
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
  }

  openDialog() {
    this.dialog.open(PreferencesPopupComponent,  {
      panelClass: 'custom-modalbox',
      disableClose: true 
    });
    console.log('test');
  }
}
