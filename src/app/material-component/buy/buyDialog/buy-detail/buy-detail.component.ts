import { Component, OnInit,Inject,Directive, TemplateRef, ViewChild } from '@angular/core';
import { BuyService ,DialogData} from '../../../../shared/service/buy.service'
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';
import { BuyCommentComponent } from '../buy-comment/buy-comment.component';



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
  repel:boolean = false
  accept:boolean = false
  comment:string = ''
  onCom:boolean = false

  

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
        this.repel = data.buy[0].repel
        this.accept =data.buy[0].accept
        this.comment = data.buy[0].store
      }
    )
  }

  Oncomment(){
    console.log(this.comment)
    const com = this.dialog.open(BuyCommentComponent,{
      data: {id:this.id}
    })
    com.afterClosed().subscribe(
      d => {
        this.loadData()
      }
    )
  }

  Onrepel(){
    console.log(this.repel)
    this.repel = true
    this.buyService.setBuyRepel(this.id,this.repel).subscribe(
      d => {
        console.log(d)
      }
    )
  }

  getRole(){
    const user = this.token.getUser()
    this.roles = user.roles
    this.isDirector = this.roles.includes('ROLE_DIRECTOR');
  }

  appoveBuy(){
    if(this.buy_status){
      this.repel = false
      this.buyService.setBuyRepel(this.id,this.repel).subscribe(
        d => {
          console.log(d)
        }
      )
    }
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
