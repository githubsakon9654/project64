import { Component, OnInit } from '@angular/core';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { OfferService } from 'src/app/shared/service/offer.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BuyDetailComponent } from '../buy/buyDialog/buy-detail/buy-detail.component';
import { UserService } from 'src/app/shared/service/user.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  budgetYear:string = ''
  offer:boolean = false;
  public link = 'from';
  id:number = 0
  bid:number = 0
  dire:boolean = false;


  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private budget: BudgetYearService,
    private Offer: OfferService
  ) { }

  ngOnInit(): void {
    this.budgetYear = this.budget.budgetYear()
    this.getOffer()
    this.id = Number(this.userService.getId())
    console.log(this.id)
    this.loadDate()
  }

  getOffer(){
    this.Offer.get_offer().subscribe(
      data => {
        this.offer = data.appove
    }
  )
}

loadDate(){
  this.userService.getDirecBuy(this.id).subscribe(
    data => {
      this.bid = data.user[0].id
      console.log(this.id)
      if(!data.user.length){
        console.log('no')
      } else {
        console.log('yes')
        this.dire = true
      }
    }
  )
}

openDetail(){
  const dialogDetail = this.dialog.open(BuyDetailComponent,{
    width: '1500px',
    data: {id:this.bid}
  })
}

}
