import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../../../../aws-exports';
@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChathomeComponent implements OnInit {

  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
  

  ngOnInit(): void {
  }

}
