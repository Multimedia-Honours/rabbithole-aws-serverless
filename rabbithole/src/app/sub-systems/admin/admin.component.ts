import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ViewChild,ElementRef,ViewContainerRef} from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Auth, Amplify } from 'aws-amplify';
import { ChatService } from './services/chat.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';
import { NativeDateModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UserApiService } from './services/user-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClaimsService } from '../claims/services/claims.service';
import { ClaimTable } from '../claims/models/claim-table';
import { ClaimResponse } from '../claims/models/claim-responses';
import { TextractApiService } from '../claims/services/textract-api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  contacts:any = [];
  CLAIMS_TABLE_DATA: ClaimTable[] = [];
  displayedColumns: string[] = ['Type', 'Vendor', 'Description', 'Total', 'Date', 'Actions'];
  dataSource!: MatTableDataSource<ClaimTable>;
  searchText!:string;
  currentUserEmail:string = "";
  contactSelected: boolean = false;
  dUser: any;
  name:string ="";
  isAdmin = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public authenticator: AuthenticatorService, 
    private http: HttpClient, 
    private CS:ChatService, 
    private userService:UserApiService,
    private claimsService: ClaimsService,
    private awsAPI: TextractApiService
    ) { }
  

  @ViewChild('contactBox') contactBox!:ElementRef;

  async ngOnInit() {
    this.searchText = "";

    const emailObj = Auth.currentUserInfo().then((data) => {
      this.currentUserEmail = data.attributes.email;
      this.CS.getAllUsers(this.currentUserEmail).subscribe(
        (data) => {
          // this.contacts = data;
          data.map(
            (contact: any) => {
              this.contacts.push(contact);
            }
          )
        }
      );
    });

    }


    async displayUser(value:any){
      let user:any;
      await this.userService.getUser(value).then(data=>{
        this.dUser = data;
      })
      
      this.name= this.dUser.Item.email;
      await this.getPendingClaimsForUser(this.dUser.Item.email);
     
      this.isAdmin = this.dUser.Item.isAdmin;
    }

    updateClaim(claim: any, status: string){
      this.claimsService.updateClaimAdmin(claim, status);
    }

    makeAdmin(email:any){
      this.dUser.Item.isAdmin = true;
      this.userService.insertUser(this.dUser.Item,email).subscribe((res)=>{
        this.isAdmin = true;
      })
    }


    removeAdmin(email:any){
      this.dUser.Item.isAdmin = false;
      this.userService.insertUser(this.dUser.Item,email).subscribe((res)=>{
        this.isAdmin = false;
      })
    }


    async getPendingClaimsForUser(email: string){
      (await this.claimsService.getClaimsForAdmin(email)).subscribe(data => {
        data.Items.forEach((claim: any) => {
          if (claim.claimStatus == 'pending') {
            let tableRow = {
              email: claim.email,
              ID: claim.ID,
              type: claim.type,
              vendor: claim.vendorName,
              description: claim.description,
              total: claim.total,
              date: claim.date,
              notes: claim.notes,
              status: claim.claimStatus
            };
            this.CLAIMS_TABLE_DATA.push(tableRow);
            this.dataSource = new MatTableDataSource<ClaimTable>(this.CLAIMS_TABLE_DATA);
          }
        });
      })
    }
  
    ngAfterViewInit() {
      if(this.dataSource == undefined){
        // nothing
      }else{
        this.dataSource.paginator = this.paginator;
      }
    }
  
}
