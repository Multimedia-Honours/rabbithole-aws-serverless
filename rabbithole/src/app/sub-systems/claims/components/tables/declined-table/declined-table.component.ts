import { ClaimsService } from './../../../services/claims.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClaimTable } from '../../../models/claim-table';
import { ClaimResponse } from '../../../models/claim-responses';


@Component({
  selector: 'app-declined-table',
  templateUrl: './declined-table.component.html',
  styleUrls: ['./declined-table.component.scss']
})
export class DeclinedTableComponent implements OnInit {

  CLAIMS_TABLE_DATA: ClaimTable[] = [];
  displayedColumns: string[] = ['Type', 'Vendor', 'Description', 'Total', 'Date'];
  dataSource!: MatTableDataSource<ClaimTable>;
  isLoadingClaims: boolean = false;
  private _numOfDeclinedClaims!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private claimsService: ClaimsService, 
    private changeDetectorRefs: ChangeDetectorRef) { 
    
  }

  public returnNumOfDeclinedClaims() {
    if(this._numOfDeclinedClaims > 0){
      return this._numOfDeclinedClaims;
    }else{
      return 0;
    }
  }

  async ngOnInit() {
    await this.getPendingClaims();
    console.log(this.CLAIMS_TABLE_DATA);
  }

  async getPendingClaims(){
    (await this.claimsService.getClaims("u17005486@tuks.co.za")).subscribe(data => {
      data.Items.forEach((claim: any) => {
        if (claim.claimStatus == 'declined') {
          let tableRow = {
            type: claim.type,
            vendor: claim.vendorName,
            description: claim.description,
            total: claim.total,
            date: claim.date
          };
          this.CLAIMS_TABLE_DATA.push(tableRow);
          this.isLoadingClaims = false;
          this._numOfDeclinedClaims = this.CLAIMS_TABLE_DATA.length;
          this.dataSource = new MatTableDataSource<ClaimTable>(this.CLAIMS_TABLE_DATA);
        }
      });
    })
  }

  ngAfterViewInit() {
    if(this.dataSource == undefined){
      // nothing
    }else{
      this.dataSource.paginator = this.paginator;
    }
  }

}
