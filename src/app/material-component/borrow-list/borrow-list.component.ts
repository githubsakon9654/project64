import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { BorrowService,Item} from '../../shared/service/borrow.service';
import { DurableService} from '../../shared/service/durable.service';
import { BorrowDurableComponent } from '../borrow-durable/borrow-durable.component';
import { BorrowDetailComponent } from '../borrow-detail/borrow-detail.component';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  table: Array<any> = []
  role: Array<any> = []
  adAppove: boolean = false
  diAppove: boolean = false
  isUser: boolean = false
  uId:number = 0;
  date:string =''

  constructor(
        public Source: BorrowService,
        public dialog: MatDialog,
        private tokenStorageService: TokenStorageService,
        public durable: DurableService,
        private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id', 'borrow_name', 'admin_approve','dire_approvev','date', 'delete'];

  getDate(){
    var start = (this.range.value.start).toISOString()
    var s = start.substring(0,10)
    var end = (this.range.value.end).toISOString()
    var e = end.substring(0,10)
    console.log(this.range.value.start)
    console.log(this.range.value.end)
    console.log(s)
    console.log(e)
    this.Source.getDAteList(s,e).subscribe(
      date => {
        this.table = date.date
        console.log(this.table)
      }
    )
  }

  openform(){
    const borrow = this.dialog.open(BorrowDurableComponent,{
      width: '1500px'
    })
    borrow.afterClosed().subscribe(
      d => {
        this.loadTable()
        this.Source.clear()
      }
    )
  }


  loadTable(){
    const id = Number(this.userService.getId())
    console.log(id)
    this.uId = id
    this.role = this.tokenStorageService.getRole()
    this.isUser = this.role[1].IsUser

    if(this.isUser){
      this.Source.getBorrowUserList(id).subscribe(
        data => {
          this.table = data.borrow
          console.log(this.table)
        }
      )

    } else {
      this.Source.getBorrowList().subscribe(
        data => {
          this.table = data.borrow
          console.log(this.table)
        }
      )
    }
  }

  openDetail(row:any){
    const detail = this.dialog.open(BorrowDetailComponent,{
      width: '1500px',
      data: {id: row.id}
    })
    detail.afterClosed().subscribe(s => {
      this.loadTable()
    })
    console.log(row.id)
  }

  openReport(){
    if(this.isUser){
      this.Source.reportBorrowUser(this.uId)
    } else{
      this.Source.reportBorrow()
    }
  }
}
