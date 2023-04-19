import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";

const CheckoutForm = ({ handleSubmit, cartItems }) => {
  const { user } = useContext(CartContext);

  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <FormContainer onSubmit={(e) => handleSubmit(e, formData)}>
      <FormGroup>
        <LabelGroup>
          <RiAccountCircleLine />
          <label>Account Information</label>
        </LabelGroup>
        <Email>{user.email}</Email>
      </FormGroup>

      <FormGroup>
        <LabelGroup>
          <FaShippingFast />
          <label>Shipping Information</label>
        </LabelGroup>

        <InputGroup>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
        </InputGroup>

        <input
          type="text"
          name="fullAddress"
          placeholder="Address"
          onChange={(e) => {
            handleChange(e.target.name, e.target.value);
          }}
          required
        />
        <InputGroup>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
          <input
            type="text"
            name="Country"
            placeholder="Country"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
          <input
            type="text"
            name="postalcode"
            placeholder="Postal code"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <LabelGroup>
          <RiSecurePaymentFill />
          <label>Payment Information</label>
        </LabelGroup>
        <InputGroup>
          <input
            type="text"
            name="creditcardnumber"
            placeholder="Credit Card Number"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
          <input
            type="date"
            name="expiration"
            placeholder="Expiration Date"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
          <input
            type="text"
            name="CVV"
            placeholder="Your CVV Code"
            onChange={(e) => {
              handleChange(e.target.name, e.target.value);
            }}
            required
          />
        </InputGroup>
      </FormGroup>

      <Button type="submit" disabled={cartItems.length ? false : true}>
        Complete Your Order!
      </Button>
    </FormContainer>
  );
};

const Button = styled.button``;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-width: 100%;
`;

const LabelGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Email = styled.div`
  display: flex;
  justify-content: center;
`;

const FormGroup = styled.div`
  border-bottom: 0.5px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: bold;
  }

  input[type="text"],
  input[type="email"] {
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default CheckoutForm;
