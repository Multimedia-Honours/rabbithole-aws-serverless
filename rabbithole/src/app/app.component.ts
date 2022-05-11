import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rabbithole';
  public show:boolean = false;
  public buttonName:any = 'Show';

  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
  }
}
