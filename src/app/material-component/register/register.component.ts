import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../shared/service/auth.service';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable,from } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';

interface clss {
  id: number;
  name: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    name: null,
    password: null,
    price: null,
    classes: null,
    roles: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  classe: clss[] = [];
  myControl = new FormControl();
  options: string[] = ['admin', 'user', 'director'];
  filteredOptions = new Observable

  constructor(
    private authService: AuthService,
    public routes: Router,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.loadClass()
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }


  loadClass(){

    this.userService.getClass().subscribe(
      date => {
        this.classe = date.classe
        console.log(this.classe)
      }
    )

  }

  onSubmit() : void {
    const { username, fullname, password,price,classes,role} = this.form;

    this.authService.register(username, fullname, password,price, classes,role).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
