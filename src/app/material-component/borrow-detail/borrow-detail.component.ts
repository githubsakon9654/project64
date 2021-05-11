import { Component, OnInit,Inject,OnDestroy } from '@angular/core';
import { RevealService,Item } from '../../shared/service/reveal.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { BorrowService } from 'src/app/shared/service/borrow.service';

@Component({
  selector: 'app-borrow-detail',
  templateUrl: './borrow-detail.component.html',
  styleUrls: ['./borrow-detail.component.css']
})
export class BorrowDetailComponent implements OnInit,OnDestroy {
  table: Array<any> = []
  name: string = ''
  cls: string = ''
  isAdmin: boolean = false;
  isUser:boolean = false;
  adminApp: boolean = false;
  direApp: boolean = false;
  isDirec: boolean = false;
  isAccept: boolean = false;
  borrowID:number = 0;
  duID:number = 0;
  private roles: string[] = [];
  array: Array<any> = []
  constructor(
    public dialogRef: MatDialogRef<BorrowDetailComponent>,
    private revealService: RevealService,
    private token:TokenStorageService,
    private borrow: BorrowService,
    @Inject(MAT_DIALOG_DATA) public data: Item) { }

  ngOnInit(): void {
    this.getRole()
    this.loadTable(+this.data.id)
  }

  ngOnDestroy():void{}


  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status'];

  loadTable(id:number){
    this.borrow.detailBorrow(id).subscribe(
      data => {
        console.log(data)
        this.table = data.borrow
        console.log(this.table)
        this.getArray()
        this.name = data.borrow[0].fullname
        this.cls = data.borrow[0].classes
        this.adminApp = data.appove[0].admin_approve
        this.direApp = data.appove[0].dire_approvev
        this.isAccept = data.appove[0].accept
        this.borrowID = data.borrow[0].id
        console.log(this.borrowID)
        console.log(this.isAccept)
      }
    )
  }

  getArray(){
    const length = this.table.length
    for(var i=0;i<length; i++){
      console.log(this.table[i])
      if(this.table[i].userId == null){
        this.array.push(this.table[i].duId);
      }
    }
  }

  getRole(){
    const user = this.token.getUser()
    this.roles = user.roles
    this.isAdmin = this.roles.includes('ROLE_ADMIN');
    this.isDirec = this.roles.includes('ROLE_DIRECTOR');
    this.isUser = this.roles.includes('ROLE_USER');
    console.log(this.isAdmin)
    console.log(this.isDirec)
  }

  accept(){
    this.isAccept = true
    this.borrow.update(this.borrowID,this.isAccept).subscribe(
      d=>{}
    )
  }

  Appove(){
    console.log(this.adminApp)
    console.log(this.direApp)
    const length = this.table.length
    for(var i=0;i<length; i++){
      console.log(this.table[i])
      if(this.table[i].userId == null){
        this.array.push(this.table[i].duId);
      }
    }
    this.borrow.updateApprove(this.borrowID,this.adminApp,this.direApp,this.array).subscribe(
      data =>{
        console.log(data)
      }
    )
  }


}
