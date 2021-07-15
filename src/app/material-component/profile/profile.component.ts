import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserService} from '../../shared/service/user.service'
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { PasswordComponent } from './dialog/password/password.component';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  id:number= 0
  name:string =''
  classes:string =''
  price: number = 0
  username:string=''
  password:string=''
  year:string =''

  constructor(
    public dialog: MatDialog,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private budget:BudgetYearService
  ) {this.dataSource.data = TREE_DATA;}

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit(): void {
    this.loadData()
    console.log('test')
  }

  loadData(){
    this.year = this.budget.budgetYear()
    const id = Number(this.userService.getId())
    this.id = id
    this.userService.getUserId(id,this.year).subscribe(
      data => {
        console.log(this.id)
        console.log(data)
        this.id = data.user.id
        this.name = data.user.fullname
        this.classes = data.user.name
        this.username = data.user.username
        this.price = data.budget.budget
      }
    )
  }

  test(){
    console.log('test')
  }

  openChangePass(){
    const dialog = this.dialog.open(PasswordComponent,{
      width: '500px',
      data: {id:this.id}
    })
    dialog.afterClosed().subscribe(r =>{
      console.log(r)
      if(r == false){
        window.alert('เปลี่ยนรหัสผ่านล้มเหลว รหัสผ่านเก่าผิด')
      } else {
        window.alert('เปลี่ยนรหัสผ่านสำเร็จ')
      }
    })
  }



}
