import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async } from '@angular/core/testing';
import awsmobile from 'src/aws-exports';

// import { Client, Intents } from "discord.js";

// const {Client, Intents} = require('discord.js')
//intents giving GROOT problems
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES] });

const AWS = require("aws-sdk")

// import { SES } from 'aws-sdk';

import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs';


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
  


  public getAllUsers()
  {
    const URL = "https://em8tzstb7h.execute-api.us-east-1.amazonaws.com/staging/users"  
    var subject = new Subject<any>();

    this.http.get<any>(URL).subscribe(
      data => {
        let contacts = [];
        contacts = data.Items;
        subject.next(contacts);
      }
    );
    return subject.asObservable();
    
  }

  public getUserMessages(value:any)
  {
      console.log(value)
      //get function to users API, using user ID

      const URL = "https://gl48wrap21.execute-api.us-east-1.amazonaws.com/staging"
  }

  public generateMessageBox(messageTextbox:string)
  {
    console.log("THIS IS A TEST");
    // message = messageTextbox
  }


  //Discord
  public async discordMessage(messageTextbox:string)
  {

    const headers = { 
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8', 
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Credentials':'true',
      'responseType': 'text'
      }
    const URL = "http://52.91.52.167:3000/sendDM"  

    var content = {
      "message": messageTextbox,
      "id": "348509535683739652"
    }
    
    this.http.post<any>("http://52.91.52.167:3000/sendDM", `message=${messageTextbox}&id=348509535683739652` , {headers}, ).subscribe(
      data => {
          console.log("POST Request is successful ", data);
      }  )  
          
  }
  
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
    const SESconfig = {
      accessKeyId: environment.ACCESS_KEY, 
      secretAccessKey: environment.SECRET_ACCESS_KEY,
      region: REGION
    }

    var params = {
      Source: 'u19014610@tuks.co.za',
      Destination:
      {
        ToAddresses: [
          'u19014610@tuks.co.za'
        ]
      },
      Message:{
        Body:{
          Html: {
            Charset: "UTF-8",
            Data: 'It is working'
          }
        },
        Subject:{
          Charset: 'UTF-8',
          Data: 'This is a test'
        }
      }
    };

    new AWS.SES(SESconfig).sendEmail(params).promise().then((res:any) => {
      console.log(res);
    })
  }  





}
    


