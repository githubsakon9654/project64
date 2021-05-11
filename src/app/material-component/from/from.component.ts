import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { FromDialogComponent } from './dialog/from-dialog/from-dialog.component';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { OfferService } from '../../shared/service/offer.service';
import { FromDetailComponent } from './dialog/from-detail/from-detail.component';
import { UnitOfferComponent } from './dialog/unit-offer/unit-offer.component';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {

  public row:Array<any> = [];
  key :string = '';
  name: String = '';
  isChecked: boolean = false;
  offer:boolean = false;
  IsAdmin : boolean = false
  IsUser : boolean = false
  IsDircetor : boolean = false
  role:Array<any> = []


  constructor(
    public dialog: MatDialog,
    private token:TokenStorageService,
    private offerService: OfferService
    ) { }

  ngOnInit(): void {
    this.Role()
    this.getOffer()
    this.loadTable()
  }
  displayedColumns: string[] = ['id', 'offer_name', 'offer_status'];


  test(row:any){
    const dialogRef = this.dialog.open(FromDialogComponent,{
      width: '1500px',
      data: {id: row.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable()
    });

  }

  clear(){
    this.offerService.clear()
  }

  unit(){
    const dialogRef = this.dialog.open(UnitOfferComponent,{
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable()
    });

  }

  loadTable(){
    this.offerService.get_list_offer().subscribe(
      data => {
        console.log(data)
        this.row = data.offers
      }
    )
  }

  setOffer(){
    this.offerService.set_offer(this.isChecked).subscribe(
      data =>{
        console.log(data)
        this.getOffer()
      }
      )
  }

  openReport(){
    this.offerService.report()
  }

  getOffer(){
      this.offerService.get_offer().subscribe(
        data => {
          this.offer = data.appove
          this.isChecked = data.appove
      }
    )
  }

  openDetail(){
    console.log('test')
    const dialog = this.dialog.open(FromDetailComponent,{
      width: '1500px'
    })
    dialog.afterClosed().subscribe(result => {
      this.loadTable()
      this.offerService.clear()
    });
  }

  Role(){
    this.role = this.token.getRole()
    this.IsUser = this.role[1].IsUser
    console.log(this.IsUser)
  }
}
