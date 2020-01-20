import { IProduct } from './../../models/product.interface';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  /**
   *Creates an instance of ProductService.
   * @param {AngularFireDatabase} db
   * @memberof ProductService
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   *
   *
   * @param {IProduct} product
   * @returns {*}
   * @memberof ProductService
   */
  create(product: IProduct): any {
    return this.db.list("/products").push(product);
  }

  /**
   *
   *
   * @returns {Observable<any[]>}
   * @memberof ProductService
   */
  getAll(): Observable<any[]> {
    return this.db.list("/products");
  }

  /**
   *
   *
   * @param {string} productId
   * @returns {FirebaseObjectObservable<any>}
   * @memberof ProductService
   */
  get(productId: string): FirebaseObjectObservable<any> {
    return this.db.object('/products/' + productId);
  }

  /**
   *
   *
   * @param {string} productId
   * @param {IProduct} product
   * @returns {*}
   * @memberof ProductService
   */
  update(productId: string, product: IProduct): any {
    return this.db.object('/products/' + productId).update(product);
  }

  /**
   *
   *
   * @param {string} productId
   * @returns {*}
   * @memberof ProductService
   */
  delete(productId: string): any {
    return this.db.object('/products/' + productId).remove();
  }

}
