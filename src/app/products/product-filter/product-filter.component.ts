import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  isLoading: boolean = false;
  @Input('category') category;
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    /** spinner starts on init */

    this.categories$ = this.categoryService.getAll();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.isLoading = true;
    }, 5000);
  }

}
