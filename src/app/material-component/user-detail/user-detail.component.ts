import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  name: string = ''
  position: number = 0
  weight: number = 0
  symbol: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.name)
    this.userService.getUser(this.name).subscribe(
      data => {
        console.log(data)
      }
    )
  }

}
