import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService } from '../../../../shared/service/user.service';
import { RevealService,Item } from '../../../../shared/service/reveal.service';
import { SupplieService } from '../../../../shared/service/supplie.service';
import { RevealDialogComponent} from '../../../reveal/dialog/reveal-dialog/reveal-dialog.component';
import { OfferService } from '../../../../shared/service/offer.service';

@Component({
  selector: 'app-from-detail',
  templateUrl: './from-detail.component.html',
  styleUrls: ['./from-detail.component.css']
})
export class FromDetailComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';
  public total: Number = 0
  userprice: number = 0
  canReveal: boolean = true;

  constructor(
    public dialog: MatDialog,
    public Source: OfferService,
    public dialogRef: MatDialogRef<RevealDialogComponent>,
    public SupplieService: SupplieService,
    private userService: UserService
    ) {}

  ngOnInit(): void {
    this.loadTable()
    this.priceTotal()
    this.getUsername()
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name', 'delete'];

  keytest(){
      const dialogRef = this.dialog.open(RevealDialogComponent,{
        data: {keyoffer:'offer'}
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
    const offer_name =  String (this.userService.getUsername())
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
      this.Source.insertOffer(userId,offer_name,supplie,units).subscribe(
        data => {
            console.log(data)
          }
    )
    }
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
  }
}
