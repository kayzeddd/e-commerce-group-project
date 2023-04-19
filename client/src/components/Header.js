import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import UserButton from "./UserButton";
import WMW from "./images/WMW.png";

// Header Banner of Site
const Header = () => {
  const { user, cart } = useContext(CartContext);
  const [scrollPosition, setScrollPosition] = useState("100px");

  // Styling for NavLink Here
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "#B59575",
    fontWeight: "bold",
    fontSize: scrollPosition >= 50 ? ".8rem" : "1.2rem",
    padding: "0 10px",
  };

  const inactiveStyle = {
    fontWeight: "bold",
    textDecoration: "none",
    color: "lightgrey",
    fontSize: scrollPosition >= 50 ? ".8rem" : "1.2rem",
    fontWeight: "normal",
    padding: "0 10px",
  };

  // Scroll Event
  useEffect(() => {
    const handleShrinkScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleShrinkScroll);
    return () => {
      window.removeEventListener("scroll", handleShrinkScroll);
    };
  }, []);

  return (
    <>
      <Wrapper scrollPosition={scrollPosition}>
        <StyledLink to="/">
          <Title scrollPosition={scrollPosition} src={WMW} />
        </StyledLink>
        <Div>
          <LinkContainer>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : inactiveStyle)}
            >
              Products
            </NavLink>

            <Dropdown>
              <NavLink
                to="/category"
                style={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                Categories
              </NavLink>
              <Ul>
                <Li>
                  <DropLink to="/category/Lifestyle">Lifestyle</DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Fitness">Fitness</DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Entertainment">
                    Entertainment
                  </DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Pets%20and%20Animals">
                    Pets & Animals
                  </DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Gaming">Gaming</DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Medical">Medical</DropLink>
                </Li>
                <Li>
                  <DropLink to="/category/Industrial">Industrial</DropLink>
                </Li>
              </Ul>
            </Dropdown>
          </LinkContainer>

          <RightDiv>
            {user && (
              <>
                <NavLink
                  to="/cart"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  <Cart>
                    <FiShoppingCart />
                    <Badge>
                      <CartCount>{cart.length}</CartCount>
                    </Badge>
                  </Cart>
                </NavLink>

                <NavLink
                  to="/orders"
                  style={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  Orders
                </NavLink>
              </>
            )}
            <NavLink>
              <UserButton />
            </NavLink>
            {user && <UserProfile src={user.picture} />}
          </RightDiv>
        </Div>
      </Wrapper>
    </>
  );
};

// background: ${(props) =>
// props.scrollPosition >= 50 ? "black" : "#202125"};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: #202125;
  position: sticky;
  top: 0;
  z-index: 10000;
  height: ${(props) => (props.scrollPosition >= 50 ? "40px" : "80px")};
  border-bottom: 2px solid #B59575;

  transition: height 0.2s ease-in-out;
`;

const Dropdown = styled.div`
  position: relative;
  border-bottom: 5px;
  &:hover ul {
    display: block;
  }
`;
const Ul = styled.ul`
  position: absolute;
  display: none;
  top: 20px;
`;

const Li = styled.li`
  display: flex;
  position: relative;
  list-style: none;
  background: white;
  text-align: left;
  cursor: pointer;
  &:hover {
    background: #b59575;
    color: white;
  }
`;

const DropLink = styled(Link)`
  flex: 1;
  padding: 5px 10px;
  text-decoration: none;
  color: black;
  &:hover {
    color: white;
  }
`;

const Title = styled.img`
  margin-bottom: -20px;
  height: ${(props) => (props.scrollPosition >= 50 ? "80px" : "170px")};
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  width: 100%;
`;
const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`;
const RightDiv = styled.div`
  display: flex;
  align-items: center;
  column-gap: 25px;
`;
const StyledLink = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: white;
`;

const Cart = styled.div`
  position: relative;
  padding: 0 15px;
`;

const Badge = styled.div`
  position: absolute;
  top: -5px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b59575;
  border-radius: 50%;
  color: white;
  width: 15px;
  height: 15px;
  font-size: 0.75rem;
`;

const CartCount = styled.p`
  padding: 0;
  margin: 0;
`;

const UserProfile = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1.5px solid white;
`;

export default Header;
