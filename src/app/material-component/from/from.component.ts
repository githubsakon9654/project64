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
  public rowThai:Array<any> = [];
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
  displayedColumns: string[] = ['id', 'offer_name', 'offer_status','date'];


  test(row:any){
    const dialogRef = this.dialog.open(FromDialogComponent,{
      width: '1500px',
      data: {id: row.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadTable()
    });

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
            row.push({id:dateR[i].id,Date:THdate,offer_name:dateR[i].offer_name,offer_status:dateR[i].offer_status
            ,price:dateR[i].price})

          }
          this.rowThai = row
          console.log(this.rowThai)
  }


  clear(){
    this.offerService.clearOffer().subscribe(
      d =>{}
    )
    this.loadTable()
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
        this.loopThaiDate(this.row)
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
