import { ClaimsService } from './../../../services/claims.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClaimTable } from '../../../models/claim-table';
import { ClaimResponse } from '../../../models/claim-responses';

@Component({
  selector: 'app-pending-table',
  templateUrl: './pending-table.component.html',
  styleUrls: ['./pending-table.component.scss']
})
export class PendingTableComponent implements OnInit {

  CLAIMS_TABLE_DATA: ClaimTable[] = [];
  displayedColumns: string[] = ['Type', 'Vendor', 'Description', 'Total', 'Date'];
  dataSource!: MatTableDataSource<ClaimTable>;
  isLoadingClaims: boolean = false;
  private _numOfPendingClaims!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private claimsService: ClaimsService, 
    private changeDetectorRefs: ChangeDetectorRef) { 
    
  }

  public returnNumOfPendingClaims() {
    return this._numOfPendingClaims;
  }

  async ngOnInit() {
    await this.getPendingClaims();
    console.log(this.CLAIMS_TABLE_DATA);
  }

  async getPendingClaims(){
    (await this.claimsService.getClaims("u17005486@tuks.co.za")).subscribe(data => {
      data.Items.forEach((claim: any) => {
        if (claim.claimStatus == 'pending') {
          let tableRow = {
            type: claim.type,
            vendor: claim.vendorName,
            description: claim.description,
            total: claim.total,
            date: claim.date
          };
          this.CLAIMS_TABLE_DATA.push(tableRow);
          this.isLoadingClaims = false;
          this._numOfPendingClaims = this.CLAIMS_TABLE_DATA.length;
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
