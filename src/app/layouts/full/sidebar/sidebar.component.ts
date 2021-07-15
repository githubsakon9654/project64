import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems} from '../../../shared/menu-items/menu-items';
import { RevealService } from '../../../shared/service/reveal.service';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: FoodNode[];
}

// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [
//       {name: 'supplie'},
//       {name: 'Banana'},
//       {name: 'Fruit loops'},
//     ]
//   }, {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [
//           {name: 'Broccoli'},
//           {name: 'Brussels sprouts'},
//         ]
//       }, {
//         name: 'Orange',
//         children: [
//           {name: 'Pumpkins'},
//           {name: 'Carrots'},
//         ]
//       },
//     ]
//   },
// ];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class AppSidebarComponent implements OnDestroy,OnInit {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  mobileQuery: MediaQueryList;
  UserRole : boolean = false
  private _mobileQueryListener: () => void;
  public menu = {}
  public menu2 = {}
  public menu3 = {}
  public menu4 = {}
  public menutree = {}
  role:String = ''

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    private list: RevealService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tree()
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.list.user$.subscribe({
      next: s => {
        this.role = s
      }
    })
    // this.isAdmin()
    this.tree()
  }

  tree(){
    if(localStorage.getItem('auth') == 'ROLE_USER'){
      this.UserRole = true;
      this.menu = this.menuItems.getMenuUser1()
      this.menu2 = this.menuItems.getMenuUser2()
      this.menu3 = this.menuItems.getMenuUser3()
      console.log(localStorage.getItem('auth'))
    } else if(localStorage.getItem('auth') == 'ROLE_DIRECTOR'){
      this.menu = this.menuItems.getMenuDirector1()
      this.menu2 = this.menuItems.getMenuDirector2()
      this.menu3 = this.menuItems.getMenuDirector3()
      this.menu4 = this.menuItems.getMenuDirector4()
      console.log(localStorage.getItem('auth'))
    } else if(localStorage.getItem('auth') == 'ROLE_ADMIN'){
      this.menu = this.menuItems.getMenuAdmin1()
      this.menu2 = this.menuItems.getMenuAdmin2()
      this.menu3 = this.menuItems.getMenuAdmin3()
      this.menu4 = this.menuItems.getMenuAdmin4()
      console.log(localStorage.getItem('auth'))
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // isAdmin(){
  //   if(localStorage.getItem('auth') == 'ROLE_USER'){
  //     this.menu = this.menuItems.getMenuUser()
  //     console.log(localStorage.getItem('auth'))
  //   } else if(localStorage.getItem('auth') == 'ROLE_DIRECTOR'){
  //     this.menu = this.menuItems.getMenuDirector()
  //     console.log(localStorage.getItem('auth'))
  //   } else if(localStorage.getItem('auth') == 'ROLE_ADMIN'){
  //     this.menu = this.menuItems.getTree()
  //     console.log(localStorage.getItem('auth'))
  //   }
  // }
}
