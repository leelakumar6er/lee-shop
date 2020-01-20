import { Shipping } from 'models/shipping.interface';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent {

  id: string;
  orderTotal: number;
  order: any = {};
  shipping: Shipping;

  /**
   *Creates an instance of OrderViewComponent.
   * @param {OrderService} orderService
   * @param {ActivatedRoute} actRoute
   * @memberof OrderViewComponent
   */
  constructor(private orderService: OrderService,
    private actRoute: ActivatedRoute) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.id) this.orderService.get(this.id).take(1).subscribe((o: any) => {
      this.order = o;
      this.orderTotal = this.getTotalOrderPrice();
    });
  }

  /**
   *
   *
   * @returns sum
   * @memberof OrderViewComponent
   */
  getTotalOrderPrice():number {
    let sum = 0;
    for (let index in this.order.items) {
      sum += this.order.items[index].totalPrice;
    }
    return sum;
  }

}
