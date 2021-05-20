import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { ReturnsService,Item} from '../../shared/service/returns.service';
import { DurableService} from '../../shared/service/durable.service';
import { ReturnFormComponent } from './dialog/return-form/return-form.component';
import { ReturnDetailComponent } from './dialog/return-detail/return-detail.component';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-durable-return',
  templateUrl: './durable-return.component.html',
  styleUrls: ['./durable-return.component.css']
})
export class DurableReturnComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  table: Array<any> = []
  role: Array<any> = []
  adAppove: boolean = false
  diAppove: boolean = false
  isUser: boolean = false
  id:number= 0

  constructor(
        public Source: ReturnsService,
        public dialog: MatDialog,
        private tokenStorageService: TokenStorageService,
        public durable: DurableService,
        private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }

  displayedColumns: string[] = ['id', 're_name', 'status', 'delete'];

  openform(){
    const borrow = this.dialog.open(ReturnFormComponent,{
      width: '1500px',
      data: {
        userId: this.id
      }
    })
    borrow.afterClosed().subscribe(
      d => {
        this.loadTable()
        this.Source.clear()
      }
    )
  }

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


  loadTable(){
    const id = Number(this.userService.getId())
    this.id = id
    this.role = this.tokenStorageService.getRole()
    this.isUser = this.role[1].IsUser

    if(this.isUser){
      this.Source.getUserList(id).subscribe(
        data => {
          this.table = data.returns
        }
      )
    } else {
      this.Source.getAllList().subscribe(
        data => {
          this.table = data.returns
        }
      )
    }
  }

  openDetail(row:any){
    const detail = this.dialog.open(ReturnDetailComponent,{
      width: '1500px',
      data: {id: row.id}
    })
    detail.afterClosed().subscribe(s => {
      this.loadTable()
    })
    console.log(row.id)
  }

  report(){
    if(this.isUser){
      this.Source.reportReturn(+this.id)
    } else {
      this.Source.reportAll()
    }
  }
}
