//import { AppUser } from './models/app-user';
import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { p } from '@angular/core/src/render3';
//import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
//import * as firebase from 'firebase';

@Injectable()
export class UserService {
  
  public BASE_URL: string = "http://localhost:5000";

  constructor(private http:Http) { }

  getAllUsers() {
    return this.http.get(this.BASE_URL+"/api/getAllUsers")
        .map((data: any) => data.json())
        .do( data => console.log('All: ' +  JSON.stringify(data)))
        .catch(this.handleError);
  }

  
  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
}
  save(user: User) {
//    this.db.object('/users/' + user.uid).update({
//      name: user.displayName,
//      email: user.email
//    });
  }

//  get(uid: string): FirebaseObjectObservable<AppUser> {
//    return this.db.object('/users/' + uid);
//  }

}
