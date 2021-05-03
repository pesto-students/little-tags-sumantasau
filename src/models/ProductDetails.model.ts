import { ShoppingCartModel } from './ShoppingCart.model';

export namespace ProductDetailsModel {
  export interface IProps {
    loggedInUser: any;
    addItemToCart: (arg: ShoppingCartModel.CartItem) => void;
    buyItem: (arg: ShoppingCartModel.CartItem) => void;
    setUser: (arg: any) => void;
  }
}
