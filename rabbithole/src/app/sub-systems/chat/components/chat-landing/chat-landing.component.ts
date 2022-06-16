import { Component, OnInit } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';

import awsExports from '../../../../../aws-exports';

@Component({
  selector: 'app-chat-landing',
  templateUrl: './chat-landing.component.html',
  styleUrls: ['./chat-landing.component.scss']
})
export class ChatLandingComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
  }

}
