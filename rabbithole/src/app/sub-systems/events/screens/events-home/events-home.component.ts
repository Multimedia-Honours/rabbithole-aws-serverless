import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events-home',
  templateUrl: './events-home.component.html',
  styleUrls: ['./events-home.component.scss']
})
export class EventsHomeComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: any[] = [];
  activeDayIsOpen: boolean = true;

  constructor(private eventsService: EventsService, private changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit() {
    let eventObj:any = {};

    

    (await this.eventsService.getEvents()).subscribe(res => {
      res.Items.forEach((event: any) =>{
        eventObj = {
          "ID": event.ID,
          "start": new Date(event.start),
          "end": new Date(event.end),
          "title": event.title,
          "color": {
            "primary": event.color,
            "secondary": '',
          },
          "allDay": true,
          "resizable": {
            "beforeStart": true,
            "afterEnd": true,
          },
          "draggable": true,
        };
        this.events.push(eventObj);
        this.refresh.next();
      });
    
    
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        ID: Math.floor(Date.now() + Math.random()*100),
        start: new Date(),
        end: new Date(),
        title: '[Empty]',
        color: {
          primary: '#A7FF2D',
          secondary: '',
        },
        allDay: false,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: true,
      }
    ];
  }

  deleteEvent(eventToDelete: any) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.eventsService.deleteEvent(eventToDelete.ID);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  updateEvent(){
    
  }

  saveCalanderState(){
    let updateEvent:any = {};

    this.events.forEach(async event => {
      let color: any;
      let end: any;

      if(event.end == undefined){
        end = "";
      }else{
        end = event.end;
      }

      updateEvent = {
        "ID": event.ID,
        "color": event.color.primary,
        "start": event.start.toString(),
        "end": end.toString(),
        "title": event.title
      };
      this.eventsService.modifyEvent(updateEvent);
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
