import { Injectable } from '@angular/core';
import { Storage } from "aws-amplify";
import  { TextractClient, AnalyzeExpenseCommand  } from "@aws-sdk/client-textract";
import { environment } from "../../../../environments/environment";
import { TextractResponse } from "../models/textract-response";
import * as S3 from 'aws-sdk/clients/s3';

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment["ACCESS_KEY"], 
  secretAccessKey: environment["SECRET_ACCESS_KEY"],
};

const textractClient = new TextractClient({ region: REGION, credentials: CREDENTIALS});
const s3Client = new S3({region: REGION, credentials: CREDENTIALS});
const bucket = "rabbithole-claims";

@Injectable({
  providedIn: 'root'
})
export class TextractApiService {

  textractObj = {} as TextractResponse;
  
  constructor() {
    
  }

  async processClaim(fileName: any): Promise<any>{
    const params = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Name: 'matthewnharty@gmail.com'+'-'+fileName
        },
      }
    }

    try {
      const aExpense = new AnalyzeExpenseCommand(params);
      console.log("A EXPENSE: " + JSON.stringify(aExpense));
      const response = await textractClient.send(aExpense);
      
      console.log(response);
      
      response.ExpenseDocuments!.forEach(doc => {
        doc.SummaryFields!.map(fields => {
          
          if(fields.Type?.Text == "VENDOR_NAME"){
            this.textractObj.vendorName = fields.ValueDetection?.Text;
          }
          if(fields.Type?.Text == "TOTAL"){
            this.textractObj.total = fields.ValueDetection?.Text;
          }
          if(fields.Type?.Text == "OTHER"){
            if(fields.ValueDetection?.toString().includes("/")){
              this.textractObj.date = fields.ValueDetection?.Text;
            }
          }
        })
      });
      this.textractObj.claimURL = fileName;
      
      return JSON.stringify(this.textractObj);
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  // Uploading a claim to an S3 bucket for AWS Textract
  async upLoadClaim(f: File[]){
    try {
      const appendedFileName = 'matthewnharty@gmail.com'+'-'+f[0].name;
      const params = {
        Bucket: bucket,
        Key: appendedFileName,
        Body: f[0],
        ACL: 'public-read',
        ContentType: f[0].type
      };
  
      s3Client.upload(params, (err: any, data: any) =>{
        if (err) {
          console.log('There was an error uploading your file: ', err);
        }
        console.log('Successfully uploaded file.', data);
      });
    } catch (error) {
      console.log("Error uploading file: ", error);

      return error;
    }
  }

}
