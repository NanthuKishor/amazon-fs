import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StateProvider } from "./StateProvider";
import reducer, { initialState } from "./reducer";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

//StateProvider, will ensure that all the data stored in context will be accessible accross all the components inside of the <App>

// initial state - is how the data layout look like in the beginning;

// reducer -  is how we are going to manipulate the data, like how we are going to  push the data into the datalayout and how we are going to pull it from the datalayout when we need to use it inside the components.
