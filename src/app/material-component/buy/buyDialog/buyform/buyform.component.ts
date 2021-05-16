import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealDialogComponent} from '../../../reveal/dialog/reveal-dialog/reveal-dialog.component';
import { BuyService,Item} from '../../../../shared/service/buy.service';
import { SupplieService } from '../../../../shared/service/supplie.service';
import { UserService} from '../../../../shared/service/user.service'
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-buyform',
  templateUrl: './buyform.component.html',
  styleUrls: ['./buyform.component.css']
})
export class BuyformComponent implements OnInit {

  public row:Array<Item> = [];
  public row2:Array<any> = [];
  public offer:Array<any> = [];
  key :string = '';
  public total: Number = 0
  constructor(
    public dialog: MatDialog,
    public Source: BuyService,
    private dialogref: MatDialogRef<BuyformComponent>,
    public SupplieService: SupplieService,
    private userService: UserService,
    private offerService:OfferService
    ) { }

  ngOnInit(): void {
    this.loadTable()
    this.priceTotal()
    this.loadofferlist()
  }

  displayedColumns: string[] = ['id', 'supplie_name','unit','price',  'unit_name', 'delete'];

  keytest(){
    console.log('buy')
      const dialogRef = this.dialog.open(RevealDialogComponent,{
        data: {keytwo: 'buy'}
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

  loadofferlist(){
    this.offerService.get_unit_offer().subscribe(
      data => {
        this.offer = data.offer
        console.log(this.offer)
      }
    )
  }

  pullOffer(){
    var len = this.offer.length
    console.log(len)
    for(var i =0;i<len;i++){
      const result = {id: +this.offer[i].supplieId,supplie_name: this.offer[i].supplie_name,price:  +this.offer[i].sum,unit_name: this.offer[i].unit_name,unit: +this.offer[i].unit}
      this.Source.pushService(result)

    }
  }

  loadTable(){
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
      }
    })
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

  select(){
    const userId = Number(this.userService.getId())
    const price = Number(this.total)
    const supplie : Array<any> = []
    const units : Array<any> = []
    const sum : Array<any> = []
    if(userId){
      for(let i=0; i < this.row.length; i++){
        let array = Number(this.row[i].id)
        let unit = Number(this.row[i].unit)
        let price = Number(this.row[i].price *this.row[i].unit)
        supplie.push(array)
        units.push(unit)
        sum.push(price)
      }
      console.log(supplie)
      console.log(units)
      console.log(sum)
      this.SupplieService.insertBuyForm(userId,price,supplie,units,sum).subscribe(
          data => {
              console.log(data)
            }
      )

    }

    this.dialogref.close()
  }

}
