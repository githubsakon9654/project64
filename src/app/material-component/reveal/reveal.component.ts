import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { RevealDialogComponent} from '../reveal-dialog/reveal-dialog.component';
import { RevealService,Item } from '../../shared/service/reveal.service';

@Component({
  selector: 'app-reveal',
  templateUrl: './reveal.component.html',
  styleUrls: ['./reveal.component.css']
})
export class RevealComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';
  public total: Number = 0
  constructor(
    public dialog: MatDialog,
    public Source: RevealService
    ) { }

  ngOnInit(): void {
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
      }
    })

    this.Source.total$.subscribe({
      next: t => {
        this.total = t
      }
    })
  }

  displayedColumns: string[] = ['id', 'supplie_name','price', 'unit', 'unit_name'];

  keytest(){
      const dialogRef = this.dialog.open(RevealDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        localStorage.removeItem('filterKey');
      });
      console.log(this.key);
      localStorage.setItem('filterKey', this.key);
      this.Source.filter(this.key).subscribe(
        data => {
          console.log(data);
        }
      )
  }

  select(){
    console.log(this.row.length);
    for(let i=0; i < this.row.length; i++){
      console.log(i)
      console.log(this.row[i].supplie_name);
    }
  }

}
