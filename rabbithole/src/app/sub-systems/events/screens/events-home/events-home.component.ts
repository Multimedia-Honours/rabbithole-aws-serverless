import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';

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

  //startOfDay()
  //endOfDay()
  //addDays()
  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: {
        primary: '#a7ff2d',
        secondary: '#3e3d3d',
      },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor() {}

  ngOnInit(): void {
    console.log( new Date());
    throw new Error('Method not implemented.');
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
      start: new Date('2022-06-25 15:57:44'),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: {
        primary: '#a7ff2d',
        secondary: '#3e3d3d',
      },
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
