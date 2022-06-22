import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClaimsService } from '../../services/claims.service';
import { TextractApiService } from '../../services/textract-api.service';
import { TextractResponse } from '../../models/textract-response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
})
export class CreateClaimComponent implements OnInit {
  
  public reviewing: boolean = false;
  public file: File[] = [];
  public fileName: string | undefined;
  public textractObj = {} as TextractResponse;
  public imgUploadResponse: Promise<any> | unknown;
  public loader: boolean = false;
  test: any = '';

  constructor(
    private textractAPI: TextractApiService, 
    private claimsService: ClaimsService,
    private router: Router,
    private formBuilder: FormBuilder
    ) {
  }

  claimForm = this.formBuilder.group({
    claimType: new FormControl('', Validators.required),
    claimDesc: new FormControl('', Validators.required),
    claimVendorName: new FormControl('', Validators.required),
    claimTotal: new FormControl('', Validators.required),
    claimDate: new FormControl('', Validators.required),
    claimNotes: new FormControl('', Validators.required)
  });

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
    this.loader = true;
    this.imgUploadResponse = await this.textractAPI.upLoadClaim(this.file);
    
    setTimeout(async () =>{
      this.textractObj = await this.textractAPI.processClaim(this.fileName);
      console.log(JSON.stringify(this.textractObj));
      this.reviewing = true;
      this.loader = false;
      console.log("Loaded.");
    }, 5000);
  }

  cancelClaim(t: boolean){
    this.reviewing = t;
  }
}
