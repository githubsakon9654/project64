import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OfferService } from '../../../../shared/service/offer.service';
import { TokenStorageService } from '../../../../shared/service/token-storage.service';

export interface DialogData {
  id : number;
  sup_name: string;
  price: number;
  unit: number;
  unit_name: string;
  keys: string;
  keytwo: string;
  keyoffer: string;
  keyfrom: string;
}

@Component({
  selector: 'app-from-dialog',
  templateUrl: './from-dialog.component.html',
  styleUrls: ['./from-dialog.component.css']
})
export class FromDialogComponent implements OnInit {

  dataRow = [];
  fullname: string = ''
  class : string = ''
  offer_status: boolean = false
  isAdmin: boolean = false;
  offerAppove: boolean = false;
  private roles: string[] = [];
  id:number = 0

  constructor(
    public dialogRef: MatDialogRef<FromDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private token:TokenStorageService,
    private offerService: OfferService
    ) { }

  ngOnInit(): void {
    this.loadData()
    this.getRole()
  }
  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];

  loadData(){
    this.offerService.get_detail(this.data.id).subscribe(
      data => {
        console.log(data)
        this.dataRow = data.offer
        this.fullname = data.offer[0].fullname
        this.class = data.offer[0].classes
        this.id = data.offer[0].id
        this.offer_status = data.appove[0].offer_status
      }
    )
  }

  getRole(){
    const user = this.token.getUser()
    this.roles = user.roles
    this.isAdmin = this.roles.includes('ROLE_ADMIN');
  }

  appoveOffer(){
    console.log(this.offer_status)
    this.offerService.update_offer_app(this.id,this.offer_status).subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
