import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import CartProvider from "./components/CartContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-22og2r8rldl86mtz.us.auth0.com"
      clientId="Hh0Y4etIW1W6fz9Wy2109kpXdyB5kNFb"
      redirectUri={window.location.origin}
      audience="https://dev-22og2r8rldl86mtz.us.auth0.com/api/v2/"
    >
      <CartProvider>
        <App />
      </CartProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
