import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SupplieService } from '../../shared/service/supplie.service';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { BorrowService,Item} from '../../shared/service/borrow.service';
import { DurableService} from '../../shared/service/durable.service';
import { BorrowDurableComponent } from '../borrow-durable/borrow-durable.component';

@Component({
  selector: 'app-borrow-list',
  templateUrl: './borrow-list.component.html',
  styleUrls: ['./borrow-list.component.css']
})
export class BorrowListComponent implements OnInit {
  table: Array<any> = []
  role: Array<any> = []
  adAppove: boolean = false
  diAppove: boolean = false
  isUser: boolean = false

  constructor(
        public Source: BorrowService,
        public dialog: MatDialog,
        private tokenStorageService: TokenStorageService,
        public durable: DurableService,
        private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
  }
  displayedColumns: string[] = ['id', 'borrow_name', 'admin_approve','dire_approvev', 'delete'];

  openform(){
    const borrow = this.dialog.open(BorrowDurableComponent,{
      width: '1500px'
    })
    borrow.afterClosed().subscribe(
      d => {
        this.loadTable()
        this.Source.clear()
      }
    )
  }


  loadTable(){
    const id = Number(this.userService.getId())
    this.role = this.tokenStorageService.getRole()
    console.log(this.role)
    this.isUser = this.role[1].IsUser

    if(this.isUser){
      this.Source.getBorrowUserList(id).subscribe(
        data => {
          this.table = data.reveal

        }
      )

    } else {
      this.Source.getBorrowList().subscribe(
        data => {
          this.table = data.borrow
          console.log(this.table)
        }
      )
    }
  }

  openDetail(){

  }
}
