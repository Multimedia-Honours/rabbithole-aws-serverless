import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  toggle = new BehaviorSubject<boolean>(true);
  tg = this.toggle.asObservable();

  constructor() { }

  changeToggle(){
    this.toggle.next(!this.toggle.value);
  }
}
