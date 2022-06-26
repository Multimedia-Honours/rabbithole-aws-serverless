import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-preferences-popup',
  templateUrl: './preferences-popup.component.html',
  styleUrls: ['./preferences-popup.component.scss'],
})
export class PreferencesPopupComponent implements OnInit {
  public e: any;
  disc = false;
  ryver = false;
  path: string = 'icons/ryver-icon.png';
  public errormsg:any;
  

  constructor(
    private service: UserApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    const userAuthObj = Auth.currentUserInfo().then((res) => {
      this.e = res.attributes.email;
    });
  }

  ngOnInit(): void {}

  prefForm = new FormGroup({
    emailPreference: new FormControl(false, Validators.required),
    discordPreference: new FormControl(false, Validators.required),
    discordID: new FormControl("", Validators.required),
    ryverPreference: new FormControl(false, Validators.required),
    ryverForumID: new FormControl("",Validators.required)
  });


  get ryverForumID() { return this.prefForm.get('ryverForumID'); }


  submitPreferences() {

    //had to code all edge cases to get validation correct headache could possibly be done another way
    if((this.prefForm.value.discordPreference==true && this.prefForm.value.discordID != "") && (this.prefForm.value.ryverPreference==true && this.prefForm.value.ryverForumID != "" )){
      console.log('submitting preferences');
      console.log(this.prefForm.value);
      this.service.insertUser(this.prefForm.value, this.e).subscribe((res) => {
      console.log(res);
      });
      this.dialog.closeAll();
    }
    else if(this.prefForm.value.ryverPreference==false && this.prefForm.value.discordPreference==false){
      console.log('submitting preferences');
      console.log(this.prefForm.value);
      this.service.insertUser(this.prefForm.value, this.e).subscribe((res) => {
      console.log(res);
      });
      this.dialog.closeAll();
    }else if(this.prefForm.value.ryverPreference==false && (this.prefForm.value.discordPreference==true && this.prefForm.value.discordID != "")){
      console.log('submitting preferences');
      console.log(this.prefForm.value);
      this.service.insertUser(this.prefForm.value, this.e).subscribe((res) => {
      console.log(res);
      });
      this.dialog.closeAll();
    }else if(this.prefForm.value.discordPreference==false && (this.prefForm.value.ryverPreference==true && this.prefForm.value.ryverForumID != "")){
      console.log('submitting preferences');
      console.log(this.prefForm.value);
      this.service.insertUser(this.prefForm.value, this.e).subscribe((res) => {
      console.log(res);
      });
      this.dialog.closeAll();
    }
    else{
      this.errormsg ="ID Fields are required"
    }
    
  }
}
