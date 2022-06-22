import { Injectable } from '@angular/core';
import { Storage } from "aws-amplify";
import  { TextractClient, AnalyzeExpenseCommand } from "@aws-sdk/client-textract";

const REGION = "us-east-1";
const CREDENTIALS = {
  accessKeyId: '', 
  secretAccessKey: '',
};

const textractClient = new TextractClient({ region: REGION });

const bucket = "textract-console-us-east-1-a7529a19-5e64-43bb-b36c-b2a99484afa4";

@Injectable({
  providedIn: 'root'
})
export class TextractApiService {

  constructor() { }


  async processClaim(fileName: any){
    const params = {
      Document: {
        S3Object: {
          Bucket: bucket,
          Name: "76a080da_e64c_4178_9a1c_3169f6101817_receipt_15may2022_004628.pdf"
        },
      },
    }

    try {
      const aExpense = new AnalyzeExpenseCommand(params);
      const response = await textractClient.send(aExpense);
      
      console.log(response);

      return response;
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
