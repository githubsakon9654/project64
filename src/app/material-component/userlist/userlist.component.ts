import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService} from '../../shared/service/user.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  row: Array<any> = []
  key: String =''

  constructor(public dialog: MatDialog,private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.row = data.users
        console.log(this.row)
      }
    )
  }

  open(){
    const register = this.dialog.open(RegisterComponent);
    register.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDetail(row: any){
    const detail = this.dialog.open(UserDetailComponent)
    detail.componentInstance.name = row.username
  }

  displayedColumns: string[] = ['id','username', 'fullname','class' , 'price'];

}
