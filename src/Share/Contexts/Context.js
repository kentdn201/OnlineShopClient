import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        const tempstate = state.filter((item) => action.payload.id === item.id);
        if (tempstate.length > 0) {
          return state;
        } else {
          return [...state, action.payload];
        }
      case "INCREASE":
        const itemToIncrease = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        return itemToIncrease;
      case "DECREASE":
        const itemToDecrease = state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        return itemToDecrease;

      case "REMOVE":
        const itemToRemove = state.filter(
            (item) => {
                return item.id !== action.payload.id
            }
        );
        return itemToRemove;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };
  return (
    <CartContext.Provider value={info}>{props.children}</CartContext.Provider>
  );
};

export default Context;
