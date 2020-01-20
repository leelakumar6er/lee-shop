import { ShoppingCartItem } from './../../models/shopping-cart-item';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IProduct } from 'models/product.interface';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'models/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  /**
   *Creates an instance of ShoppingCartService.
   * @param {AngularFireDatabase} db
   * @memberof ShoppingCartService
   */
  constructor(private db: AngularFireDatabase) { }

  /**
   *
   *
   * @private
   * @returns {*}
   * @memberof ShoppingCartService
   */
  private create(): any {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  /**
   *
   *
   * @param {IProduct} product
   * @returns {Promise<void>}
   * @memberof ShoppingCartService
   */
  async addToCart(product: IProduct): Promise<void> {
    this.updateItems(product, 1);
  }

  /**
   *
   *
   * @param {IProduct} product
   * @returns {Promise<void>}
   * @memberof ShoppingCartService
   */
  async removeFromCart(product: IProduct): Promise<void> {
    this.updateItems(product, -1);
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof ShoppingCartService
   */
  async clearCart(): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  /**
   *
   *
   * @returns {Promise<Observable<ShoppingCart>>}
   * @memberof ShoppingCartService
   */
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).map((x: any) => {
      return new ShoppingCart(x.items);
    });
  }

  /**
   *
   *
   * @private
   * @param {string} cartId
   * @param {string} productId
   * @returns {FirebaseObjectObservable<ShoppingCartItem>}
   * @memberof ShoppingCartService
   */
  private getItem(cartId: string, productId: string): FirebaseObjectObservable<ShoppingCartItem> {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  /**
   *
   *
   * @private
   * @returns {Promise<string>}
   * @memberof ShoppingCartService
   */
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;

  }

  /**
   *
   *
   * @private
   * @param {IProduct} product
   * @param {number} change
   * @returns {Promise<void>}
   * @memberof ShoppingCartService
   */
  private async updateItems(product: IProduct, change: number): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe((item: any) => {
      if (item.quantity > 9 && change > 0) return;
      let quantity = (item.quantity || 0) + change;
      if (quantity == 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }

}
