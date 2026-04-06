// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )



// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { ApolloProvider } from "@apollo/client";
// import { client } from "./apolloClient";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <ApolloProvider client={client}>
//     <App />
//   </ApolloProvider>,
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
