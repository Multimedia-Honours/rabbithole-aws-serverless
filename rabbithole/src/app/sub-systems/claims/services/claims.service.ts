import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ClaimResponse } from "../models/claim-responses";
import { ClaimRequest } from "../models/claim-requests";
import { ClaimTable } from '../models/claim-table';
import { AuthService } from '../../home/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  private claimsEndpoint: any;
  private putRequestBody!: ClaimRequest;
  email: any;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.claimsEndpoint = environment["CLAIM_SERVER_URL"];
  }


  async getClaims(){
    const email = await this.authService.returnLoggedUserEmail();
  
    const path = this.claimsEndpoint+'/getClaimsByEmail';
    const body = {
      email: email
    }
    
    return this.http.post<any>(path, body);
  }

  
  async createClaim(body: ClaimRequest): Promise<Observable<any>>{
    const path = this.claimsEndpoint;
    const email = await this.authService.returnLoggedUserEmail();
    this.putRequestBody = {
      "email": email,
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
