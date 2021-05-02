import { Component, OnInit,Inject } from '@angular/core';
import { BuyService ,DialogData} from '../../../../shared/service/buy.service'
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';
@Component({
  selector: 'app-buy-detail',
  templateUrl: './buy-detail.component.html',
  styleUrls: ['./buy-detail.component.css']
})
export class BuyDetailComponent implements OnInit {
  dataRow = [];
  fullname: string = ''
  class : string = ''
  price: number = 0
  isDirector: boolean = false
  buy_status: boolean = false
  private roles: string[] = [];
  id:number = 0

  constructor(
    public dialog: MatDialog,
    private buyService: BuyService,
    private token:TokenStorageService,
    public dialogRef: MatDialogRef<BuyDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];

  ngOnInit(): void {
    this.loadData()
    this.getRole()
  }

  loadData(){
    this.buyService.getDetail(this.data.id).subscribe(
      data => {
        console.log(data)
        this.dataRow = data.buy
        this.fullname = data.buy[0].fullname
        this.class = data.buy[0].classes
        this.price = data.buy[0].buyprice
        this.id = data.buy[0].id
        this.buy_status = data.buy[0].status
      }
    )
  }

  getRole(){
    const user = this.token.getUser()
    this.roles = user.roles
    this.isDirector = this.roles.includes('ROLE_DIRECTOR');
  }

  appoveBuy(){
    this.buyService.setBuyStatus(this.id,this.buy_status).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  reportbuyform(){
    this.buyService.reportbuyform(this.id)
  }


}
