import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: string[] = [];
  constructor() { }

  signOut():void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public getRole() {
    const user = this.getUser();
    this.roles = user.roles[0];
    var IsAdmin : boolean = false
    var IsUser : boolean = false
    var IsDircetor : boolean = false
    const roles = [
      {IsAdmin},
      {IsUser},
      {IsDircetor}
    ]

    if(this.roles == ["ROLE_USER"]){
      IsUser = this.roles.includes('ROLE_USER');
      roles[1].IsUser = IsUser
    } else if(this.roles == ["ROLE_ADMIN"]){
      IsAdmin = this.roles.includes('ROLE_ADMIN');
      roles[0].IsAdmin = IsAdmin
    } else if(this.roles == ["ROLE_DIRECTOR"]){
      IsDircetor = this.roles.includes('ROLE_DIRECTOR')
      roles[2].IsDircetor = IsDircetor
    }


    return roles
  }

}

