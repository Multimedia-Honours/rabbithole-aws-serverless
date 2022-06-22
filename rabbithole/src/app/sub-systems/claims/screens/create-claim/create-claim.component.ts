import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../services/claims.service';
import { TextractApiService } from '../../services/textract-api.service';
import { TextractResponse } from '../../models/textract-response';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
})
export class CreateClaimComponent implements OnInit {
  
  testing: boolean = false;
  file: File[] = [];
  fileName: string | undefined;
  textractObj = {} as TextractResponse;

  constructor(
    private textractAPI: TextractApiService, 
    private claimsService: ClaimsService,
    private router: Router
    ) {
  }

  ngOnInit(): void {}

  
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    if(this.file.length < 1){
      this.file.push(...event.addedFiles);
      this.fileName = event.addedFiles[0].name;
    }  
  }

  onRemove(event: File) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
    this.fileName = undefined;
  }

  goBack(){
    this.router.navigateByUrl('/claims');
  }

  submitClaim(){

  }

  async uploadClaim(){
    //const res = await this.textractAPI.upLoadClaim(this.file[0]);
    this.textractObj = await this.textractAPI.processClaim(this.fileName);
    
    console.log("Textract Response: " + this.textractObj);
  }

  cancelClaim(t: boolean){
    this.testing = false;
  }
}
