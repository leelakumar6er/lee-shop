import { IProduct } from './../../../models/product.interface';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {

  @Input('product') product: IProduct;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  /**
   *Creates an instance of ProductCardComponent.
   * @param {ShoppingCartService} cartService
   * @memberof ProductCardComponent
   */
  constructor(private cartService: ShoppingCartService) { }

  /**
   *
   *
   * @memberof ProductCardComponent
   */
  addToCart() {
    this.cartService.addToCart(this.product);
  }

}
