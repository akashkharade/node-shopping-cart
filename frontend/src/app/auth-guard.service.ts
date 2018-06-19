import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    if ( this.auth.user$) return true;

    this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
    return false;

    /*return this.auth.user$.map(user => {
      if (user) return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    });*/
  }

}
