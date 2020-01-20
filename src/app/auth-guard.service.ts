import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *Creates an instance of AuthGuard.
   * @param {AuthService} auth
   * @param {Router} route
   * @memberof AuthGuard
   */
  constructor(private auth: AuthService, private route: Router) { }

  /**
   *
   *
   * @param {*} _route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean>}
   * @memberof AuthGuard
   */
  canActivate(_route: any, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.map(user => {
      if (user) return true;
      this.route.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    });
  }
}
