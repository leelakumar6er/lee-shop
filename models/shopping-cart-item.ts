export class ShoppingCartItem {
    $key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    /**
     *Creates an instance of ShoppingCartItem.
     * @param {Partial<ShoppingCartItem>} [init]
     * @memberof ShoppingCartItem
     */
    constructor(init?: Partial<ShoppingCartItem>) {
        Object.assign(this, init);
    }

    /**
     *
     *
     * @readonly
     * @type {number}
     * @memberof ShoppingCartItem
     */
    get totalprice(): number {
        return this.price * this.quantity;
    }
}