import { Component, OnInit } from '@angular/core';
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-unit-offer',
  templateUrl: './unit-offer.component.html',
  styleUrls: ['./unit-offer.component.css']
})
export class UnitOfferComponent implements OnInit {
  row =[];
  constructor(
    private offerService: OfferService
  ) { }

  displayedColumns: string[] = ['id', 'offer_name','offer_status','unit_name'];

  ngOnInit(): void {
    this.loadTable()
  }


  loadTable(){
    this.offerService.get_unit_offer().subscribe(
      data => {
        console.log(data)
        this.row = data.offer
      }
    )
  }
}
