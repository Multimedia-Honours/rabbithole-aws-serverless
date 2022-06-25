import { ClaimsService } from './../../services/claims.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingTableComponent } from '../../components/tables/pending-table/pending-table.component';

@Component({
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {

  constructor(
    private router: Router, 
    private claimsService: ClaimsService) { }

  async ngOnInit() {
    
  }


  createClaimNavigation(): void{
    this.router.navigateByUrl('/claims/create-claim');
  }

}
