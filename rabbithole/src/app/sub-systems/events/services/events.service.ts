import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventsRequest } from '../models/eventsRequest';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private eventsEndpoint: any;
  private PUTRequest!: EventsRequest;

  constructor(private http: HttpClient) { 
    this.eventsEndpoint = environment["EVENTS_SERVER_URL"];
  }

  async getEvents(){
    const path = this.eventsEndpoint;
    
    return this.http.get<any>(path);
  }

  async modifyEvent(body: any){
    const path = this.eventsEndpoint;
    this.PUTRequest = {
      "ID": body.ID,
      "color": body.color[0],
      "start": body.start,
      "end": body.end,
      "title": body.title
    };
    
    
    this.http.put<any>(path, this.PUTRequest).subscribe(response => {
      return response;
    });
  }

  async deleteEvent(id: number){
    const path = this.eventsEndpoint;
  
    this.http.delete<any>(path+`/${id}`).subscribe(response => {
      return response;
    });
  }

}
