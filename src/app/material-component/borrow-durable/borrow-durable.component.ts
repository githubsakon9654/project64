import { Component, OnInit } from '@angular/core';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { DialogBorComponent } from '../dialog-bor/dialog-bor.component';
import {MatDialog} from '@angular/material/dialog';
import { SupplieService } from '../../shared/service/supplie.service';

@Component({
  selector: 'app-borrow-durable',
  templateUrl: './borrow-durable.component.html',
  styleUrls: ['./borrow-durable.component.css']
})
export class BorrowDurableComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';

  constructor(
        public Source: RevealService,
        public dialog: MatDialog,
        public Supplie: SupplieService
  ) { }

  ngOnInit(): void {
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
      }
    })
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];

  keytest(){
    const dialogRef = this.dialog.open(DialogBorComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      localStorage.removeItem('filterKey');
    });
    console.log(this.key);
    localStorage.setItem('filterKey', this.key);
    this.Supplie.filter(this.key).subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
