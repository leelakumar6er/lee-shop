import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Order } from 'models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  /**
   *Creates an instance of OrderService.
   * @param {AngularFireDatabase} db
   * @param {ShoppingCartService} cartServive
   * @memberof OrderService
   */
  constructor(private db: AngularFireDatabase, private cartServive: ShoppingCartService) { }

  /**
   *
   *
   * @param {Order} order
   * @returns {Promise<any>}
   * @memberof OrderService
   */
  async placeOrder(order: Order): Promise<any> {
    let result = await this.db.list("/orders").push(order);
    this.cartServive.clearCart();
    return result;
  }

  /**
   *
   *
   * @returns {FirebaseListObservable<any[]>}
   * @memberof OrderService
   */
  getOrders(): FirebaseListObservable<any[]> {
    return this.db.list('/orders');
  }

  /**
   *
   *
   * @param {string} orderId
   * @returns {FirebaseObjectObservable<any>}
   * @memberof OrderService
   */
  get(orderId: string): FirebaseObjectObservable<any> {
    return this.db.object('/orders/' + orderId);
  }

  /**
   *
   *
   * @param {string} userId
   * @returns {FirebaseListObservable<any[]>}
   * @memberof OrderService
   */
  getOrdersByUser(userId: string): FirebaseListObservable<any[]> {
    return this.db.list('/orders', {
      query: {
        orderByChild: 'userId',
        equalTo: userId
      }
    });
  }
}
