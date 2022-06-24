import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClaimResponse } from "../models/claim-responses";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private claimsEndpoint: any;

  constructor(private http: HttpClient) { 
    this.claimsEndpoint = environment["CLAIM_SERVER_URL"];
  }


  async getClaims(email: string): Promise<Observable<any>>{
    const path = this.claimsEndpoint+'/getClaimsByEmail';
    const body = {
      email: email
    }
    return this.http.post(path, body);
  }

  async createClaim(): Promise<Observable<any>>{
    const path = this.claimsEndpoint;
    const unqId = Math.floor(Date.now() + Math.random()*100)
    const body = {
      "email": "u17005486@tuks.co.za",
      "claimID": unqId,
      "claimDate": "2022/06/24",
      "claimDescription": "Hello there from Angular",
      "claimNotes": "This is a note, lol",
      "claimTotal": "ZAR 200",
      "claimType": "Travel",
      "claimVendorName": "Uber Eats",
      "claimStatus": "pending"
    }
    
    return this.http.put(path, body);
  }
}
