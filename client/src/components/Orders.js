import { useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import styled from "styled-components";
import moment from "moment";
import { FiLoader } from "react-icons/fi";
import { MdOutlineWatchLater } from "react-icons/md";

const Orders = () => {
  const [orderArr, setOrderArr] = useState(null);
  const { user } = useContext(CartContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      fetch(`/orders/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrderArr(data);
          setLoaded(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  if (!loaded) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }

  return (
    <Wrapper>
      <Head>Your Orders</Head>
      {orderArr && (
        <OrdersWrapper>
          {orderArr.map((order) => {
            return (
              <OrderDiv>
                <TopDiv>
                  <div>
                    <Bold>Date:</Bold>{" "}
                    {moment(order.date).format("dddd, MMMM Do YYYY")}
                  </div>
                  <div>
                    <Bold>Order ID#:</Bold> {order.orderId}
                  </div>
                </TopDiv>
                <MidDiv>
                  <ItemsDiv>
                    {order.itemsArr.map((item) => {
                      let prod = item.product;
                      return (
                        <Item>
                          <ItemImg src={prod.imageSrc} />
                          <ItemInfo>
                            <Bold>{prod.name}</Bold>
                            <Quantity>
                              <Bold>Quantity:</Bold> {item.quantity}
                            </Quantity>
                          </ItemInfo>
                        </Item>
                      );
                    })}
                  </ItemsDiv>
                  <InfoDiv>
                    <Name>
                      <Bold>For:</Bold> {order.orderData.firstname}{" "}
                      {order.orderData.lastname}
                    </Name>
                    <Address>
                      <Bold>Shipping To:</Bold> {order.orderData.fullAddress}
                    </Address>
                    <City>
                      <Bold>City</Bold>: {order.orderData.city}
                    </City>
                    <Country>
                      <Bold>Country:</Bold> {order.orderData.Country}
                    </Country>
                    <Postal>
                      <Bold>Postal:</Bold> {order.orderData.postalcode}
                    </Postal>
                    <Price>
                      <Bold>Total:</Bold> {order.orderData.totalPrice}$
                    </Price>
                  </InfoDiv>
                </MidDiv>
              </OrderDiv>
            );
          })}
        </OrdersWrapper>
      )}
    </Wrapper>
  );
};

const LoaderIconPosition = styled.div`
  min-height: 80vh;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const LoaderIcon = styled(MdOutlineWatchLater)`
  color: #b59575;
  animation: spin 1s linear infinite;
  font-size: 4rem;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Bold = styled.span`
  font-weight: bold;
`;

const Postal = styled.div``;

const Country = styled.div``;

const City = styled.div``;

const Price = styled.div``;

const Address = styled.div``;

const Name = styled.div`
  margin-top: 10px;
`;

const Quantity = styled.div`
  margin-bottom: 0px;
  margin-top: auto;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-left: 30px;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ItemImg = styled.img`
  height: 90px;
  width: auto;
`;

const Item = styled.div`
  display: flex;
  column-gap: 20px;
  padding: 10px;
  border-bottom: 2px solid #dbcdbf;
`;

const ItemsDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 600px;
  max-height: 400px;
  overflow-y: scroll;
`;

const MidDiv = styled.div`
  margin-top: 20px;
  display: flex;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #b59575;
  padding-bottom: 10px;
`;

const OrderDiv = styled.div`
  width: 1000px;
  border: 2px solid white;
  padding: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const Head = styled.div`
  font-size: 1.3rem;
  margin-top: 20px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const OrdersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`;

export default Orders;
