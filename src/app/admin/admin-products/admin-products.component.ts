import { ProductService } from './../../product.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'models/product.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  data: any[];
  products: IProduct[];
  subscription: Subscription;

  /**
   *Creates an instance of AdminProductsComponent.
   * @param {ProductService} productService
   * @memberof AdminProductsComponent
   */
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.data = this.products = products;
    });
  }

  /**
   *
   *
   * @param {string} query
   * @memberof AdminProductsComponent
   */
  filter(query: string) {
    this.data = (query.toLowerCase()) ? this.products.filter(p => p.title.toLowerCase().includes(query)) : this.products;
  }

  /**
   *
   *
   * @memberof AdminProductsComponent
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
