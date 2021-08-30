import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { BuyService } from '../../shared/service/buy.service'
import { RevealComponent } from '../reveal/reveal.component';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { RevealDetailComponent } from '../reveal/dialog/reveal-detail/reveal-detail.component';
@Component({
  selector: 'app-revel-list',
  templateUrl: './revel-list.component.html',
  styleUrls: ['./revel-list.component.css']
})
export class RevelListComponent implements OnInit {
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
  id = 0
  constructor(
    public dialog: MatDialog,
    public Source: RevealService,
    private tokenStorageService: TokenStorageService,
    public SupplieService: SupplieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id','serial','name', 'admin_approve', 'total_price','date', 'delete'];

  openform(){
    const dialog = this.dialog.open(RevealComponent,{
      width: '1500px'
    })
    dialog.afterClosed().subscribe(result => {
      this.loadTable()
      this.Source.clear()
    });
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
            row.push({id:dateR[i].id,Date:THdate,admin_approve:dateR[i].admin_approve,fullname:dateR[i].fullname
            ,serial:dateR[i].serial,total_price:dateR[i].total_price})

          }
          this.tablethai = row
          console.log(this.tablethai)
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
        this.loopThaiDate(this.table)
      }
    )
  }

  openDetail(row: any){
    const dialog = this.dialog.open(RevealDetailComponent,{
      width: '1500px',
      data: {id: row.id}
    })
    dialog.afterClosed().subscribe(s => {
      this.loadTable()
    })
    console.log(row.id)
  }

  loadTable(){
    this.id = Number(this.userService.getId())
    this.role = this.tokenStorageService.getRole()
    console.log(this.role)
    this.isUser = this.role[1].IsUser

    if(this.isUser){
      this.Source.getRevealUserList(this.id).subscribe(
        data => {
          this.table = data.reveal
          console.log(this.table)
          this.loopThaiDate(this.table)

        }
      )

    } else {
      this.Source.getRevealList().subscribe(
        data => {
          this.table = data.reveal
          console.log(this.table)
          this.loopThaiDate(this.table)
        }
      )
    }
  }

  reportByUser(){
    if(!this.isUser){
      this.Source.reportList()
    } else{

      this.Source.reportByUser(this.id)
    }
  }

}
