import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  name: String = ''
  position: number = 0
  weight: number = 0
  symbol: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
