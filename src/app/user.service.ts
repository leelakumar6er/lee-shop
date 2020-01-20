import { AppUser } from './../../models/app-users';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   *Creates an instance of UserService.
   * @param {AngularFireDatabase} db
   * @memberof UserService
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   *
   *
   * @param {firebase.User} user
   * @memberof UserService
   */
  save(user: firebase.User): void {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  /**
   *
   *
   * @param {string} uid
   * @returns {FirebaseObjectObservable<AppUser>}
   * @memberof UserService
   */
  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
