import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { RegisterService } from '../register/register.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  returnUrl: string;
  error:string;
  

  user: User = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: '',
    userImgSrc: null,
    wallet_balance: null
};

  constructor( public log: LoginService, public auth: AuthService,public register_service: RegisterService) {
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


  saveUser(newUser: User) {
    this.register_service.saveUserIntoDB(newUser);
  }

  logout() {
    this.auth.logout();
  }

}
