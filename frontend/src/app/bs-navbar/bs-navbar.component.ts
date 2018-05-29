import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { RegisterService } from '../register/register.service';
import { Observable } from 'rxjs';
declare var $: any;

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  returnUrl: string;
  error:string;
  errorMessage:string;
  

  user: User = {
    username: null,
    password: null,
    firstName: null,
    lastName: null,
    email: '',
    userImgSrc: null,
    wallet_balance: null,
    _id:null
};

loginUser: User = {
  username: null,
  password: null,
  firstName: null,
  lastName: null,
  email: '',
  userImgSrc: null,
  wallet_balance: null,
  _id:null
};

  constructor( public log: LoginService, public authService: AuthService,public register_service: RegisterService) {
  }

  login(newUser: User) {
    console.log(newUser);
    this.errorMessage = "";
    this.log.login(newUser).subscribe((user) => {
      //this.user = user;
      this.authService.login(newUser);
      $("#myModal").modal("hide");
    }, (err) => {
      console.log("=============" + err);
      this.errorMessage = "Invalid Login Credentials...";
      
    });
  
  }


  saveUser(newUser: User) {
    this.register_service.saveUserIntoDB(newUser);
    this.authService.login(newUser);
    $("#myModal").modal("hide");
  }

  logout(userDetails: User) {
    this.authService.logout(userDetails);
  }

}
