import { AppUser } from './../../models/app-users';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;

  /**
   *Creates an instance of AuthService.
   * @param {UserService} userService
   * @param {AngularFireAuth} afAuth
   * @param {ActivatedRoute} route
   * @memberof AuthService
   */
  constructor(private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  /**
   *
   *
   * @memberof AuthService
   */
  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  /**
   *
   *
   * @memberof AuthService
   */
  logout(): void {
    this.afAuth.auth.signOut();
  }

  /**
   *
   *
   * @readonly
   * @type {Observable<AppUser>}
   * @memberof AuthService
   */
  get AppUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);
        return Observable.of(null);
      });
  }
}
