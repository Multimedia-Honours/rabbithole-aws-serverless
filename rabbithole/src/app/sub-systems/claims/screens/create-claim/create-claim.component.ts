import { ClaimsService } from './../../services/claims.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TextractApiService } from '../../services/textract-api.service';
import { TextractResponse } from '../../models/textract-response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessErrorPopupComponent } from '../../components/success-error-popup/success-error-popup.component';
import { ClaimRequest } from "../../models/claim-requests";

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
  public requestBody = {} as ClaimRequest;
  public textractResponse: string = '';
  public imgUploadResponse: Promise<any> | unknown;
  public loader: boolean = false;
  test: any = '';

  constructor(
    private textractAPI: TextractApiService, 
    private claimsService: ClaimsService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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

  ngOnInit(): void {
    
  }
  
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


  /** 
   * Adds new claim to the claims database:
   *  + Sends in a new claim object
  */
  public async submitClaim(){
    this.requestBody = {
      "email": "u17005486@tuks.co.za",
      "claimID": Math.floor(Date.now() + Math.random()*100),
      "claimDate": this.claimForm.value.claimDate,
      "claimDescription": this.claimForm.value.claimDesc,
      "claimNotes": this.claimForm.value.claimNotes,
      "claimTotal": this.claimForm.value.claimTotal,
      "claimType": this.claimForm.value.claimType,
      "claimVendorName": this.claimForm.value.claimVendorName,
      "claimStatus": 'pending'
    };
    try{
      (await this.claimsService.createClaim(this.requestBody)).subscribe(res => {
        this.openClaimDialog("Successfully created claim! Please wait for review.");
        return res;
      });
    }catch(error: any){
      return error;
    }
  }

  async uploadClaim(){
    this.loader = true;
    this.imgUploadResponse = await this.textractAPI.upLoadClaim(this.file);
    
    setTimeout(async () =>{
      this.textractResponse = await this.textractAPI.processClaim(this.fileName);
      this.textractObj = JSON.parse(this.textractResponse);
      this.reviewing = true;
      this.loader = false;
    }, 6500);
  }

  cancelClaim(t: boolean){
    this.claimForm.reset();
    this.reviewing = t;
  }

  openClaimDialog(message: string) {
    this.dialog.open(SuccessErrorPopupComponent, {
      data: message,
      width: '250px'
    }).afterClosed().subscribe(item => {
      this.goBack();
    });
  }
  
}
