import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { SupplieService } from '../../shared/service/supplie.service';
import { BuyformComponent } from './buyDialog/buyform/buyform.component';
import { UserService} from '../../shared/service/user.service'
import { BuyService ,DialogData} from '../../shared/service/buy.service'
import { BuyDetailComponent } from './buyDialog/buy-detail/buy-detail.component';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  table: Array<any> = []
  tablethai: Array<any> = []
  constructor(
    public dialog: MatDialog,
    public Source: RevealService,
    public SupplieService: SupplieService,
    private userService: UserService,
    private buyService: BuyService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id','serial','name','status','buyprice','date','accept'];

  openDetail(row:any){
    const dialogDetail = this.dialog.open(BuyDetailComponent,{
      width: '1500px',
      data: {id:row.id}
    })
    dialogDetail.afterClosed().subscribe(
      r => {
        this.loadTable()
      }
    )
  }

  loadTable(){
    this.buyService.getBuyList().subscribe(
      data => {
        this.table = data.buyform
        console.log(data)
        this.loopThaiDate(this.table)
      }
    )
  }

  reportBuyList(){
    this.buyService.reportBuylist()
  }

  openform(){
    const userId = this.userService.getId()
    console.log(userId)
    const dialog = this.dialog.open(BuyformComponent,{
      width: '1600px'
    });

    dialog.afterClosed().subscribe(
      r =>{
        this.loadTable()
        this.buyService.clear()
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
            row.push({id:dateR[i].id,Date:THdate,accept:dateR[i].accept,status:dateR[i].status,buyprice:dateR[i].buyprice
              ,name:dateR[i].name,repel:dateR[i].repel,serial:dateR[i].serial})

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
    this.buyService.getFilldate(s,e).subscribe(
      date => {
        this.table = date.buyform
        console.log(this.table)
        this.loopThaiDate(this.table)
      }
    )
  }
}
