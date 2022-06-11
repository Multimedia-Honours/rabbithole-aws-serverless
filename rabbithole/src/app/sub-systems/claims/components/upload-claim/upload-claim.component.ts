import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-claim',
  templateUrl: './upload-claim.component.html',
  styleUrls: ['./upload-claim.component.scss']
})

export class UploadClaimComponent implements OnInit {

  files: File[] = [];
  fileName: string | undefined;

  constructor() {
  }

  ngOnInit(): void {}

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    if(this.files.length < 1){
      this.files.push(...event.addedFiles);
      this.fileName = event.addedFiles[0].name;
    }  
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.fileName = undefined;
  }

}
