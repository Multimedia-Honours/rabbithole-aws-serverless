import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../aws-exports';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rabbithole';

  constructor(public authenticator: AuthenticatorService , private router: Router) {
    Amplify.configure(awsExports);
    
  }
  
  ngOnInit () {  }
}
