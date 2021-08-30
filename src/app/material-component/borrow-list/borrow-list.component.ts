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
  tablethai: Array<any> = []
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
        this.loopThaiDate(this.table)
      }
    )
  }

  loopThaiDate(dateR:Array<any>){
    var len = dateR.length;
    var row:Array<Object> = []
    for(let i=0; i < len; i++){
      console.log(dateR[i].Date)
            var dates = dateR[i].Date
            var month = dates.substring(5, 7);
            var year = +((dates).substring(2, 4)) + 43;
            var day = (dates).substring(8, 10);
            var THmonth;
            switch (+month) {
                case 1:
                    THmonth = ' ม.ค. ';
                    break;
                case 2:
                    THmonth = ' ก.พ. ';
                    break;
                case 3:
                    THmonth = ' มี.ค. ';
                    break;
                case 4:
                    THmonth = ' เม.ย. ';
                    break;
                case 5:
                    THmonth = ' พ.ค. ';
                    break;
                case 6:
                    THmonth = ' มิ.ย. ';
                    break;
                case 7:
                    THmonth = ' ก.ค. ';
                    break;
                case 8:
                    THmonth = ' ส.ค. ';
                    break;
                case 9:
                    THmonth = ' ก.ย. ';
                    break;
                case 10:
                    THmonth = ' ตุ.ค. ';
                    break;
                case 11:
                    THmonth = ' พฤ.ย. ';
                    break;
                case 12:
                    THmonth = ' ธ.ค. ';
            }
            var THdate = day + THmonth + year;
            console.log(THdate)
            var id = dateR[i].id
            row.push({id:dateR[i].id,Date:THdate,accept:dateR[i].accept,admin_approve:dateR[i].admin_approve
            ,borrow_name:dateR[i].borrow_name,dire_approvev:dateR[i].dire_approvev})

          }
          this.tablethai = row
          console.log(this.tablethai)
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
          this.loopThaiDate(this.table)
        }
      )

    } else {
      this.Source.getBorrowList().subscribe(
        data => {
          this.table = data.borrow
          console.log(this.table)
          this.loopThaiDate(this.table)
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
