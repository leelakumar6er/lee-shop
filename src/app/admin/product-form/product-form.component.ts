import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$;
  product: any = {};
  id: string;

  /**
   *Creates an instance of ProductFormComponent.
   * @param {Router} route
   * @param {ActivatedRoute} actRoute
   * @param {CategoryService} catService
   * @param {ProductService} productService
   * @memberof ProductFormComponent
   */
  constructor(
    private route: Router,
    private actRoute: ActivatedRoute,
    catService: CategoryService,
    private productService: ProductService) {
    this.categories$ = catService.getAll();
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).take(1).subscribe(p => this.product = p);
  }

  /**
   *
   *
   * @param {*} product
   * @memberof ProductFormComponent
   */
  save(product: any) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.route.navigate(['/admin/products']);
  }

  /**
   *
   *
   * @returns
   * @memberof ProductFormComponent
   */
  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(this.id);
    this.route.navigate(['/admin/products']);
  }

}
