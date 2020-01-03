import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { IProduct } from 'models/product.interface';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from 'models/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async addToCart(product: IProduct) {
    this.updateItems(product, 1);
  }

  async removeFromCart(product: IProduct) {
    this.updateItems(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).map((x: any) => {
      return new ShoppingCart(x.items);
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;

  }

  private async updateItems(product: IProduct, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe((item: any) => {
      if(item.quantity > 9 && change > 0) return; 
      let quantity = (item.quantity || 0) + change;
      if (quantity == 0) item$.remove();
      else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
      });
    });
  }
  
}
