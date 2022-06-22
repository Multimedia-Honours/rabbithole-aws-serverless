import { Injectable } from '@angular/core';
import { Storage } from "aws-amplify";
import  { TextractClient, AnalyzeExpenseCommand  } from "@aws-sdk/client-textract";
import { environment } from "../../../../environments/environment";
import { TextractResponse } from "../models/textract-response";

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: environment["ACCESS_KEY"], 
  secretAccessKey: environment["SECRET_ACCESS_KEY"],
};

const textractClient = new TextractClient({ region: REGION, credentials: CREDENTIALS});

const bucket = "rabbithole-claims95512-staging";

@Injectable({
  providedIn: 'root'
})
export class TextractApiService {

  textractObj = {} as TextractResponse;
  
  constructor() {
    
  }

  async processClaim(fileName: any): Promise<any>{
    let path = "public/matthewnharty@gmail.com/";
    const params = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Delimiter: path,
          Name: fileName
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
      console.log("Inside textract: " + JSON.stringify(this.textractObj));
      return JSON.stringify(this.textractObj);
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  // Uploading a claim to an S3 bucket for AWS Textract
  async upLoadClaim(f: File[]){
    try {
      const s3Response = await Storage.put(f[0].name, f, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        completeCallback: (event) => {
          console.log(`Successfully uploaded ${event.key}`);
        },
        contentType: f[0].type,
        // customPrefix: {
        //   public: "public/matthewnharty@gmail.com/"
        // }
      });
  
      return s3Response;

    } catch (error) {
      console.log("Error uploading file: ", error);

      return error;
    }
  }

}
