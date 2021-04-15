import { Component, OnInit ,Inject} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { RevealService,Item } from '../../../../shared/service/reveal.service';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplieService } from '../../../../shared/service/supplie.service';
import { BuyService } from '../../../../shared/service/buy.service'
export interface DialogData {
  id : number;
  sup_name: string;
  price: number;
  unit: number;
  unit_name: string;
  keys: string;
  keytwo: string;
}

@Component({
  selector: 'app-reveal-dialog',
  templateUrl: './reveal-dialog.component.html',
  styleUrls: ['./reveal-dialog.component.css'],
})
export class RevealDialogComponent implements OnInit {

  key: any =''
  dataRow = [];



  constructor(
    public Source: RevealService,
    public dialogRef: MatDialogRef<RevealDialogComponent>,
    public SupplieService: SupplieService,
    public Buy:BuyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

    this.key = localStorage.getItem('filterKey')
    console.log('test')

    this.SupplieService.filter(this.key).subscribe(
          data => {
            this.dataRow = data.return
            console.log(this.dataRow);
          }
    )
    if(this.data.keys){
      console.log('reveal')
    } else if (this.data.keytwo){
      console.log('buy')
    }

    console.log(this.data)
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];



  test(row: any){

    const result = {id: row.id,supplie_name:row.supplie_name,price: row.price,unit_name:row.unit_name,unit:1}

    if(this.data.keys){
      this.Source.pushService(result)
      console.log('reveal')
    } else if (this.data.keytwo){
      console.log('buy')
      this.Buy.pushService(result)
    }
  }


}
