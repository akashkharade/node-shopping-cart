import { User} from './models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Constants } from "../app/models/constants";
import { Http, Response, Headers } from '@angular/http';
import { Category } from "../app/models/category";

@Injectable()
export class AuthService {

  public user$: User;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  public BASE_URL: string = "http://localhost:5000";

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private http: Http
  ) { }

  login(user:User) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  /**
   * This method will logouts the user from the application.
   * 
   * @param user 
   */
  public logout(user: User) {
    
    console.log("Inside logout function: " + Constants.LOGOUT_SERVICE_URL);

    // added for logout
    this.user$ = null;
    //this.http.get(Constants.LOGOUT_SERVICE_URL);
    this.httpClient.get(Constants.LOGOUT_SERVICE_URL);
    //return this.http.get(Constants.LOGOUT_SERVICE_URL).map((res:Response) =>  res.json());
  }

  /**
   * This method is used to check whether the user is already logged in or not. If the user is 
   * already logged in it will show menu items on the nav bar.
   */
  checkIfUserLoggedIn() {

    console.log("inside AuthService.checkIfUserLoggedIn()#########");

    // check if user session already exists in the browser
    this.http.get(Constants.CHECK_IF_USER_ALREADY_LOGIN_SERVICE_URL).subscribe(
      res => {

        // check if user already exists
        if(res.json().error === undefined) {

          // user session exists
          this.user$ = res.json();
          
        } else {

          // user session doesnot exists
          console.log("User session doesnot exists: ", res.json().error);
        }    
      },
      err => {
        console.log("Error occured");
      }
    ); 
   }

  checkIfUserisLoggedin(){
    console.log("inside checkIfUserisLoggedIn()");
    return this.user$ == null;
  }
}
