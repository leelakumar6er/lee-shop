import { ShoppingCartItem } from './shopping-cart-item';
import { IProduct } from './product.interface';

export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    /**
     *Creates an instance of ShoppingCart.
     * @param {{ [productId: string]: ShoppingCartItem }} itemsMap
     * @memberof ShoppingCart
     */
    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
        }
    }

    /**
     *
     *
     * @readonly
     * @memberof ShoppingCart
     */
    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalprice;
        return sum;
    }

    /**
     *
     *
     * @param {IProduct} product
     * @returns
     * @memberof ShoppingCart
     */
    getQuantity(product: IProduct) {
        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    /**
     *
     *
     * @readonly
     * @memberof ShoppingCart
     */
    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}