import styled from "styled-components";
import { useState, useEffect } from "react";
import { sampleSize } from "lodash";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  FiShoppingCart,
  FiLoader,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import About from "./About";
import Gaming from "./images/Gaming.png";
import Fitness from "./images/Fitness.png";
import Medical from "./images/Medical.png";
import Lifestyle from "./images/Lifestyle.png";
import Pets from "./images/Pets and Animals.png";
import Slider from "react-slick";
import watch from "./videos/watch.mp4";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WMW from "./images/WMW.png";

const Homepage = () => {
  //three sections: Header, About, Products
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState([]);
  // const { _id } = useParams();

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => {
        setisLoading(false);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }

  const randomProducts = sampleSize(products, 20);
  const categoryArr = [
    { name: "Gaming", img: Gaming, backgroundColor: "#F44336" },
    { name: "Fitness", img: Fitness, backgroundColor: "#4CAF50" },
    { name: "Medical", img: Medical, backgroundColor: "#03A9F4" },
    { name: "Lifestyle", img: Lifestyle, backgroundColor: "#9C27B0" },
    { name: "Pets", img: Pets, backgroundColor: "#FFC107" },
  ];

  return (
    <Wrapper>
      <Banner>
        <Div>
          <Video autoPlay muted loop>
            <Source src={watch} type="video/mp4" />
          </Video>
          <NameWrapper>
            <TextContainer>
              <Title>Watch My Watch</Title>
              <Text>Your source for premium watches & wearables</Text>
            </TextContainer>
            <LogoDiv>
              <LogoImg src={WMW}/>
            </LogoDiv>
          </NameWrapper>
        </Div>
      </Banner>
      <div>
        {" "}
        <About />
        <StyledProducts>Products</StyledProducts>
        <Slider
          dots={true}
          slidesToShow={4}
          autoplay={true}
          autoplaySpeed={2000}
        >
          {randomProducts.map((product, i) => (
            <Nav to={`/items/${product._id}`}>
              <SubContainer key={i}>
                <Img src={product.imageSrc} />
                <Name>{product.name}</Name>
                <Price>{product.price}</Price>
              </SubContainer>
            </Nav>
          ))}
        </Slider>
        <StyledProducts>Categories</StyledProducts>
        <CategoryContainer>
          {categoryArr.map((category, index) => (
            <CategoryLink to="/products">
              <CategoryCard
                style={{ backgroundColor: category.backgroundColor }}
              >
                <div key={index}>
                  <CategoryImage src={category.img} />
                  <CategoryTitle> {category.name}</CategoryTitle>
                </div>
              </CategoryCard>
            </CategoryLink>
          ))}
        </CategoryContainer>
      </div>
    </Wrapper>
  );
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: 10px;
  position: relative;
  z-index: 1;
  font-size: 4rem;
  font-weight: bold;
  color: white;
`;

const Text = styled.p`
  font-size: 2rem;
  background-color: black;
  padding: 5px;
`;

const Title = styled.p`
   background-color: black;
   padding: 5px;
`;

const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Source = styled.source``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: auto;
`;

const NameWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`

const LogoDiv = styled.div`
  position: relative;
`

const LogoImg = styled.img`
  position: absolute;
  z-index: 1;
  left: 30px;
  top: -230px;
  width: 500px;
  height: auto;
`

const Banner = styled.div`
  height: 350px;
  background: grey;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 100%;
  background: #4a5059;
  position: relative;
`;

const BannerTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: white;
`;
const BannerText = styled.p`
  color: white;
  font-size: 1rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 30px;
`;

const CategoryTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
`;

const CategoryLink = styled(NavLink)`
  text-decoration: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #222;
  }
`;

const CategoryImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 250px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 12px 36px rgba(0, 0, 0, 0.2);
  }
`;

const StyledProducts = styled.h1`
  margin: 30px;
  color: white;
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

const Nav = styled(NavLink)`
  border: 3px solid black;
  height: 250px;
  color: black;
  text-decoration: none;
  background: linear-gradient(
    0deg,
    rgba(212, 212, 212, 0.2) 0%,
    rgba(213, 213, 221, 0.8) 22%,
    rgba(251, 251, 251, 1) 100%
  );
  border-radius: 30px;

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    border-radius: 30px;
    transform: scale(1.1);
    position: relative;
    z-index: 10;
  }
`;
// const Container = styled.div`
//   margin: 20px;
//   .slick-slider {
//     margin: 0 auto;
//   }
// `;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
`;
const Price = styled.div`
  margin: 5px;
`;
const Img = styled.img`
  height: 100px;
  width: auto;
  margin: 5px;
`;
const Name = styled.div`
  margin: 5px;
`;

export default Homepage;
