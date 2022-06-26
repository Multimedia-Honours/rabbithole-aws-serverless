import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async } from '@angular/core/testing';

// import { Client, Intents } from "discord.js";

// const {Client, Intents} = require('discord.js')
//intents giving GROOT problems
// const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES] });

const AWS = require("aws-sdk")

// import { SES } from 'aws-sdk';

import { SES, AWSError } from 'aws-sdk';
import { SendEmailRequest, SendEmailResponse } from 'aws-sdk/clients/ses';
import { environment } from '../../../../environments/environment.prod';
import { Subject } from 'rxjs';
import { debug } from 'console';
import { parse } from 'path';
import { FormsModule } from '@angular/forms';

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment["ACCESS_KEY"], 
  secretAccessKey: environment["SECRET_ACCESS_KEY"]
};

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  
  constructor(private http: HttpClient) {}
  


  public getAllUsers(currentEmail:string)
  {
    
    const URL = "https://em8tzstb7h.execute-api.us-east-1.amazonaws.com/staging/users"  
    var subject = new Subject<any>();

    this.http.get<any>(URL).subscribe(
      data => {
        let contacts: any[] = [];
        data.Items.forEach((item: any) => {
          if(item.email != currentEmail)
          {
            contacts.push(item);
            
          }
         
        });
        
        // contacts = data.Items;
        subject.next(contacts);
      }
    );
    return subject.asObservable();
    
  }


  public async getUserPreferences(userEmail:string)
  {
    const URL = `https://em8tzstb7h.execute-api.us-east-1.amazonaws.com/staging/users/${userEmail}`;
    
    var subject = new Subject<any>();

    this.http.get<any>(URL).subscribe(
      data => {
        
        let user = {
          email: data.Item.email,
          discordPreference: data.Item.discordPreference,
          ryverPreference: data.Item.ryverPreference,
          emailPreference:  data.Item.emailPreference,
          discordID: data.Item.discordID,
          ryverForumID: data.Item.ryverForumID,
        };
        subject.next(user);
      }
    );
    return subject.asObservable();


  }

  public async getUserMessages(value:any, author:string)
  {
    
      var subject = new Subject<any>();


      const URL = `https://gl48wrap21.execute-api.us-east-1.amazonaws.com/staging/chats/byAuthor`;

      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }

      const options = {
        'author': `${author}`,
        'recipient' : `${value}`,
        'timestamp' : '22:02:21:00:00:00'

      }

      this.http.post<any>(URL, options, {headers} ).subscribe(
      data => {
      
          let messages = [];
          messages = data.Items;
          subject.next(messages);
      }  
      );
      return subject.asObservable();


  }

  public sendMessage(author:string, recipient:string, timestamp:string, message:string)
  {


    const URL = `https://gl48wrap21.execute-api.us-east-1.amazonaws.com/staging/chats`;

    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }

    const options = {
      'author':`${author}`,
      'timestamp' : `${timestamp}`,
      'message': `${message}`,
      'recipient' : `${recipient}`,
      

    }

    /*author: requestJSON.author,               
    timestamp: requestJSON.timestamp,               
    message: requestJSON.message,              
     recipient: requestJSON.recipient,*/

    this.http.put<any>(URL, options, {headers} ).subscribe(
      data => {
        
      }  
      );
  }



  //Discord
  public async discordMessage(messageTextbox:string, discordID:string, email:string)
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
      "id": discordID
    }
    
    this.http.post<any>("http://52.91.52.167:3000/sendDM", `message=${email} :` + ` ${messageTextbox}&id=`+ discordID, {headers}, ).subscribe(
      data => {
       
      }  )  
          
  }
  
  //Ryver
  public RyverMessage(messageTextbox:string, email:string)
  {
  
    //replace displayName with our Username

    const data = JSON.stringify({
      createSource: {
          "avatar": "https://i.imgur.com/vEf9Aaf.png",
          "displayName": "Rabbithole"
        },
        body: email + ": " + messageTextbox
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

  

    const headers = { 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${environment.RYVER_API_KEY}` };

    try{
    this.http.post<any>('https://reinhard.ryver.com/api/1/odata.svc/forums(1560158)/Chat.PostMessage()', data, {headers}).subscribe(
      data => {
          
      }
    )}
      catch(error)
      {
   
      }

  }


  //Email
  public async EmailMessage(recipientEmail:string, messageBody:string, email:string)
  {
    const headers = { 
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8', 
      'Access-Control-Allow-Headers': 'Authorization',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT',
      'Access-Control-Allow-Credentials':'true',
      'responseType': 'text'
      }
    const URL = "http://52.91.52.167:3000/sendMail"

    var content = {
      "toAddress": recipientEmail,
      "text": messageBody
    }
    
    this.http.post<any>("http://52.91.52.167:3000/sendMail", `toAddress=${recipientEmail}&text=${messageBody}&subject=${email}` , {headers}).subscribe(
      data => {
         
      }  )     
  }  





}
    


