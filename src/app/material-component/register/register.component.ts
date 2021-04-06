import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../shared/service/auth.service';



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
    classes: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService: AuthService, public routes: Router, ) { }

  ngOnInit(): void {

  }

  onSubmit() : void {
    const { username, fullname, password,price,classes } = this.form;

    this.authService.register(username, fullname, password,price, classes).subscribe(
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

  reloadPage(): void {
    this.routes.navigateByUrl('/userlist')
  }
}
