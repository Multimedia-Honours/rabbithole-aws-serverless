import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-claim',
  templateUrl: './create-claim.component.html',
  styleUrls: ['./create-claim.component.scss']
})
export class CreateClaimComponent implements OnInit {
  file: File | undefined;
  fileName: string | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onSelect(event: { addedFiles: any; }) {
    console.log(event.addedFiles);
    this.file = event.addedFiles;
    this.fileName = event.addedFiles[0].name;
  }

  onRemove(){
    this.file = undefined;
  }
  
}
