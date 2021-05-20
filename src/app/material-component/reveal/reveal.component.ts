import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../shared/service/user.service';
import { RevealDialogComponent} from './dialog/reveal-dialog/reveal-dialog.component';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { SupplieService } from '../../shared/service/supplie.service';
import { OfferService } from 'src/app/shared/service/offer.service';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.css']
})
export class RevealComponent implements OnInit {

  public row:Array<Item> = [];
  public row2:Array<Item> = [];
  key :string = '';
  public total: Number = 0
  userprice: number = 0
  canReveal: boolean = true;
  dataRow : Array<any> = [];
  lenDR:number = 0;
  fullname: string = ''
  class : string = ''
  offer_status: boolean = false
  id:number = 0
  offerSum:number = 0
  year:string = ''
  budget:number= 0
  offersPrice:number=0

  constructor(
    public dialog: MatDialog,
    public Source: RevealService,
    public dialogRef: MatDialogRef<RevealDialogComponent>,
    public SupplieService: SupplieService,
    private userService: UserService,
    private offerService: OfferService,
    private BudgetService: BudgetYearService
    ) {}

  ngOnInit(): void {
    this.loadTable()
    this.priceTotal()
    this.getUsername()
  }

  displayedColumns: string[] = ['id', 'offer_name', 'offer_status','date'];
  displayedColumn: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];

  keytest(){
      const dialogRef = this.dialog.open(RevealDialogComponent,{
        data: {keys:'reveal'}
      });
      dialogRef.afterClosed().subscribe(result => {
        localStorage.removeItem('filterKey');
      });
      console.log(this.key);
      localStorage.setItem('filterKey', this.key);
      this.SupplieService.filter(this.key,'').subscribe(
        data => {
          console.log(data);
        }
      )
  }

  deleteRow(row: any){
    const table = [row]
    this.Source.removeServices(table)
  }

  loadTable(){
    const userId = Number(this.userService.getId())
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
        console.log(this.row)
      }
    })
    this.offerService.get_reveal(userId).subscribe(
      data => {
        console.log(data)
        this.row2 = data.offers
        this.offerSum = data.offers[0].price
        console.log(this.offerSum)
      }
    )
  }

  priceTotal(){
    this.Source.total$.subscribe({
      next: t => {
        this.total = t
      }
    })
  }

  addPush(row: any){
    this.Source.addService(row.id)
  }

  removeOne(row: any){
    this.Source.removeService(row.id)
  }

  selected(row: any){
    console.log("selected!!")
    this.offerService.get_detail(row.id).subscribe(
      data => {
        this.dataRow = data.offer
        this.lenDR = this.dataRow.length
        this.fullname = data.offer[0].fullname
        this.class = data.offer[0].classes
        this.id = data.offer[0].id
        this.offer_status = data.appove[0].offer_status
        this.offersPrice = this.dataRow[0].offprice
        console.log(this.offersPrice)
        console.log(this.userprice)
      }
    )
  }

  select(){
    const userId = Number(this.userService.getId())
    const price = Number(this.offerSum)
    const supplie : Array<any> = []
    const units : Array<any> = []
    if(userId){
      for(let i=0; i < this.dataRow.length; i++){
        console.log(this.dataRow)
        let array = Number(this.dataRow[i].supplieId)
        let unit = Number(this.dataRow[i].unit)
        supplie.push(array)
        units.push(unit)
        console.log(this.dataRow[i].supplieId)
      }
      console.log(supplie)
      console.log(units)
      this.Source.insertReveal(userId,price,supplie,units).subscribe(
          data => {
              console.log(data)
            }
      )

      var sum = this.budget - this.offerSum
      this.offerService.updatebudget(userId,sum,this.year).subscribe(
        d => {}
      )

    }
    this.updatePrice(userId)
    this.close()
  }

  close(): void {
    this.dialogRef.close();
  }

  updatePrice(id:number){
    const price = this.userprice -  Number(this.total)
    this.userService.updateUserPrice(id,price).subscribe( o => {
      console.log(price)
    })
  }


  getUsername(){
    const username = String (this.userService.getUsername())
    console.log(username)
    this.userService.getUser(username).subscribe( s => {
      console.log(s)
      this.userprice = s.user.price
    })
    this.year = this.BudgetService.budgetYear()
    const userId = Number(this.userService.getId())
    this.userService.getBudgetUser(userId,this.year).subscribe(
      d => {
        console.log(d)
        this.budget = d.user[0].budget
      }
    )
  }

}
