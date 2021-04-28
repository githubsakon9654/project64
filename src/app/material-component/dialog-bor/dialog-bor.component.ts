import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReturnsService } from 'src/app/shared/service/returns.service';
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
    public returnService: ReturnsService,
    public durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
    ) { }

  ngOnInit(): void {
    this.key = localStorage.getItem('filterKey')
    console.log(this.data.key)

    this.durable.filter(this.key).subscribe(
          data => {
            this.dataRow = data.return
            console.log(this.dataRow);
          }
    )
  }

  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status'];

  test(row: any){
    console.log(this.data.key)
    if(this.data.key = 'borrow'){
      this.Source.pushService(row)
      console.log('borrow')
    } else{
      this.returnService.pushService(row)
      console.log('return')
    }
  }

}
