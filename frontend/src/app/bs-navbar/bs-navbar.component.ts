import { AuthService } from '../auth.service';
import { User } from '../models/user.model';
import { Email } from '../models/email.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { RegisterService } from '../register/register.service';
import { Observable } from 'rxjs';
import { Constants } from "../models/constants";

declare var $: any;

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  public errorMessage: string = ""; // to display the error message
  
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

email: Email = {
  to: null,
  from: null,
  subject: null,
  bodyText: null
};

  /**
   * Gets the instance.
   * 
   * @param loginService 
   * @param authService 
   * @param registerService 
   * @param activateRoute 
   */
  constructor(
    private loginService: LoginService, 
    private authService: AuthService, 
    private registerService: RegisterService, 
    private activateRoute: ActivatedRoute) {
  }

  /**
   * This method authenticates the user in database.
   * 
   * @param newUser
   */
  public login(newUser: User): void {

    // authenticate user
    this.loginService.login(newUser).subscribe((user) => {
  
      // sets the return url in local storage
      this.setReturnUrlInLocalStorage();
      
      // hide the modal window if the user authentication is successfull
      $("#myModal").modal("hide");
    }, (err) => {
      console.log("Exception occured in login().bs-navbar.component.ts file", err);
      this.errorMessage = "Invalid Credentials...";
    });
  }


  /**
   * This function registers the user in database and makes the user login into the application.
   * 
   * @param newUser
   */
  public saveUser(newUser: User): void {

    // register the user in database
    this.registerService.saveUserIntoDB(newUser);

    // fetch user details from database
    this.loginService.login(newUser).subscribe((user) => {

      // sets the return url in local storage
      this.setReturnUrlInLocalStorage();

      // hide the modal window if the user registration is successfull
      $("#myModal").modal("hide");

    }, (err) => {
      console.log("Exception occured in saveUser().bs-navbar.component.ts file", err);
      this.errorMessage = "We have encountered a Systm Exception...";
    });

    //sends email to registered user
    this.registerService.sendRegistrationEmail(newUser,this.email);
  }

  /**
   * This method sets the return url in the local storage.
   */
  private setReturnUrlInLocalStorage(): void {

      let returnUrl = this.activateRoute.snapshot.queryParamMap.get(Constants.RETURN_URL) || '/';

      // set in local storage
      localStorage.setItem(Constants.RETURN_URL, returnUrl);
  }

  /**
   * This functions logouts the user from the application.
   * 
   * @param userDetails 
   */
  public logout(userDetails: User): void {

    // log out user from the application
    this.authService.logout(userDetails);
  }
}
