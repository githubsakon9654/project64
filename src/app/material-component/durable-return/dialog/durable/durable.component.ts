import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DurableService} from '../../../../shared/service/durable.service';
import { ReturnsService,Item } from 'src/app/shared/service/returns.service';

@Component({
  selector: 'app-durable',
  templateUrl: './durable.component.html',
  styleUrls: ['./durable.component.css']
})
export class DurableComponent implements OnInit {

  key: any =''
  dataRow = [];

  constructor(
    public returnService: ReturnsService,
    public durable: DurableService,
    @Inject(MAT_DIALOG_DATA) public data: Item
  ) { }

  ngOnInit(): void {
    this.key = localStorage.getItem('filterKey')

    this.returnService.filter(this.data.userId,this.key).subscribe(
      data => {
        this.dataRow = data.return
        console.log(this.dataRow);
      }
    )
  }

  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status'];
  test(row: any){
      this.returnService.pushService(row)
      console.log('return')
  }

}
