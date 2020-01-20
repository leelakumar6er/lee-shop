import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  /**
   *Creates an instance of CategoryService.
   * @param {AngularFireDatabase} db
   * @memberof CategoryService
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   *
   *
   * @returns {FirebaseListObservable<any[]>}
   * @memberof CategoryService
   */
  getAll(): FirebaseListObservable<any[]> {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}
