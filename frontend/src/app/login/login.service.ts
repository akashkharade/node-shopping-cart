import { Injectable } from "@angular/core";
import { User } from '../models/user.model'
import { Headers, Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../auth.service";
import { Observable } from 'rxjs';
declare var $: any;
@Injectable()
export class LoginService {

    user$: Observable<User>;

    constructor(
        private http: Http,
        private authService: AuthService,
        private router: Router) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginServiceUrl = 'http://localhost:5000/api/users/login';
    login(newUser: User) {
       // $('.modal-backdrop').remove();
        console.log(newUser.username, newUser.password);
        
        // authenticate user
        return this.user$ = this.http
            .post(this.loginServiceUrl, { username: newUser.username, password: newUser.password }, { headers: this.headers })
            .map(res =>{
                this.authService.user$ =  res.json().createdUser;  
                console.log("login success ",this.authService.user$);
              return this.authService.user$;
            } )
          .catch(this.handleError);

        // calling auth service
    }

    private handleError(error: any) { 
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        return Observable.throw(error);
    }
    
    /**
    * This functions logouts the user from the application.
    * 
    * @param userDetails 
    */
    public logout(userDetails: User): void {

        // log out user from the application
        this.authService.logout(userDetails);
        this.router.navigate(['/']);
    }
}