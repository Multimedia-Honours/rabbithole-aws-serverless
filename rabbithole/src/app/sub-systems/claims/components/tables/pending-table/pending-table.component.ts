import { ClaimsService } from './../../../services/claims.service';
import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClaimTable } from '../../../models/claim-table';

const ELEMENT_DATA: ClaimTable[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}
];

@Component({
  selector: 'app-pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.scss']
})
export class PendingTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<ClaimTable>(ELEMENT_DATA);
  tableData: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private claimsService: ClaimsService) { }

  ngOnInit() {
    console.log("hell");
    this.claimsService.getClaims("u17005486@tuks.co.za", "pending").then(data =>{
      
    });

    console.log(this.tableData);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
