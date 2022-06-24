import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../../services/user-api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
    emailPreference: new FormControl(false),
    discordPreference: new FormControl(false),
    discordID: new FormControl(''),
    ryverPreference: new FormControl(false),
    ryverForumID: new FormControl(''),
  });

  submitPreferences() {
    console.log('subitting preferences');
    console.log(this.prefForm.value);
    this.service.insertUser(this.prefForm.value, this.e).subscribe((res) => {
      console.log(res);
    });
    this.dialog.closeAll();
  }
}
