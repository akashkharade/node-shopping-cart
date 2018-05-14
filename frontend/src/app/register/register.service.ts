import { Injectable } from "@angular/core";
import { User } from '../models/user.model'
import { Headers, Http } from '@angular/http';



@Injectable()
export class RegisterService {

    

    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private registerUrl = 'http://localhost:5000/api/users/registeration';
    saveUserIntoDB(newUser: User) {

        console.log(newUser);
        return this.http
            .post(this.registerUrl, JSON.stringify(newUser), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as User)
            .catch(this.handleError);


    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}