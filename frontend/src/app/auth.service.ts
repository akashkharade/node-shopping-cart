import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  user$: Observable<User>;

  constructor( private route: ActivatedRoute,// private afAuth: AngularFireAuth
  ) {
    //this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    //this.afAuth.auth.signOut();
  }

}
