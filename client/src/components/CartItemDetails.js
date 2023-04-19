import styled from "styled-components";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

//Deconstructing the props passed down from Cart.js
const CartItemDetails = ({
  _id,
  imageSrc,
  name,
  price,
  numInStock,
  quantity,
  handleRemove,
}) => {
  let newPrice = price.replace("$", "");
  return (
    <CartItemCardDiv>
      {handleRemove !== 0 && ( //If we pass a value of 0 to handle remove, the remove button won't be rendered.
        <RemoveButton
          onClick={(ev) => {
            ev.preventDefault();
            handleRemove(_id);
          }}
        >
          <FiX />
        </RemoveButton>
      )}
      <ItemContainer to={"/items/" + _id}>
        <ItemImage src={imageSrc} />
        <ItemInfo>
          <ItemName
            style={handleRemove === 0 ? { color: "white" } : { color: "black" }}
          >
            {name}
          </ItemName>
          <ItemPrice
            style={handleRemove === 0 ? { color: "white" } : { color: "black" }}
          >
            ${(quantity * newPrice).toFixed(2)}
          </ItemPrice>
          <ItemQuantity
            style={handleRemove === 0 ? { color: "white" } : { color: "black" }}
          >
            Quantity: {quantity}
          </ItemQuantity>
        </ItemInfo>
      </ItemContainer>
    </CartItemCardDiv>
  );
};

const CartItemCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: red;
  }
`;

const ItemContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h3`
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 5px;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const ItemQuantity = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  text-decoration: underline;
`;

export default CartItemDetails;
