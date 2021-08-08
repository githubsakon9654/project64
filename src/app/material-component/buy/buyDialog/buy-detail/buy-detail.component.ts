import { Component, OnInit, Inject, Directive, TemplateRef, ViewChild } from '@angular/core';
import { BuyService, DialogData } from '../../../../shared/service/buy.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';
import { BuyCommentComponent } from '../buy-comment/buy-comment.component';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { SupplieService } from 'src/app/shared/service/supplie.service';
import { from } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';

interface store {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-buy-detail',
  templateUrl: './buy-detail.component.html',
  styleUrls: ['./buy-detail.component.css']
})
export class BuyDetailComponent implements OnInit {

  stores: store[] = [];
  names: store[] = [];
  dataRow = [];
  datain = [];
  fullname: string = ''
  class: string = ''
  price: number = 0
  isDirector: boolean = false
  buy_status: boolean = false
  private roles: string[] = [];
  id: number = 0
  repel: boolean = false
  accept: boolean = false
  comment: string = ''
  onCom: boolean = false
  year: string = ''
  form: any = {
    store:null
  };
  form2: any = {
    fname:null
  };
  dire2:number = 0
  direname:string = ''
  isDT:boolean = false

  constructor(
    public dialog: MatDialog,
    private buyService: BuyService,
    private token: TokenStorageService,
    private budget: BudgetYearService,
    public dialogRef: MatDialogRef<BuyDetailComponent>,
    private supplieService: SupplieService,
    private userService : UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  displayedColumns: string[] = ['id','store', 'supplie_name', 'price', 'unit', 'unit_name'];

  ngOnInit(): void {
    this.loadData()
    this.getRole()
    this.getCate()
    this.getUserAll()
    this.year = this.budget.budgetYear()
    console.log(this.year.substring(2, 4))

  }

  loadData() {
    this.buyService.getDetail(this.data.id).subscribe(
      data => {
        console.log(data)
        this.dataRow = data.buy
        this.fullname = data.buy[0].fullname
        this.class = data.buy[0].name
        this.price = data.buy[0].buyprice
        this.id = data.buy[0].id
        this.buy_status = data.buy[0].status
        this.repel = data.buy[0].repel
        this.accept = data.buy[0].accept
        this.comment = data.buy[0].store
        this.dire2 = data.buy[0].userId2
        console.log(this.dire2)
        this.direname = data.buy2[0].fullname
        const Uid = Number(this.userService.getId())
        if(Uid == this.dire2){
          this.isDT = true
          console.log(this.isDT)
        }
      }
    )
  }

  getCate() {
    this.supplieService.getStore().subscribe(
      date => {
        this.stores = date.store
        console.log(this.stores)
      }
    )
  }

  onSubmit(){
    const {store} = this.form
    console.log(store)
  }
  onSubmit2(){
    const {fname} = this.form2
    console.log(fname)
    this.buyService.updateBuy(this.id,fname).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  Oncomment() {
    console.log(this.comment)
    const com = this.dialog.open(BuyCommentComponent, {
      data: { id: this.id }
    })
    com.afterClosed().subscribe(
      d => {
        this.loadData()
      }
    )
  }

  Onrepel() {
    console.log(this.repel)
    this.repel = true
    this.buyService.setBuyRepel(this.id, this.repel).subscribe(
      d => {
        console.log(d)
      }
    )
  }

  getUserAll(){
    this.userService.getAllUsers('').subscribe(
      data => {
        console.log(data.users)
        this.names = data.users
      }
    )
  }

  getRole() {
    const user = this.token.getUser()
    this.roles = user.roles
    this.isDirector = this.roles.includes('ROLE_DIRECTOR');
  }

  appoveBuy() {
    var Y = this.year.substring(2, 4);
    if (this.buy_status) {
      this.repel = false
      this.buyService.setBuyRepel(this.id, this.repel).subscribe(
        d => {
          console.log(d)
        }
      )
    }
    this.buyService.setBuyStatus(this.id, this.buy_status, Y).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  setAccept() {
    this.accept = true;
    var Y = this.year.substring(2, 4);
    this.buyService.setAccept(this.id,Y).subscribe(
      data => {
        console.log(data)
      }
    )
    this.buyService.getDetail(this.data.id).subscribe(
      data => {
        console.log(this.id)
        for (let x in this.dataRow) {
          console.log(data.buy[x].supplieId)
          this.supplieService.updateUnitSupplie(data.buy[x].supplieId, data.buy[x].unit, this.year).subscribe(
            data => {
            }
          )
          this.buyService.setRamain(data.buy[x].supplieId,data.buy[x].unit,this.year,this.id).subscribe()


        }
      }
    )
  }

  reportbuyform() {
    this.buyService.reportbuyform(this.id)
  }


}
