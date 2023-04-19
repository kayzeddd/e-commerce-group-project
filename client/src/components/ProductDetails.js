import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Navigate, useParams } from "react-router-dom";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";
import { MdOutlineWatchLater } from "react-icons/md";

const ProductDetails = () => {
  const [isLoading, setisLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [numInStock, setNumInStock] = useState(0);
  const [renderPopUp, setRenderPopUp] = useState(false);

  const [product, setProduct] = useState();
  const [count, setCount] = useState(1);
  const { _id } = useParams();
  const { user, isAuthenticated, setCartLoaded, cart, setCart } =
    useContext(CartContext);
  const increment = () => {
    if (product.numInStock > count) {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleOrder = () => {
    fetch(`/cart/${user.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: { ...product, id: product._id },
        quantity: count,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNumInStock(numInStock - count);
        setCartLoaded(true);
        setCart([...cart, {}]);
        setRenderPopUp(true);
        setInterval(() => {
          setRenderPopUp(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`/items/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setisLoading(false);
        setNumInStock(data.numInStock);
        return data;
      })

      .then((data) => {
        fetch(`/company/${data.companyId}`)
          .then((res) => res.json())
          .then((data) => {
            setSimilarProducts(data.companyItems);
            setCompanyName(data.company);
            setisLoading(false);
          });
      })
      .catch((err) => console.log(err));
  }, [_id]);

  if (isLoading) {
    return (
      <p>
        <LoaderIconPosition>
          <LoaderIcon />
        </LoaderIconPosition>
      </p>
    );
  }

  const orderButton = numInStock === 0;
  const numDisplay = numInStock < 1 ? "Out of Stock" : `Stock ${numInStock}`;

  return (
    <Container>
      <Div>
        <H1>{product.name}</H1>
        <SubContainer>
          <Img src={product.imageSrc} />

        <DetailCintainer>
          <Dcontainer>
            <H2>Price {product.price}</H2>
            <ProductButtons>
              <Button onClick={decrement}>-</Button>
              <P> {count}</P>
              <Button onClick={increment}>+</Button>
            </ProductButtons>
          </Dcontainer>
          <CompanyName>Company : {companyName.name}</CompanyName>
          <NumInStock>
            <Span color={numDisplay === "Out of Stock"}>{numDisplay}</Span>
          </NumInStock>
          <OrderButton
            onClick={handleOrder}
            disabled={orderButton}
            style={{
              backgroundColor: isAuthenticated ? "" : "grey",
              cursor: isAuthenticated ? "" : "not-allowed",
            }}
          >
            {isAuthenticated ? "Order" : "Log in to Add to Cart"}
          </OrderButton>
          <PopupContainer>
            {renderPopUp && <Popup>Item Added To Cart!</Popup>}
          </PopupContainer>
        </DetailCintainer>
      </SubContainer>

        {similarProducts.length > 0 && (
          <div>
            <ul>
              <Title>Similar Products</Title>
              <Container2>
                {similarProducts.map((similarProduct) => (
                  <Nav to={`/items/${similarProduct._id}`}>
                    <SubContainer2 key={similarProduct._id}>
                      <Img2 src={similarProduct.imageSrc} />
                      <Pname>{similarProduct.name}</Pname>
                      <Pcat>{similarProduct.category}</Pcat>
                      <Pprice>{similarProduct.price}</Pprice>
                    </SubContainer2>
                  </Nav>
                ))}
              </Container2>
            </ul>
          </div>
        )}
      </Div>
    </Container>
  );
};

const PopupContainer = styled.div`
  height: 20px;
`;

const Title = styled.h2`
  color: white;
`;

const Popup = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-left: 5px;
`;

const Span = styled.span`
  color: ${(props) => props.color && "red"};
  margin-left: 10px;
`;

const NumInStock = styled.div`
  font-size: 20px;
  text-align: center;
`;

const CompanyName = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
`;

const DetailCintainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  margin-right: 40px;
  margin-left: 200px;
`;
const ProductButtons = styled.button`
  display: flex;
  width: 150px;
  margin-left: 20px;
  text-align: center;
  background-color: #fff;
  color: black;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

const P = styled.div`
  margin: 20px;
`;

const Nav = styled(NavLink)`
  position: relative;
  color: black;
  text-decoration: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 50%,
    rgba(204, 204, 204, 1) 86%,
    rgba(153, 153, 153, 1) 100%
  );
  border: 3px solid black;
  border-radius: 30px;

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 30px;
    transform: scale(1.1);
    position: relative;
  }
`;
const SubContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Img2 = styled.img`
  height: 150px;
  width: 150px;
  margin-bottom: 10px;
`;

const Pname = styled.div`
  margin: 10px;
`;

const Pcat = styled.div`
  margin: 10px;
`;

const Pprice = styled.div`
  margin: 10px;
`;

const Container2 = styled.div`
  display: flex;
  overflow-y: scroll;
`;

const OrderButton = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#3c8dbc")};
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  margin-top: 40px;
  margin-left: 15px;
  width: 200px;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.disabled ? "gray" : "#6495ed")};
  }
`;

const Button = styled.button`
  background-color: #b59575;

  display: flex;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  margin: 10px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    opacity: 0.6;
  }
`;

const Dcontainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 40px;
  height: 350px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Div = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const H2 = styled.h2`
  margin-top: 10px;
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: auto;
`;

const H1 = styled.h1`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
`;
const Img = styled.img`
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

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

export default ProductDetails;
