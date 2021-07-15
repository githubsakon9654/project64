import { Component, OnInit,Inject } from '@angular/core';
import { SupplieService } from 'src/app/shared/service/supplie.service';
import { DialogData } from 'src/app/shared/service/user.service';
import { SupplieUpdateComponent } from '../supplielist.component';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';

@Component({
  selector: 'app-listhistory',
  templateUrl: './listhistory.component.html',
  styleUrls: ['./listhistory.component.css']
})
export class ListhistoryComponent implements OnInit {

  sup_row: Array<any> =[];
  displayedColumns: string[] = ['id','d', 'supplie_name','price', 'unit', 'unit_name','store'];

  constructor(public supplieServie: SupplieService,
    public dialogRef: MatDialogRef<ListhistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    console.log(this.data.id)
    this.loadDate()
  }

  loadDate(){
    this.supplieServie.getHistory(this.data.id).subscribe(
      data => {
        console.log(data.supplie);
        this.sup_row = data.supplie;
      }
    )
  }

}
