import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import ProductBoxes from "./ProductBoxes";
import { FiLoader } from "react-icons/fi";
import { MdOutlineWatchLater } from "react-icons/md";

// Product Page | Includes Filter and Sort Functionalities | Pagination of Products
const Product = () => {
  const { category } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState(null); // inital total products data
  const [saveProducts, setSaveProducts] = useState([]); // secondary copy of products data for filtering
  const [productsOnCurrentPage, setProductsOnCurrentPage] = useState([]); // current page of products
  const [filteredProducts, setFilteredProducts] = useState(null); // filtered products
  const [pageNumber, setPageNumber] = useState(1); // pagination links of page numbers
  const [stockCheck, setStockCheck] = useState(false); // inStock filter value
  const [sortValue, setSortValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [filters, setFilters] = useState({
    price: "all",
    brand: "all",
    category: "all",
    bodyLoc: "all",
    inStock: false,
  });

  const itemsPerPage = 20;
  let prodLength = null;
  let numOfPages = null;
  let pageLinkArray = [];

  // FETCH Products Data --------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    fetch(`/items-with-company-names`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          throw new Error(data.message);
        }
        setProducts(data);
        setFilteredProducts(data);
        setSaveProducts(data);
        setProductsOnCurrentPage(data.slice(0, 20));
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // SORT Products Handler --------------------------------------------------------------------------------------------------------------------
  const handleSort = (value) => {
    let sortedArray = [];
    setSortValue(value);

    // Sort by Price | Low to High
    if (products && value === "priceUp") {
      sortedArray = [...filteredProducts].sort((a, b) => {
        return Number(a.price.slice(1)) - Number(b.price.slice(1));
      });
    }

    // Sort by Price | High to Low
    if (products && value === "priceDown") {
      sortedArray = [...filteredProducts].sort((a, b) => {
        return Number(b.price.slice(1)) - Number(a.price.slice(1));
      });
    }

    // Sort by Name
    if ((products && value === "name") || value === "") {
      sortedArray = [...filteredProducts].sort((c, d) => {
        return c.name.localeCompare(d.name);
      });
    }

    // Sort by Company / Brand
    if (products && value === "companyId") {
      sortedArray = [...filteredProducts].sort((e, f) => {
        return e.companyName.localeCompare(f.companyName);
      });
    }

    // Sort by Category
    if (products && value === "category") {
      sortedArray = [...filteredProducts].sort((g, h) => {
        return g.category.localeCompare(h.category);
      });
    }

    // Sort by Body Location
    if (products && value === "body_location") {
      sortedArray = [...filteredProducts].sort((i, j) => {
        return i.body_location.localeCompare(j.body_location);
      });
    }

    setFilteredProducts(sortedArray);
    setProductsOnCurrentPage(sortedArray.slice(0, 20));
  };

  // FILTER --------------------------------------------------------------------------------------------------------------------------------
  let productArr = [...saveProducts];

  // Category Filter set based on Params
  useEffect(() => {
    if (category !== undefined) {
      const last = category.slice(1);
      const first = category.slice(0, 1).toUpperCase();
      const usableParam = first + last;
      setCategoryFilter(usableParam);
    }
  }, [category]);

  // Handle Filter
  const handleFilter = (val, id) => {
    setFilters({ ...filters, [id]: val });
    if (id === "category") {
      setCategoryFilter(val);
    }
  };

  // Filter Data
  useEffect(() => {
    // Filter in-stock checkbox
    if (filters.inStock) {
      productArr = productArr.filter((product) => {
        return product.numInStock > 0;
      });
    }

    // Filter Price
    if (filters.price !== "all") {
      let priceRange = filters.price.split("-");
      productArr = productArr.filter((product) => {
        return (
          Number(product.price.slice(1)) > priceRange[0] &&
          Number(product.price.slice(1)) < priceRange[1]
        );
      });
    }

    // Filter Company/Brand
    if (filters.brand !== "all") {
      let brand = filters.brand;
      productArr = productArr.filter((product) => {
        return product.companyName === brand;
      });
    }

    // Filter Category
    if (filters.category !== "all") {
      let category = filters.category;
      productArr = productArr.filter((product) => {
        return product.category === category;
      });
    }

    // Filter Body Location
    if (filters.bodyLoc !== "all") {
      let bodyLoc = filters.bodyLoc;
      productArr = productArr.filter((product) => {
        return product.body_location === bodyLoc;
      });
    }
    setSortValue("");
    setFilteredProducts(productArr);
    setProductsOnCurrentPage(productArr.slice(0, 20));
  }, [
    filters.price,
    filters.brand,
    filters.category,
    filters.bodyLoc,
    filters.inStock,
  ]);

  // Pagination | Set Per-Page Products | Handle Click of Page Numbers -----------------------------------------------------
  const pageClick = (key) => {
    setPageNumber(Number(key));
    let endIndex = key * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;
    const productOnPage = filteredProducts.slice(startIndex, endIndex);
    setProductsOnCurrentPage(productOnPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Next and Back Button Clicks
  const navigationClick = (key) => {
    const nextPage = key === "next" ? pageNumber + 1 : pageNumber - 1;
    setPageNumber(nextPage);
    let endIndex = nextPage * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;
    const productOnPage = filteredProducts.slice(startIndex, endIndex);
    setProductsOnCurrentPage(productOnPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create Page Numbers based on filtered products
  if (products && productsOnCurrentPage) {
    prodLength = filteredProducts.length;
    numOfPages = Math.ceil(prodLength / itemsPerPage);

    for (let i = 1; i <= numOfPages; i++) {
      pageLinkArray.push(i);
    }
  }

  // Reset isActive Page Position when Filters are used
  useEffect(() => {
    setPageNumber(1);
  }, [filteredProducts]);

  if (isLoading) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }

  return (
    <>
      {!products ||
      !productsOnCurrentPage ||
      !filteredProducts ||
      !pageNumber ? (
        <p> ... </p>
      ) : (
        <>
          {filteredProducts !== null &&
          products.length === 0 &&
          productsOnCurrentPage.length === 0 &&
          filteredProducts.length === 0 ? (
            <NoResults>
              Oops! No results found. Adjust your search and try again!
            </NoResults> // This Error should not occur but is left as 'just-in-case'
          ) : (
            <>
              <ProductFilter
                handleSort={handleSort}
                handleFilter={handleFilter}
                filteredProducts={filteredProducts}
                stockCheck={stockCheck}
                setStockCheck={setStockCheck}
                setSortValue={setSortValue}
                sortValue={sortValue}
                categoryFilter={categoryFilter}
              />
              <Wrapper>
                <ProductContainer>
                  <PaginationNums>
                    <BackButton
                      type="button"
                      disabled={pageNumber === 1}
                      onClick={() => navigationClick("back")}
                    >
                      Back
                    </BackButton>
                    {pageLinkArray.map((page, index) => {
                      const isActive = page === pageNumber;
                      return (
                        <StyledLink
                          id={page}
                          active={isActive}
                          key={`page-${index}`}
                          onClick={(ev) => pageClick(ev.target.id)}
                        >
                          {page}
                        </StyledLink>
                      );
                    })}
                    <NextButton
                      type="button"
                      disabled={pageNumber === numOfPages}
                      onClick={() => navigationClick("next")}
                    >
                      Next
                    </NextButton>
                  </PaginationNums>
                  <Main>
                    {productsOnCurrentPage.map((product, index) => {
                      return (
                        <ProductCard to={`/items/${product._id}`}>
                          <ProductBoxes
                            category={product.category}
                            bodyLoc={product.body_location}
                            companyName={product.companyName}
                            imgSrc={product.imageSrc}
                            name={product.name}
                            price={product.price}
                            key={product._id + " " + index}
                          />
                        </ProductCard>
                      );
                    })}
                  </Main>
                  <PaginationNums>
                    <BackButton
                      type="button"
                      disabled={pageNumber === 1}
                      onClick={() => navigationClick("back")}
                    >
                      Back
                    </BackButton>
                    {pageLinkArray.map((page, index) => {
                      const isActive = page === pageNumber;
                      return (
                        <StyledLink
                          id={page}
                          active={isActive}
                          key={`page-${index}`}
                          onClick={(ev) => pageClick(ev.target.id)}
                        >
                          {page}
                        </StyledLink>
                      );
                    })}
                    <NextButton
                      type="button"
                      disabled={pageNumber === numOfPages}
                      onClick={() => navigationClick("next")}
                    >
                      Next
                    </NextButton>
                  </PaginationNums>
                </ProductContainer>
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  );
};

const StyledLink = styled.a`
  font-weight: normal;
  padding: 4px;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "white" : "#B59575")};
  cursor: pointer;
`;

const ProductCard = styled(Link)`
  color: black;
  text-decoration: none;
  background: rgb(127, 127, 127);
  border-bottom: 5px solid #b59575;
  border-radius: 5px;
  margin: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 50%,
    rgba(204, 204, 204, 1) 86%,
    rgba(153, 153, 153, 1) 100%
  );

  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    transform: scale(1.05);
  }
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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 1400px;
  margin: auto;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NoResults = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
`;

const PaginationNums = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 10px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const NextButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

const ProductContainer = styled.div``;

export default Product;
