import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewChild,ElementRef,ViewContainerRef} from '@angular/core';
import { FilterPipe } from '../../pipes/filter.pipe';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contacts:any = [];
  constructor() { }
  searchText!:string;
  currentUserEmail:string = "";

  @ViewChild('contactBox') contactBox!:ElementRef;

  ngOnInit(): void {
    this.searchText = "";

    }

}
