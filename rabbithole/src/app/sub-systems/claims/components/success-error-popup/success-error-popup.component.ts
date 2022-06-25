import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateClaimComponent } from '../../screens/create-claim/create-claim.component';

@Component({
  selector: 'app-success-error-popup',
  templateUrl: './success-error-popup.component.html',
  styleUrls: ['./success-error-popup.component.scss']
})
export class SuccessErrorPopupComponent implements OnInit {
  
  message: string;

  constructor(
    public dialogRef: MatDialogRef<CreateClaimComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.message = this.data;
    }

  ngOnInit(): void {
  }

  onClosed(){
    this.dialogRef.close();
    this.router.navigateByUrl('/claims');
  }

}
