import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../aws-exports';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rabbithole';
  public show:boolean = false;
  public buttonName:any = 'Show';

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
  
  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
  }
}
