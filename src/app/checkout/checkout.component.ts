
import { ShoppingCart } from './../../../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  /**
   *Creates an instance of CheckoutComponent.
   * @param {ShoppingCartService} cartService
   * @memberof CheckoutComponent
   */
  constructor(
    private cartService: ShoppingCartService) { }

  /**
   *
   *
   * @memberof CheckoutComponent
   */
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
