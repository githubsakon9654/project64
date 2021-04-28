import { Component, OnInit,Inject } from '@angular/core';
import { DialogBorComponent } from '../../../dialog-bor/dialog-bor.component';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DurableService} from '../../../../shared/service/durable.service';
import { UserService } from '../../../../shared/service/user.service';
import { ReturnsService,Item } from 'src/app/shared/service/returns.service';
import { DurableComponent } from '../durable/durable.component';

@Component({
  selector: 'app-return-form',
  templateUrl: './return-form.component.html',
  styleUrls: ['./return-form.component.css']
})
export class ReturnFormComponent implements OnInit {

  public row:Array<Item> = [];
  key :string = '';
  re_name: string = '';

  constructor(
        public Source: ReturnsService,
        public dialog: MatDialog,
        private dialogRef: MatDialogRef<ReturnFormComponent>,
        public durable: DurableService,
        @Inject(MAT_DIALOG_DATA) public data: Item,
        private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadTable()
    const username = String(this.userService.getUsername())
    console.log(username)
    this.userService.getUser(username).subscribe(
      d => {
        console.log(d.user.fullname)
        this.re_name = d.user.fullname
      }
    )
  }

  displayedColumns: string[] = ['id', 'du_name','du_serial', 'du_status','delete'];

  loadTable(){
    this.Source.source$.subscribe({
      next: s => {
        this.row = s
      }
    })
  }


  keytest(){
    const dialogRef = this.dialog.open(DurableComponent,{
      width: '1000px',
      data: {key: 'return', userId: this.data.userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      localStorage.removeItem('filterKey');
    });
    console.log(this.key);
    localStorage.setItem('filterKey', this.key);
    this.durable.filter(this.key).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  select(){
    const userId = Number(this.userService.getId())
    const durable : Array<any> = []
    if(userId){
      for(let i=0; i < this.row.length; i++){
        let array = Number(this.row[i].id)
        durable.push(array)
      }
      this.Source.insertReturn(userId,this.re_name,durable).subscribe(
        data => {
          console.log(data)
        }
      )
      console.log(durable)
    }
    this.dialogRef.close()
  }

  deleteRow(row:any){
    const table = [row]
    this.Source.removeServices(table)
  }
}
