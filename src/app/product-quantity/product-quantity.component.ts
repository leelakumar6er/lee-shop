import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { IProduct } from 'models/product.interface';
import { ShoppingCart } from 'models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: IProduct;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  /**
   *Creates an instance of ProductQuantityComponent.
   * @param {ShoppingCartService} cartService
   * @memberof ProductQuantityComponent
   */
  constructor(private cartService: ShoppingCartService) { }

  /**
   *
   *
   * @memberof ProductQuantityComponent
   */
  addToCart() {
    this.cartService.addToCart(this.product);
  }

  /**
   *
   *
   * @memberof ProductQuantityComponent
   */
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
