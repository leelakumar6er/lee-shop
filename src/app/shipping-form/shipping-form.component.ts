import { ShoppingCart } from 'models/shopping-cart';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Order } from 'models/order';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart: ShoppingCart;

  shipping: any = {};
  subcription: Subscription;
  userId: string;

  /**
   *Creates an instance of ShippingFormComponent.
   * @param {AuthService} auth
   * @param {OrderService} orderService
   * @param {Router} route
   * @memberof ShippingFormComponent
   */
  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private route: Router) { }

  /**
   *
   *
   * @memberof ShippingFormComponent
   */
  ngOnInit() {
    this.subcription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  /**
   *
   *
   * @memberof ShippingFormComponent
   */
  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  /**
   *
   *
   * @returns {Promise<void>}
   * @memberof ShippingFormComponent
   */
  async placeOrder(): Promise<void> {
    let order = new Order(this.userId, this.shipping, this.cart);
    let results = await this.orderService.placeOrder(order);
    this.route.navigate(['/order-success', results.key]);
  }

}
