import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems} from '../../../shared/menu-items/menu-items';
import { RevealService } from '../../../shared/service/reveal.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy,OnInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  public menu = {}
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
  }
  ngOnInit(): void {
    this.list.user$.subscribe({
      next: s => {
        this.role = s
      }
    })
    this.isAdmin()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  isAdmin(){
    if(localStorage.getItem('auth') == 'ROLE_USER'){
      this.menu = this.menuItems.getMenuUser()
      console.log(localStorage.getItem('auth'))
    } else if(localStorage.getItem('auth') == 'ROLE_DIRECTOR'){
      this.menu = this.menuItems.getMenuDirector()
      console.log(localStorage.getItem('auth'))
    } else if(localStorage.getItem('auth') == 'ROLE_ADMIN'){
      this.menu = this.menuItems.getMenuitem()
      console.log(localStorage.getItem('auth'))
    }
  }
}
