import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

// Components
import Header from "./Header";
import Homepage from "./Homepage";
import Product from "./Product";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";
import Confirmation from "./Confirmation";
import Footer from "./Footer";
import Categories from "./Categories";
import Orders from "./Orders";

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Product />} />
            <Route path="/category" element={<Product />} />
            <Route path="/category/:category" element={<Categories />} />
            <Route path="/items/:_id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation/:orderId" element={<Confirmation />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
};

const Main = styled.div`
  min-height: 80vh;
`;

const Wrapper = styled.div`
  font-family: 'Raleway', sans-serif;
  min-height: 100vh;
  background-color: #1f1f1f;
`;

export default App;
