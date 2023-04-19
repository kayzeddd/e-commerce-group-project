import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const UserButton = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const { user, cart } = useContext(CartContext);
  
  return (
    <Button
      onClick={() => {
        isAuthenticated
          ? logout({ returnTo: window.location.origin })
          : loginWithRedirect();
      }}
    >
      {isAuthenticated ? "Logout" : "Login"}
    </Button>
  );
};

const Button = styled.button`
  font-size: 1.1rem;
  margin-right: 20px;
  text-decoration: none;
  color: white;
  background: none;
  font-weight: bold;
  border: none;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

export default UserButton;
