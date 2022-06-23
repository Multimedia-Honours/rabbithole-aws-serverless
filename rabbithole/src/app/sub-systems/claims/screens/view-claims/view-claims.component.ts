import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createClaimNavigation(): void{
    this.router.navigateByUrl('/claims/create-claim');
  }

}
