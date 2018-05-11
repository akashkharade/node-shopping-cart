import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: '',
    userImgSrc: null,
    wallet_balance: null
  };
  constructor() { }

  ngOnInit() {
  }

  saveUser(newUser: User) {

    console.log(newUser);
  }

}
