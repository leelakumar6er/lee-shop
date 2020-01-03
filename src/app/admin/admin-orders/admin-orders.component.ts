import { OrderService } from './../../order.service';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders$: any;

  /**
   *Creates an instance of AdminOrdersComponent.
   * @param {OrderService} orderService
   * @memberof AdminOrdersComponent
   */
  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
