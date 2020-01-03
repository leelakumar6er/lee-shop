import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { ShoppingCart } from 'models/shopping-cart';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';


@Component({
  selector: 'product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  product: any = {};
  category: string;
  id: string;
  showActions: boolean = true;
  cart$: Observable<ShoppingCart>;

  constructor(
    private actRoute: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: ProductService) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe((p: any) => {
      this.product = p;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
  }

}
