import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  animations: [
    trigger('authTransition', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style(
            { opacity: 1 }
          )
        ),
      ])
  ]),]
})
export class LandingpageComponent implements OnInit {
  toggle = true;

  constructor() { }

  ngOnInit(): void {
  }

  loginToggle(){
    this.toggle = false;
  }
}
