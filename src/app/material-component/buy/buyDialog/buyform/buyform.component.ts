import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealDialogComponent} from '../../../reveal/dialog/reveal-dialog/reveal-dialog.component';
import { BuyService,Item} from '../../../../shared/service/buy.service';
import { SupplieService } from '../../../../shared/service/supplie.service';
import { UserService} from '../../../../shared/service/user.service'

@Component({
  selector: 'app-buyform',
  templateUrl: './buyform.component.html',
  styleUrls: ['./buyform.component.css']
})
export class BuyformComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';
  public total: Number = 0
  constructor(
    public dialog: MatDialog,
    public Source: BuyService,
    public SupplieService: SupplieService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.loadTable()
    this.priceTotal()
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name', 'delete'];

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
      this.SupplieService.filter(this.key).subscribe(
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
    if(userId){
      for(let i=0; i < this.row.length; i++){
        let array = Number(this.row[i].id)
        let unit = Number(this.row[i].unit)
        supplie.push(array)
        units.push(unit)
      }
      console.log(supplie)
      console.log(units)
      this.SupplieService.insertBuyForm(userId,price,supplie,units).subscribe(
          data => {
              console.log(data)
            }
      )

    }
  }

}
