import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RevealService,Item } from '../../shared/service/reveal.service';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { BuyService } from '../../shared/service/buy.service'
import { RevealComponent } from '../reveal/reveal.component';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { RevealDetailComponent } from '../reveal/dialog/reveal-detail/reveal-detail.component';
@Component({
  selector: 'app-revel-list',
  templateUrl: './revel-list.component.html',
  styleUrls: ['./revel-list.component.css']
})
export class RevelListComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  table: Array<any> = []
  role: Array<any> = []
  adAppove: boolean = false
  diAppove: boolean = false
  isUser: boolean = false
  id = 0
  constructor(
    public dialog: MatDialog,
    public Source: RevealService,
    private tokenStorageService: TokenStorageService,
    public SupplieService: SupplieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id','name', 'admin_approve', 'total_price','date', 'delete'];

  openform(){
    const dialog = this.dialog.open(RevealComponent,{
      width: '1500px'
    })
    dialog.afterClosed().subscribe(result => {
      this.loadTable()
      this.Source.clear()
    });
  }

  getDate(){
    var start = (this.range.value.start).toISOString()
    var s = start.substring(0,10)
    var end = (this.range.value.end).toISOString()
    var e = end.substring(0,10)
    console.log(this.range.value.start)
    console.log(this.range.value.end)
    console.log(s)
    console.log(e)
    this.Source.getDAteList(s,e).subscribe(
      date => {
        this.table = date.date
        console.log(this.table)
      }
    )
  }

  openDetail(row: any){
    const dialog = this.dialog.open(RevealDetailComponent,{
      width: '1500px',
      data: {id: row.id}
    })
    dialog.afterClosed().subscribe(s => {
      this.loadTable()
    })
    console.log(row.id)
  }

  loadTable(){
    this.id = Number(this.userService.getId())
    this.role = this.tokenStorageService.getRole()
    console.log(this.role)
    this.isUser = this.role[1].IsUser

    if(this.isUser){
      this.Source.getRevealUserList(this.id).subscribe(
        data => {
          this.table = data.reveal
          console.log(this.table)

        }
      )

    } else {
      this.Source.getRevealList().subscribe(
        data => {
          this.table = data.reveal
          console.log(this.table)
        }
      )
    }
  }

  reportByUser(){
    if(!this.isUser){
      this.Source.reportList()
    } else{

      this.Source.reportByUser(this.id)
    }
  }

}
