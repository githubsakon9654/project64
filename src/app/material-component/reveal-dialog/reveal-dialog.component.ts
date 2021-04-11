import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { RevealService,Item } from '../../shared/service/reveal.service';

export interface PeriodicElement {
  id: number;
  supplie_name: string;
  unit: number;
  price: number;
  unit_name: string;
  createdAt: string;
  updatedAt: string;
}


@Component({
  selector: 'app-reveal-dialog',
  templateUrl: './reveal-dialog.component.html',
  styleUrls: ['./reveal-dialog.component.css'],
})
export class RevealDialogComponent implements OnInit {

  key: any =''
  dataRow = [];



  constructor(public Source: RevealService) { }

  ngOnInit(): void {

    this.key = localStorage.getItem('filterKey')
    console.log('test')

    this.Source.filter(this.key).subscribe(
          data => {
            this.dataRow = data.return
            console.log(this.dataRow);
          }
    )
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];



  test(row: any){
    const reveal = {id: row.id,supplie_name:row.supplie_name,price: row.price,unit_name:row.unit_name,unit:1}
    this.Source.pushService(reveal)
  }


}
