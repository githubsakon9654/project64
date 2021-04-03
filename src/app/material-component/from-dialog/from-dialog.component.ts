import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from '../from/from.component';

@Component({
  selector: 'app-from-dialog',
  templateUrl: './from-dialog.component.html',
  styleUrls: ['./from-dialog.component.css']
})
export class FromDialogComponent implements OnInit {

  name: String = ''
  position: number = 0
  weight: number = 0
  symbol: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }

  ngOnInit(): void {
  }

}
