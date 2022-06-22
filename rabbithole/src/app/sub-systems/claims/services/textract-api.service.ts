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

const bucket = "textract-console-us-east-1-a7529a19-5e64-43bb-b36c-b2a99484afa4";

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
          Name: "receipt-1.jpeg"
        },
      }
    }

    try {
      const aExpense = new AnalyzeExpenseCommand(params);
      const response = await textractClient.send(aExpense);
      
      response.ExpenseDocuments!.forEach(doc => {
        doc.SummaryFields!.map(fields => {
          
          if(fields.Type?.Text?.toLocaleLowerCase() === "vendor_name"){
            this.textractObj.vendorName = fields.ValueDetection?.Text;
          }
          if(fields.Type?.Text?.toLocaleLowerCase() === "total"){
            this.textractObj.total = fields.ValueDetection?.Text;
          }
          if(fields.Type?.Text?.toLocaleLowerCase() === "other"){
            if(fields.ValueDetection?.toString().includes("/")){
              this.textractObj.date = fields.ValueDetection?.Text;
            }
          }
          
          this.textractObj.claimURL = fileName;
          console.log("TXT Res: " + this.textractObj);
          return this.textractObj;
        })
      });
    } catch (err) {
      console.log("Error", err);
      return err;
    }
  }

  // Uploading a claim to an S3 bucket for AWS Textract
  async upLoadClaim(f: File){
    try {
      const s3Response = await Storage.put(f.name, f, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        completeCallback: (event) => {
          console.log(`Successfully uploaded ${event.key}`);
        },
        contentType: f.type,
        customPrefix: {
          public: "public/matthewnharty@gmail.com/"
        }
      });
  
      return s3Response;

    } catch (error) {
      console.log("Error uploading file: ", error);

      return error;
    }
  }

}
