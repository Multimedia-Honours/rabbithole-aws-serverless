import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
  
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';

// var deployment = "https://rabbithole-aws.shop/";
// var development = "http://localhost:4200/";

// awsconfig.oauth.redirectSignIn = deployment+"/chat/";
// awsconfig.oauth.redirectSignOut = deployment;

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
