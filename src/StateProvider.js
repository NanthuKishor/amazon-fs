import React, { createContext, useContext, useReducer } from "react";

// Prepare the dataLayer.
//this is (1).CREATING THE CONTEXT part.
export const StateContext = createContext();

//Wrap our app and provide the data layer to every component.
//this is (3).TO PROVIDE THE DATA TO CHILDREN.
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// Pull information from the data layer.
// this is the (2).TO USE THE DATA PROVIDED INSIDE THE CHILDREN.
// this is a custom hook to use the state.
export const useStateValue = () => useContext(StateContext);

// this is to manage our state. using context, we can pass around data at ease, without using the "props".
