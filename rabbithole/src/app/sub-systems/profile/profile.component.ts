import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { UserApiService } from './services/user-api.service';
import {Auth} from 'aws-amplify';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private service:UserApiService, public authenticator: AuthenticatorService) { }

  public email: any;

  ngOnInit(): void {
    const userAuthObj = Auth.currentUserInfo().then((res) => {
      this.email = res.attributes.email;
      this.service.getUser(this.email).subscribe((res) => {
        console.log(res.Item);
        this.userForm.patchValue({
          email:res.Item.email,
          useDiscord:res.Item.discordPreference,
          discordID:res.Item.discordID,
          useRyver:res.Item.ryverPreference,
          ryverForumID:res.Item.ryverForumID,
        })
        
      });
    });

     
  }


  userForm = new FormGroup({
    'email':new FormControl('',Validators.required),
    'useEmail':new FormControl(false,Validators.required),
    'useDiscord':new FormControl(false,Validators.required),
    'discordID':new FormControl('',Validators.required),
    'useRyver':new FormControl(false,Validators.required),
    'ryverID':new FormControl('',Validators.required),
});

}
