import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BorrowService,Item} from '../../shared/service/borrow.service';
import { DurableService} from '../../shared/service/durable.service';


@Component({
  selector: 'app-dialog-bor',
  templateUrl: './dialog-bor.component.html',
  styleUrls: ['./dialog-bor.component.css']
})
export class DialogBorComponent implements OnInit {

  key: any =''
  dataRow = [];

  constructor(
    public Source: BorrowService,
    public durable: DurableService
    ) { }

  ngOnInit(): void {
    this.key = localStorage.getItem('filterKey')
    console.log('test')

    this.durable.filter(this.key).subscribe(
          data => {
            this.dataRow = data.return
            console.log(this.dataRow);
          }
    )
  }

  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status'];

  test(row: any){
    this.Source.pushService(row)
  }

}
