import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  user$: User;

  constructor( private route: ActivatedRoute,// private afAuth: AngularFireAuth
  ) {
    //this.user$ = afAuth.authState;
  }

  login(user:User) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.user$ = user;
    console.log("************************"+ user.username);
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(user: User) {
    // added for log out
    this.user$ = null;
    //this.afAuth.auth.signOut();
  }

}
