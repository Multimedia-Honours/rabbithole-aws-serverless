import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsEndpoint: any;

  constructor(private http: HttpClient) { 
    this.eventsEndpoint = environment["EVENTS_SERVER_URL"];
  }

  async getEvents(){
    const path = this.eventsEndpoint;
    
    return this.http.get<any>(path);
  }

  async modifyEvent(body: any){
    const path = this.eventsEndpoint;
    let putRequestBody = {
      "ID": body.ID,
      "color": body.color[0],
      "start": body.start,
      "end": body.end,
      "title": body.title
    };
    console.log(putRequestBody);
    return this.http.put(path, putRequestBody);
    
  }

}
