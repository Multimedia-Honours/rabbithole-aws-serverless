import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http:HttpClient) {}

 
  API_ENDPOINT = 'https://em8tzstb7h.execute-api.us-east-1.amazonaws.com/staging/users';

  getUser(email:any)
  {
    return this.http.get(`${this.API_ENDPOINT}/${email}`);
  }

  updateUser(data:any, id:any):Observable<any>
  {
    return this.http.put(`${this.API_ENDPOINT}/${id}`, data);
  }

  insertUser(body:any, email:any):Observable<any>
  {
    let data = {
        "discordPreference": body.discordPreference,
        "ryverForumID": body.ryverForumID,
        "discordID": body.discordID,
        "ryverPreference":  body.ryverPreference,
        "emailPreference": body.emailPreference,
        "isAdmin": false,
        "email": email
    }
    return this.http.put(`${this.API_ENDPOINT}`, data);
  }

  deleteUser(id:any):Observable<any>{
    return this.http.delete(`${this.API_ENDPOINT}/${id}`);
  }
}
