import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit,Input } from '@angular/core';

@Component(
  {
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
  
})
export class MessageBoxComponent {
  @Input() message: any;

}
