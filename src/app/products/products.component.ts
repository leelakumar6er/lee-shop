import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'models/product.interface';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[] = [];
  category: string;
  filteredProducts: IProduct[] = [];
  cart$: Observable<ShoppingCart>;
  loader: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }
/**
 *
 *
 * @private
 * @memberof ProductsComponent
 */
private populateProducts() {
    this.productService.getAll().switchMap(products => {
      this.products = products;
      this.loader = false;
      return this.route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }

  private applyFilter() {
    // for filter products in the home page
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
  }


}
