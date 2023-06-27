import {createContext, Dispatch, useContext} from "react";

type ContextType = {
  order: Order;
  dispatch: Dispatch<Action>;
};

export const OrderContext = createContext<ContextType>({
  order: [],
  dispatch: () => {},
});

export function useOrderContext() {
  return useContext(OrderContext);
}
