import { ClaimsService } from './../../services/claims.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './view-claims.component.html',
  styleUrls: ['./view-claims.component.scss']
})
export class ViewClaimsComponent implements OnInit {

  constructor(private router: Router, private claimsService: ClaimsService) { }

  async ngOnInit() {
    // await this.claimsService.getClaims('u17005486@tuks.co.za').then(response => {
    //   response.forEach(data =>{
    //     //console.log("Data: " + JSON.stringify(data));
    //   });
    // });

  //  (await this.claimsService.createClaim()).subscribe(response =>{
  //     console.log(JSON.stringify(response));
  //  });
   
  }

  createClaimNavigation(): void{
    this.router.navigateByUrl('/claims/create-claim');
  }

}
