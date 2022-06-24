import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ClaimResponse } from "../models/claim-responses";
import { ClaimRequest } from "../models/claim-requests";

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private claimsEndpoint: any;
  private putRequestBody!: ClaimRequest;

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

  createClaim(body: ClaimRequest): Observable<any>{
    const path = this.claimsEndpoint;
    this.putRequestBody = {
      "email": body.email,
      "claimID": body.claimID,
      "claimDate": body.claimDate,
      "claimDescription": body.claimDescription,
      "claimNotes": body.claimNotes,
      "claimTotal": body.claimTotal,
      "claimType": body.claimType,
      "claimVendorName": body.claimVendorName,
      "claimStatus": body.claimStatus
    };
    return this.http.put(path, this.putRequestBody);
  }
}
