import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: any;

  /**
   *Creates an instance of ShoppingCartComponent.
   * @param {ShoppingCartService} cartService
   * @memberof ShoppingCartComponent
   */
  constructor(private cartService: ShoppingCartService) { }

  /**
   *
   *
   * @memberof ShoppingCartComponent
   */
  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  /**
   *
   *
   * @memberof ShoppingCartComponent
   */
  clearCart(): void {
    this.cartService.clearCart();
  }

}
