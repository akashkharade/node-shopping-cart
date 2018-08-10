import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Email } from '../models/email.model';
import { RegisterService } from '../register/register.service';
import { LoginService } from './login.service';
import { Constants } from '../models/constants';
import { ActivatedRoute} from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';

declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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



  constructor(  private loginService: LoginService,
                private authService: AuthService, 
                private registerService: RegisterService,
                private activateRoute: ActivatedRoute) { }
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
      $("#loginModal").modal("hide");
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
      $("#loginModal").modal("hide");

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

}
