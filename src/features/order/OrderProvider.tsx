import React, { ReactNode, useEffect, useReducer } from "react";
import { OrderContext } from "./OrderContext";

function reducer(state: Order, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "init": {
      return payload;
    }
    case "addTicket": {
      const newState = [...state];
      const movieId = payload;
      const movieIndex = state.findIndex((item) => item.movieId === movieId);
      if (movieIndex === -1) {
        return [...newState, { movieId, ticketCount: 1 }];
      }
      newState[movieIndex].ticketCount++;
      return [...newState];
    }
    case "removeTicket": {
      const newState = [...state];
      const movieId = payload;
      const movieIndex = state.findIndex((item) => item.movieId === movieId);
      newState[movieIndex].ticketCount--;
      return newState;
    }
  }
}

type Props = {
  children: ReactNode;
};

function OrderProvider({ children }: Props) {
  const [order, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // const localStorageOrder = localStorage.getItem("order");
    // if (localStorageOrder !== null) {
    //   const order = JSON.parse(localStorageOrder);
    //   dispatch({ type: "init", payload: order });
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderProvider;
