import { ClaimsService } from './../../../services/claims.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClaimTable } from '../../../models/claim-table';
import { ClaimResponse } from '../../../models/claim-responses';

@Component({
  selector: 'app-accepted-table',
  templateUrl: './accepted-table.component.html',
  styleUrls: ['./accepted-table.component.scss']
})
export class AcceptedTableComponent implements OnInit {
  
  CLAIMS_TABLE_DATA: ClaimTable[] = [];
  displayedColumns: string[] = ['Type', 'Vendor', 'Description', 'Total', 'Date'];
  dataSource!: MatTableDataSource<ClaimTable>;
  isLoadingClaims: boolean = false;
  private _numOfAcceptedClaims!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(
    private claimsService: ClaimsService, 
    private changeDetectorRefs: ChangeDetectorRef) { 
    
  }

  public returnNumOfAcceptedClaims() {
    if(this._numOfAcceptedClaims > 0){
      return this._numOfAcceptedClaims;
    }else{
      return 0;
    }
  }

  async ngOnInit() {
    await this.getPendingClaims();
  }

  async getPendingClaims(){
    (await this.claimsService.getClaims()).subscribe(data => {
      data.Items.forEach((claim: any) => {
        if (claim.claimStatus == 'accepted') {
          let tableRow = {
            type: claim.type,
            vendor: claim.vendorName,
            description: claim.description,
            total: claim.total,
            date: claim.date
          };
          this.CLAIMS_TABLE_DATA.push(tableRow);
          this.isLoadingClaims = false;
          this._numOfAcceptedClaims = this.CLAIMS_TABLE_DATA.length;
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
