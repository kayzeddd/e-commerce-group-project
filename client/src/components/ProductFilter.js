import { useEffect } from "react";
import styled from "styled-components";

const ProductFilter = ({
  handleSort,
  handleFilter,
  filteredProducts,
  stockCheck,
  setStockCheck,
  sortValue,
  categoryFilter,
}) => {
  // Create Category Dropdown | Sort Alphabetically
  let categoryArr = [];
  filteredProducts.forEach((product) => {
    if (!categoryArr.includes(product.category)) {
      categoryArr.push(product.category);
      categoryArr = [...categoryArr].sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  });

  // Create BodyLocation Dropdown | Sort Alphabetically
  let bodyLocArr = [];
  filteredProducts.forEach((product) => {
    if (!bodyLocArr.includes(product.body_location)) {
      bodyLocArr.push(product.body_location);
      bodyLocArr = [...bodyLocArr].sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  });

  // Company Name Dropdown | Sort Alphabetically
  let brandArr = [];
  filteredProducts.forEach((product) => {
    if (!brandArr.includes(product.companyName)) {
      brandArr.push(product.companyName);
      brandArr = [...brandArr].sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  });

  // Price Range Dropdown
  let priceArr = [];
  filteredProducts.forEach((product) => {
    if (
      Number(product.price.slice(1)) > 0 &&
      Number(product.price.slice(1)) < 25
    ) {
      if (!priceArr.some((object) => object.display === "Under $25")) {
        priceArr.push({ display: "Under $25", value: "0-25", id: "under25" });
      }
    }
    if (
      Number(product.price.slice(1)) >= 25 &&
      Number(product.price.slice(1)) <= 49
    ) {
      if (!priceArr.some((object) => object.display === "$25-$49")) {
        priceArr.push({ display: "$25-$49", value: "25-49", id: "25to50" });
      }
    }
    if (
      Number(product.price.slice(1)) >= 50 &&
      Number(product.price.slice(1)) <= 99
    ) {
      if (!priceArr.some((object) => object.display === "$50-$99")) {
        priceArr.push({ display: "$50-$99", value: "50-99", id: "50to100" });
      }
    }
    if (
      Number(product.price.slice(1)) >= 100 &&
      Number(product.price.slice(1)) <= 199
    ) {
      if (!priceArr.some((object) => object.display === "$100-$199")) {
        priceArr.push({
          display: "$100-$199",
          value: "100-200",
          id: "100to200",
        });
      }
    }
    if (
      Number(product.price.slice(1)) >= 200 &&
      Number(product.price.slice(1)) <= 299
    ) {
      if (!priceArr.some((object) => object.display === "$200-$299")) {
        priceArr.push({
          display: "$200-$299",
          value: "200-300",
          id: "200to300",
        });
      }
    }
    if (
      Number(product.price.slice(1)) >= 300 &&
      Number(product.price.slice(1)) <= 1000000
    ) {
      if (!priceArr.some((object) => object.display === "Over $300")) {
        priceArr.push({
          display: "Over $300",
          value: "300-1000000",
          id: "over300",
        });
      }
    }
  });

  // Sort Price Range
  priceArr.sort((a, b) => {
    return Number(a.value.split("-")[0]) - Number(b.value.split("-")[0]);
  });

  priceArr.sort((c, d) => {
    if (c.display === "Under $25") {
      return -1;
    }
    if (d.display === "Over $300") {
      return -1;
    }
  });

  // Handle checkBox Check
  const handleCheck = (checked, value) => {
    setStockCheck(!stockCheck);
    handleFilter(checked, value);
  };

  return (
    <>
      {!filteredProducts ? (
        <p> ... </p>
      ) : (
        <>
          <Wrapper>
            <Filters>
              <FilterWrap>
                <Label htmlFor="price"> Price </Label>
                <Select
                  onChange={(ev) => handleFilter(ev.target.value, ev.target.id)}
                  id="price"
                >
                  <Option value="all" id="all">
                    {" "}
                    All{" "}
                  </Option>
                  {priceArr.map((priceRange) => {
                    return (
                      <Option
                        value={priceRange.value}
                        id={priceRange.id}
                        key={priceRange.id}
                      >
                        {priceRange.display}
                      </Option>
                    );
                  })}
                </Select>
              </FilterWrap>

              <FilterWrap>
                <Label htmlFor="brand"> Brand </Label>
                <Select
                  onChange={(ev) => handleFilter(ev.target.value, ev.target.id)}
                  id="brand"
                >
                  <Option value="all" id="all">
                    All
                  </Option>
                  {brandArr.map((brand) => {
                    return (
                      <Option value={brand} id={brand} key={brand}>
                        {" "}
                        {brand}{" "}
                      </Option>
                    );
                  })}
                </Select>
              </FilterWrap>

              <FilterWrap>
                <Label htmlFor="category"> Category </Label>
                <Select
                  value={categoryFilter}
                  onChange={(ev) => handleFilter(ev.target.value, ev.target.id)}
                  id="category"
                >
                  <Option value="all" id="all">
                    All
                  </Option>
                  {categoryArr.map((category) => {
                    return (
                      <Option value={category} id={category} key={category}>
                        {" "}
                        {category}{" "}
                      </Option>
                    );
                  })}
                </Select>
              </FilterWrap>

              <FilterWrap>
                <Label htmlFor="bodyLoc"> Body Location </Label>
                <Select
                  onChange={(ev) => handleFilter(ev.target.value, ev.target.id)}
                  id="bodyLoc"
                >
                  <Option value="all" id="all">
                    All
                  </Option>
                  {bodyLocArr.map((bodyLoc) => {
                    return (
                      <Option value={bodyLoc} id={bodyLoc} key={bodyLoc}>
                        {" "}
                        {bodyLoc}{" "}
                      </Option>
                    );
                  })}
                </Select>
              </FilterWrap>
            </Filters>
          </Wrapper>

          <Sort>
            <Label htmlFor="sort">Sort by</Label>
            <Select
              value={sortValue}
              onChange={(ev) => handleSort(ev.target.value)}
            >
              <Option value=""> Select </Option>
              <Option value="name"> Name</Option>
              <Option value="priceUp"> Price ↑</Option>
              <Option value="priceDown"> Price ↓</Option>
              <Option value="companyId"> Brand</Option>
              <Option value="category"> Category </Option>
              <Option value="body_location"> Body </Option>
            </Select>

            <CheckBoxWrap>
              <CheckLabel htmlFor="inStock">In Stock</CheckLabel>
              <Input
                type="checkbox"
                value="inStock"
                checked={stockCheck}
                onChange={(ev) =>
                  handleCheck(ev.target.checked, ev.target.value)
                }
              />
            </CheckBoxWrap>
          </Sort>
        </>
      )}
    </>
  );
  return <></>;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px 0;
  background: #4a5059;
  border-top: 1px solid #b59575;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  max-width: 1200px;
`;
const FilterWrap = styled.div`
  padding: 0 10px;
`;

const Sort = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 15px 0 0 15px;
`;

const Select = styled.select`
  width: 100px;
  font-size: 0.75rem;
  border-radius: 15px;
  padding: 5px 10px;
  width: 125px;
  border-color: lightgrey;
`;

const Option = styled.option`
  font-size: 1rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  padding: 5px;
  font-weight: bold;
  color: white;
`;

const Input = styled.input``;

const CheckLabel = styled.label`
  font-size: 0.8rem;
  color: #4a5059;
  padding-left: 15px;
`;

const CheckBoxWrap = styled.div`
  display: flex;
  width: 100px;
  align-items: center;
`;

export default ProductFilter;
