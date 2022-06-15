import { Injectable } from '@angular/core';
import { Storage } from "aws-amplify";

@Injectable({
  providedIn: 'root'
})
export class TextractApiService {

  constructor() { }


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
          public: "public/matthewnharty@gmail.com"
        }
      });
  
      return s3Response;

    } catch (error) {
      console.log("Error uploading file: ", error);

      return error;
    }
  }

}
