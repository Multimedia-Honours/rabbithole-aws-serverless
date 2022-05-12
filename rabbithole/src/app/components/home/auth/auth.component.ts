import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';

import awsExports from '../../../../aws-exports';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) { 
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
  }

}
