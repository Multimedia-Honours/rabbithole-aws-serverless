import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss'],
})
export class CreateClaimComponent implements OnInit {
  files: File[] = [];
  fileName: string | undefined;

  constructor() {
  }

  ngOnInit(): void {}

  

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    if(this.files.length < 1){
      this.files.push(...event.addedFiles);
    }  
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
