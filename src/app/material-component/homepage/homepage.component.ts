import { Component, OnInit } from '@angular/core';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  budgetYear:string = ''
  offer:boolean = false;



  constructor(
    private budget: BudgetYearService,
    private Offer: OfferService
  ) { }

  ngOnInit(): void {
    this.budgetYear = this.budget.budgetYear()
    this.getOffer()
  }

  getOffer(){
    this.Offer.get_offer().subscribe(
      data => {
        this.offer = data.appove
    }
  )
}

}
