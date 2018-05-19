import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  returnUrl: string;

  user: User = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: '',
    userImgSrc: null,
    wallet_balance: null
};

  constructor( private log: LoginService, public auth: AuthService) {
  }

  login(newUser: User) {
    console.log(newUser);
    this.log.login(newUser);
    //this.auth.login(newUser)
    /*this.router.navigate(["products"])
    .catch(
      (reason) => {
        console.log("reason", reason);
      }
    );*/
  }

  logout() {
    this.auth.logout();
  }

}
