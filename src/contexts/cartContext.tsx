import { createContext, useReducer } from "react";
import { Product } from "../types";

export type CartProduct = Omit<Product, "inventary"> & {
  size_id: string;
  model: string;
  size: string;
  stock: number;
  quantity: number;
  weight: number
};

type Props = {
  children: React.ReactNode;
};

type Action = {
  type: "add" | "change" | "delete";
  product: CartProduct;
  number: number;
};

type Context = {
  cartList: CartProduct[];
  reduceCartList: React.Dispatch<Action>;
  cartPrice: number;
  cartWeight: number
};

export const CartContext = createContext<Context>({} as Context);

const CartProvider = ({ children }: Props) => {
  const cartReducer = (
    state: CartProduct[],
    { type, number, product }: Action
  ): CartProduct[] => {
    const index = state.findIndex(
      ({ _id, size, model }) =>
        _id == product._id && size == product.size && model == product.model
    );
    const newCart = structuredClone(state);
    if (type == "add") {
      if (index >= 0) {
        newCart[index].quantity += number;
        return newCart;
      }
      return [...newCart, product];
    }
    if (type == "change") {
      newCart[index].quantity = number;
      return newCart;
    }
    if (type == "delete") {
      delete newCart[index];
      return newCart.filter((e) => e != null);
    }
    return state;
  };

  const initialState = (): CartProduct[] => {
    const cart = window.localStorage.getItem("cartList");
    if (cart) return JSON.parse(cart);
    return [];
  };

  const [cartList, reduceCartList] = useReducer(cartReducer, initialState());
  const cartPrice = cartList.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartWeight = cartList.reduce((a, b) => a + b.weight * b.quantity, 0);

  return (
    <CartContext.Provider value={{ cartList, reduceCartList, cartPrice, cartWeight }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
