import { Injectable } from "@angular/core";
import { User } from '../models/user.model';
import { Headers, Http } from '@angular/http';
import { Email } from '../models/email.model'



@Injectable()
export class RegisterService {

    constructor(private http: Http) { }

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private registerUrl = 'http://localhost:5000/api/users/registeration';
    private emailUrl='http://localhost:5000/api/sendMail';

    saveUserIntoDB(newUser: User) {

        console.log(newUser);
        return this.http
            .post(this.registerUrl, JSON.stringify(newUser), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as User)
            .catch(this.handleError);


    }

    sendRegistrationEmail(newUser: User,email:Email) {
        email.to=newUser.email;
        email.from=newUser.email;
        email.subject="Registration successful";
        email.bodyText="Hello "+newUser.firstName+". Your Registration is successful.Username:"+newUser.username+" password:"+newUser.password;
        return this.http
            .post(this.emailUrl, JSON.stringify(email), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Email)
            .catch(this.handleError);
}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}