export namespace ShoppingCartModel {
  export interface IProps {
    cartItems: CartItem[];
  }

  export interface CartItem {
    productId: number;
    productName: string;
    quantity: number;
    totalQuantity: number;
    price: number;
    image: string;
  }
}