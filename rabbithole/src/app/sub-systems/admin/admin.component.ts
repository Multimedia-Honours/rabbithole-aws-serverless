import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  contacts:any = [];
  constructor() { }
  searchText!:string;

  ngOnInit(): void {
    this.searchText = "";

    }

}
