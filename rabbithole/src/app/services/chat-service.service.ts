import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async } from '@angular/core/testing';
import awsmobile from 'src/aws-exports';
const AWS = require("aws-sdk")
// import { SES } from 'aws-sdk';

import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { environment } from '../../environments/environment';


const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment.ACCESS_KEY, 
  secretAccessKey: environment.SECRET_ACCESS_KEY
};

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor(private http: HttpClient) {}
  
  //Discord

  //Ryver

  public RyverMessage(messageTextbox:string)
  {
    console.log(messageTextbox)
    //replace displayName with our Username

    const data = JSON.stringify({
      createSource: {
          "avatar": "https://i.imgur.com/vEf9Aaf.png",
          "displayName": "Rabbithole"
        },
        body: messageTextbox
    });

  //add user name with '@' before message to send message to that person

      const options = {
      hostname: 'reinhard.ryver.com',
      path: '/api/1/odata.svc/forums(1560158)/Chat.PostMessage()',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer'
      }
    };

    console.log(options)

    const headers = { 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${environment.RYVER_API_KEY}` };

    try{
    this.http.post<any>('https://reinhard.ryver.com/api/1/odata.svc/forums(1560158)/Chat.PostMessage()', data, {headers}).subscribe(
      data => {
          console.log("POST Request is successful ", data);
      }
    )}
      catch(error)
      {
        console.log("Error", error);
      }

  }

  //Email
  public EmailMessage()
  {
    // const SESconfig = {
    //   //access
    //   //secret
    //   //region
    // }

    // var params = {
    //   Source: 'no-reply@t.zulier.com',
    //   Destination:
    //   {
    //     ToAddresses: [
    //       'stopie414@gmail.com'
    //     ]
    //   },
    //   Message:{
    //     Body:{
    //       Html: {
    //         Charset: "UTF-8",
    //         Data: 'It is working'
    //       }
    //     },
    //     Subject:{
    //       Charset: 'UTF-8',
    //       Data: 'This is a test'
    //     }
    //   }
    // };

    // new AWS.SES(SESconfig).sendEmail(params).promise().then((res:any) => {
    //   console.log(res);
    // })

  }
    
}

