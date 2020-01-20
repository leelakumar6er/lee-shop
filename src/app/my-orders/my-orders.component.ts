import { AuthService } from './../auth.service';
import { OrderService } from './../order.service';
import { Component } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$: Observable<any[]>;

  /**
   *Creates an instance of MyOrdersComponent.
   * @param {AuthService} authService
   * @param {OrderService} orderService
   * @memberof MyOrdersComponent
   */
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    this.orders$ = this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u.uid));
  }
}
