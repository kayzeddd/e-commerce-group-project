import styled from "styled-components";

// Individual Products | Displayed in Products Page
const ProductBoxes = ({
  category,
  bodyLoc,
  imgSrc,
  name,
  price,
  companyName,
  numInStock,
}) => {
  return (
    <>
      <Wrapper>
        <Img src={imgSrc} />
        <BrandContainer>
          <Brand>{companyName}</Brand>
          <>
            {numInStock === 0 && <Out>Out of Stock</Out>}
            {numInStock > 0 && numInStock < 5 && (
              <Stock>Only {numInStock} Left</Stock>
            )}
          </>
        </BrandContainer>
        <Title>{name}</Title>
        <Div>
          <InfoContainer>
            <Info>{category}</Info>
            <Info>{bodyLoc}</Info>
          </InfoContainer>
          <Price>{price}</Price>
        </Div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  opacity: 0;
  transform: translateY(10px);
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  width: 200px;
  height: 300px;
  padding: 5px 15px;
  margin: 10px;
  border-radius: 10px;
  contain: strict;

  animation: slide 1s forwards;
  @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

const BrandContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 5px;
`;

const Brand = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Info = styled.span`
  margin: 2px;
  color: white;
  background: #b59575;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 0.7rem;
`;

const Img = styled.img`
  width: 150px;
  max-height: 130px;
  object-fit: contain;
`;
const Div = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 0.8rem;
  text-align: left;
  width: 100%;
`;

const Price = styled.p`
  font-size: 1.2rem;
  text-align: left;
  font-weight: bold;
  color: black;
`;

const Stock = styled.div`
  width: 100%;
  text-align: right;
  padding: 10px;
  color: #b59575;
  font-size: 0.75rem;
`;

const Out = styled.div`
  width: 100%;
  text-align: right;
  padding: 10px;
  color: #c78171;
  font-size: 0.75rem;
`;

export default ProductBoxes;
