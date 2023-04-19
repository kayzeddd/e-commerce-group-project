import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { FiShoppingCart, FiLoader } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";

// import { FaShoppingCart } from "react-icons/fa";

const Footer = () => {
  const [inquiry, setInquiry] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setIsSent(true);
    setInquiry("");
  };

  const handleChange = (ev) => {
    setInquiry(ev.target.value);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Input
          text="text"
          placeholder="Your inquiry here..."
          value={inquiry}
          onChange={handleChange}
        />
        <Button type="submit">Send Inquiry</Button>
        {isSent && <Message>Inquiry Sent! </Message>}
      </Form>
    </Wrapper>
  );
};

const Message = styled.div`
  color: white;
  margin-left: 10px;
`;

const Button = styled.button`
  background-color: #b59575;
  color: white;
  padding: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  border-radius: 4px;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  text-align: center;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 1.1rem;
`;

export default Footer;
