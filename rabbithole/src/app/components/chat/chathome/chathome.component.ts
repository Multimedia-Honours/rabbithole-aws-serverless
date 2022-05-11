import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chathome',
  templateUrl: './chathome.component.html',
  styleUrls: ['./chathome.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChathomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
