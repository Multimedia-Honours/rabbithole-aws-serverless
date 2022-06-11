import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
})
export class CreateClaimComponent implements OnInit {
  
  testing: boolean = false;

  constructor() {
  }

  ngOnInit(): void {}

  goBack(){

  }

  submitClaim(){

  }

  uploadClaim(t: boolean){
    this.testing = true;
  }

  cancelClaim(t: boolean){
    this.testing = false;
  }
}
