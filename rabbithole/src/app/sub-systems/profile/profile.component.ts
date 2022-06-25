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
  public successmsg: any;
  public errormsg: any;
  public email: any;
  disc = false;
  ryver = false;

  ngOnInit(): void {
    
    const userAuthObj = Auth.currentUserInfo().then((res) => {
      this.email = res.attributes.email;
      this.service.getUser(this.email).subscribe((res) => {
        this.userForm.patchValue({
          email:res.Item.email,
          useEmail:res.Item.emailPreference,
          useDiscord:res.Item.discordPreference,
          discordID:res.Item.discordID,
          useRyver:res.Item.ryverPreference,
          ryverID:res.Item.ryverForumID,
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


userUpdate(){
  /*if(this.userForm.valid)
  {
    this.service.updateUser(this.userForm.value,this.userForm.value.email).subscribe((res)=>{
      console.log(res, 'resupdated');
      this.successmsg = res.message;
    })
  }else{
    this.errormsg = 'All fields are required';
  }
}*/

if((this.userForm.value.useDiscord==true && this.userForm.value.discordID != "") && (this.userForm.value.useRyver==true && this.userForm.value.ryverID != "" )){
  this.service.updateUser(this.userForm.value,this.userForm.value.email).subscribe((res)=>{
    console.log(res, 'resupdated');
    this.successmsg = "Updated";
    this.errormsg =""
  })
}
else if(this.userForm.value.useRyver==false && this.userForm.value.useDiscord==false){
  this.service.updateUser(this.userForm.value,this.userForm.value.email).subscribe((res)=>{
    console.log(res, 'resupdated');
    this.successmsg = "Updated";
    this.errormsg =""
  })
}else if(this.userForm.value.useRyver==false && (this.userForm.value.useDiscord==true && this.userForm.value.discordID != "")){
  this.service.updateUser(this.userForm.value,this.userForm.value.email).subscribe((res)=>{
    console.log(res, 'resupdated');
    this.successmsg = "Updated";
    this.errormsg =""
  })
}else if(this.userForm.value.useDiscord==false && (this.userForm.value.useRyver==true && this.userForm.value.ryverID != "")){
  this.service.updateUser(this.userForm.value,this.userForm.value.email).subscribe((res)=>{
    console.log(res, 'resupdated');
    this.successmsg = "Updated";
  })
  this.errormsg =""
}
else{
  this.errormsg ="ID Fields are required"
  this.successmsg = "";
}
}
}
