import { Injectable } from "@angular/core";
import { User } from '../models/user.model'
import { Headers, Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "../auth.service";
declare var $: any;
@Injectable()
export class LoginService {

    constructor(
        private http: Http,
        private authService: AuthService) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private loginServiceUrl = 'http://localhost:5000/api/users/login';

    login(newUser: User) {
       // $('.modal-backdrop').remove();
        console.log(newUser.username, newUser.password);
        
        // authenticate user
        this.http
            .post(this.loginServiceUrl, { username: newUser.username, password: newUser.password }, { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as User)
            .catch(this.handleError);

        // calling auth service
        this.authService.login();   
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        console.error('Error message', error.statusText);
        return Promise.reject(error.message || error);
    }

}