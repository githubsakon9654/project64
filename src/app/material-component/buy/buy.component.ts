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
      }
    )
  }
}
