import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BudgetYearService } from 'src/app/shared/service/budget-year.service';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { UserService} from '../../shared/service/user.service'

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.css']
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  date:string=''

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private tokenStorageService: TokenStorageService,
    public routes: Router,
    private userService: UserService,
    private budgetService: BudgetYearService
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user)
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      console.log(this.roles)
      localStorage.setItem('auth', this.roles[0])
      this.username = user.fullname;
    } else {
      localStorage.removeItem('auth')
      this.link()
    }
    this.date = this.budgetService.budgetYear()
    console.log(this.date)
  }

  logout(): void {
    this.tokenStorageService.signOut();
    localStorage.removeItem('auth')
    this.link()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  profile(){
    this.routes.navigateByUrl('/profile')
  }

  link(){
    this.routes.navigateByUrl('/login')
  }
}
