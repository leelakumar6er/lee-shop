import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  /**
   *Creates an instance of AdminAuthGuard.
   * @param {AuthService} auth
   * @memberof AdminAuthGuard
   */
  constructor(private auth: AuthService) { }

  /**
   *
   *
   * @returns {Observable<boolean>}
   * @memberof AdminAuthGuard
   */
  canActivate(): Observable<boolean> {
    return this.auth.AppUser$
      .map(appUser => appUser.isAdmin);
  }
}
