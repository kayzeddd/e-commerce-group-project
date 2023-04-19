// Use array of cart object { itemId, qty }

// Fetch images and stock
import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import CartItemDetails from "./CartItemDetails";
import CheckoutForm from "./CheckoutForm";
import { BsCartX } from "react-icons/bs";
import styled from "styled-components";

const Cart = () => {
  let navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // Deconstructing the variables needed from the cart context
  const { user, cart, setCart, loaded, setCartLoaded } =
    useContext(CartContext);

  // Function to submi/POST the form data
  const handleSubmit = (e, formData) => {
    e.preventDefault();
    const totalPrice = calculateTotal(cartItems);
    fetch(`/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, userId: user.email, totalPrice }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.orderId);
        navigate(`/confirmation/${data.orderId}`);
      })
      .catch((err) => console.log(err));
  };
  //Function to get a user's cart
  useEffect(() => {
    if (user)
      fetch(`/get-cart/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setCartItems(data.result);
            setCart(data.result);
            calculateTotal(cartItems);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    setCartLoaded(true);
  }, [user]);

  //Function to remove items from cart
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.product._id !== id));
    fetch("/remove-from-cart", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: user.email, item: id }), //Sending user email and item Id in the body
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("error", error);
      });
    setCartLoaded(true);
  };

  //get cart total
  let calculateTotal = (cartItems) => {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      let newPrice = item.product.price.replace("$", "");
      total += newPrice * item.quantity;
    }
    return total.toFixed(2);
  };

  return loaded ? ( //load the cart only when data is fetfched and loaded is set to true in the context
    <>
      <StyledContainer>
        <StyledCart>
          <StyledCartHeader>
            <StyledTitle>Shopping Cart</StyledTitle>
            <StyledPrice>
              {" "}
              Total :{" "}
              {cartItems.length && <span>{calculateTotal(cartItems)}$</span>}
            </StyledPrice>
          </StyledCartHeader>

          <StyledCartItems>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                return (
                  <div>
                    <CartItemDetails
                      key={item.product._id}
                      _id={item.product._id}
                      name={item.product.name}
                      price={item.product.price}
                      imageSrc={item.product.imageSrc}
                      quantity={item.quantity}
                      handleRemove={handleRemove}
                    />
                  </div>
                );
              })
            ) : (
              <NoItemDiv>
                <BsCartX />
                <p>Please add items to cart</p>
              </NoItemDiv>
            )}
          </StyledCartItems>
        </StyledCart>

        <StyledCheckout>
          <StyledCartItems>
            <Styledh3>Checkout</Styledh3>
            <CheckoutForm handleSubmit={handleSubmit} cartItems={cartItems} />
          </StyledCartItems>
        </StyledCheckout>
      </StyledContainer>
    </>
  ) : (
    <>
      <h2>Loading......</h2>
    </>
  );
};

export default Cart;
const StyledCartHeader = styled.div`
  border-bottom: lightgrey solid 1px;
  display: flex;
  justify-content: space-between;
`;
const StyledPrice = styled.p`
  color: grey;
  margin-top: 75px;
`;

const Styledh3 = styled.h3``;
const StyledContainer = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #f3f3f3;
  height: 100vh;
  justify-content: center;
  padding-top: 50px;
  overflow-y: scroll;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 16px;
  padding-bottom: 10px;
`;

const StyledCartItems = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledCart = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 3px lightgrey;
  padding: 16px;
  margin-right: 5px;
  width: 550px;
`;

const StyledCheckout = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  margin-left: 5px;
  padding: 16px;
  width: 325px;
`;

const NoItemDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  font-style: sans-serif;
  background-color: #92a8d1;

  border: none;
  border-color: black;
  border-radius: 6px;
  padding: 10px;
  width: 13vh;
  margin-top: 15px;

  cursor: pointer;

  &:hover {
    background-color: #34568b;
    border-color: black;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }
`;
