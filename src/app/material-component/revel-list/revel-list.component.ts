import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { BuyService } from '../../shared/service/buy.service'
import { RevealComponent } from '../reveal/reveal.component';

@Component({
  selector: 'app-revel-list',
  templateUrl: './revel-list.component.html',
  styleUrls: ['./revel-list.component.css']
})
export class RevelListComponent implements OnInit {
  table: Array<any> = []
  constructor(
    public dialog: MatDialog,
    public Source: RevealService,
    public SupplieService: SupplieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('test')
    this.loadTable()
  }
  displayedColumns: string[] = ['id', 'admin_approve','dire_approvev', 'total_price', 'delete'];

  openform(){
    const dialog = this.dialog.open(RevealComponent,{
      width: '1500px'
    })
  }

  loadTable(){
    this.Source.getRevealList().subscribe(
      data => {
        this.table = data.reveal
        console.log(this.table)
      }
    )
  }
}
