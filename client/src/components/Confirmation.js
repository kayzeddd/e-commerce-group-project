import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartItemDetails from "./CartItemDetails";
import { MdOutlineWatch } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import moment from "moment";

const Confirmation = () => {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    fetch(`/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderInfo(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      {orderInfo && (
        <>
          <TitleContainer>
            <WatchDiv>
              <MdOutlineWatch />
            </WatchDiv>
            <h1>Order Confirmed!</h1>
            <h2>Thank you for shopping with us</h2>
          </TitleContainer>
          <div>
            <p>
              Hello {orderInfo.orderData.firstname}, Your order has been
              confirmed and will be shipped out soon!{" "}
            </p>
          </div>
          <P3>
            <p>
              <BoldSpan>Order Date:</BoldSpan>{" "}
              {moment(orderInfo.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
            </p>
            <p>
              {" "}
              <BoldSpan>Order # : </BoldSpan>
              {orderInfo._id}
            </p>
            <p>
              <BoldSpan>Order Total :</BoldSpan> $
              {orderInfo.orderData.totalPrice}
            </p>
            <p>
              <BoldSpan>Payment Status :</BoldSpan>{" "}
              <GreenText>Approved</GreenText>{" "}
            </p>
            <Shipping>
              {" "}
              <BoldSpan>Shipping Information</BoldSpan>
              <div>
                <p>{orderInfo.orderData.fullAddress}</p>
                <p>
                  {orderInfo.orderData.city} {orderInfo.orderData.postalcode}{" "}
                  {orderInfo.orderData.Country}
                </p>
              </div>
            </Shipping>
          </P3>
          <div>
            <CartTitle>
              <BsCart4 />
              Your Cart
            </CartTitle>
            <div>
              {orderInfo.itemsArr.map((item) => {
                return (
                  <CartItemDetails
                    key={item.product._id}
                    _id={item.product._id}
                    name={item.product.name}
                    price={item.product.price}
                    imageSrc={item.product.imageSrc}
                    quantity={item.quantity}
                    handleRemove={0} //Passing handle remove a 0 so it won't render the delete button inside the confirmation page
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

const BoldSpan = styled.span`
  font-weight: bolder;
`;

const Container = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  border: 0.5px solid lightgrey;
`;
const WatchDiv = styled.div`
  font-size: 150px;
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const P3 = styled.div`
  display: flex;
  justify-content: center;
  gap: 3.5rem;
`;

const Shipping = styled.div`
  display: flex;
  flex-direction: column;
`;

const GreenText = styled.span`
  font-weight: bolder;
  color: green;
`;

const CartTitle = styled.div`
  font-weight: bolder;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Confirmation;
