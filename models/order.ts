import { ShoppingCart } from 'models/shopping-cart';
import { Shipping } from 'models/shipping.interface';
export class Order {
  
  datePlaced: number;
  items: any[];
  
  /**
   *Creates an instance of Order.
   * @param {string} userId
   * @param {Shipping} shipping
   * @param {ShoppingCart} shoppingCart
   * @memberof Order
   */
  constructor(public userId: string, public shipping: Shipping, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalprice
      }
    });
  }
}