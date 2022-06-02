import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../../../../aws-exports';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  animations: [
    trigger('authTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style(
            { opacity: 1 }
          )
        ),
      ])
  ]),]
})
export class LandingpageComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {
  }

}
