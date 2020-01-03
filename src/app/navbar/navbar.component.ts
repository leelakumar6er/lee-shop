import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../../../models/app-users';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser : AppUser;
  cart$: Observable<ShoppingCart>;

  /**
   *Creates an instance of NavbarComponent.
   * @param {AuthService} auth
   * @param {ShoppingCartService} cartService
   * @memberof NavbarComponent
   */
  constructor(private auth : AuthService,private cartService:ShoppingCartService) { }

  /**
   *
   *
   * @memberof NavbarComponent
   */
  async ngOnInit() {
    this.auth.AppUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.cartService.getCart();
  }

  /**
   *
   *
   * @memberof NavbarComponent
   */
  logout(){
    this.auth.logout();
  }

}
