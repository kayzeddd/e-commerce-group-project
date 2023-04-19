import { useEffect, useState } from "react";
import { createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CartContext = createContext(null);

//Providing context for the status of the cart across the entire website

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{ _id: item ID, quantity: quantity added to cart }, { _id: item ID, quantity: quantity added to cart }]
  const [loaded, setLoaded] = useState(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [cartLoaded, setCartLoaded] = useState(false);

  //Fetching the cart based on the logged in user

  useEffect(() => {
    if (user) {
      postNewUser();
    }
    if (user) {
      fetch(`/get-cart/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setCart(data.result);
            setLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user, cartLoaded]);

  //Posting a new user to users collection

  const postNewUser = () => {
    fetch(`/add-user/${user.email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      // body: JSON.stringify({ ...user, cart: [] }),
    })
      .then(() => {
        // setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loaded,
        setCartLoaded,
        user,
        isAuthenticated,
        cartTotal,
        setCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
