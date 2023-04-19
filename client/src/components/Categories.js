import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductBoxes from "./ProductBoxes";
import { FiLoader } from "react-icons/fi";
import { MdOutlineWatchLater } from "react-icons/md";
import Gaming from "./images/Gaming.png";
import Fitness from "./images/categories/fitness.jpeg";
import Medical from "./images/categories/medical.jpeg";
import Lifestyle from "./images/categories/lifestyle.jpeg";
import Pets from "./images/categories/pets.jpeg";
import Entertainment from "./images/categories/entertainment.jpeg";
import Industrial from "./images/categories/industrial.jpeg";

// Categories Page | Highlight Products in Selected Categories
const Categories = () => {
  const { category } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [products, setProducts] = useState(null); // inital total products data
  const [saveProducts, setSaveProducts] = useState([]); // secondary copy of products data for filtering
  const [productsOnCurrentPage, setProductsOnCurrentPage] = useState([]); // current page of products
  const [pageNumber, setPageNumber] = useState(1); // pagination links of page numbers
  const [productLength, setProductLength] = useState(null);

  const itemsPerPage = 20;
  let prodLength = null;
  let numOfPages = null;
  let pageLinkArray = [];

  // FETCH Products Data --------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    setisLoading(true);
    fetch(`/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          throw new Error(data.message);
        }
        setProducts(data);
        setSaveProducts(data);
        setProductsOnCurrentPage(data.slice(0, 20));
        setProductLength(data.length);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category]);

  // Pagination | Set Per-Page Products | Handle Click of Page Numbers -----------------------------------------------------
  const pageClick = (key) => {
    setPageNumber(Number(key));
    let endIndex = key * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;
    const productOnPage = saveProducts.slice(startIndex, endIndex);
    setProductsOnCurrentPage(productOnPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Next and Back Button Clicks
  const navigationClick = (key) => {
    const nextPage = key === "next" ? pageNumber + 1 : pageNumber - 1;
    setPageNumber(nextPage);
    let endIndex = nextPage * itemsPerPage;
    let startIndex = endIndex - itemsPerPage;
    const productOnPage = saveProducts.slice(startIndex, endIndex);
    setProductsOnCurrentPage(productOnPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Create Page Numbers based on products
  if (products && productsOnCurrentPage) {
    prodLength = saveProducts.length;
    numOfPages = Math.ceil(prodLength / itemsPerPage);

    for (let i = 1; i <= numOfPages; i++) {
      pageLinkArray.push(i);
    }
  }

  // Set Images to Params
  const images = {
    Gaming,
    Fitness,
    Medical,
    Lifestyle,
    Pets,
    Entertainment,
    Industrial,
  };
  let image = "";
  category === "Pets and Animals"
    ? (image = images["Pets"])
    : (image = images[category]);

  // Set Random Featured Products | If categories have more than 5 products to feature
  const randomIndexArr = () => {
    let featuredCopy = [];
    if (productLength > 5) {
      while (featuredCopy.length < 5) {
        const randomIndex = Math.floor(Math.random() * productLength);
        if (!featuredCopy.includes(randomIndex)) {
          featuredCopy.push(randomIndex);
        }
      }
    }
    return featuredCopy;
  };

  if (isLoading) {
    return (
      <LoaderIconPosition>
        <LoaderIcon />
      </LoaderIconPosition>
    );
  }

  return (
    <>
      {!products || !productsOnCurrentPage || !pageNumber ? (
        <p> ... </p>
      ) : (
        <>
          {products.length === 0 && productsOnCurrentPage.length === 0 ? (
            <NoResults>
              Oops! No results found. Adjust your search and try again!
            </NoResults> // This Error should not occur but is left as 'just-in-case'
          ) : (
            <>
              <Wrapper>
                <Banner image={image}>
                  <Title>{category}</Title>
                </Banner>
                {productLength > 5 && (
                  <Featured>
                    <FeaturedText>Featured {category} Products </FeaturedText>
                    <FeaturedProducts>
                      {products &&
                        randomIndexArr().map((index) => {
                          const product = products[index];
                          return (
                            <FeaturedLink to={`/items/${product._id}`}>
                              <Products
                                src={product.imageSrc}
                                key={product + "-" + index}
                              />
                            </FeaturedLink>
                          );
                        })}
                    </FeaturedProducts>
                  </Featured>
                )}
                <ProductContainer>
                  <BrowseTitle>
                    Browse More from {category} Category
                  </BrowseTitle>
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
                            numInStock={product.numInStock}
                            key={`product._id-${index}`}
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
// background: url(./${(props) => props.category});
const Banner = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

const Title = styled.h1`
  position: relative;
  font-size: 5rem;
  left: 30px;
  top: 100px;
  color: white;
`;

const Featured = styled.div`
  background: grey;
  width: 100%;
  margin: 30px;
  height: 300px;
  border-radius: 20px;
  background: linear-gradient(
    38deg,
    rgba(74, 74, 74, 1) 0%,
    rgba(32, 33, 37, 1) 100%
  );
`;

const BrowseTitle = styled.p`
  color: grey;
  text-align: center;
  font-size: 1.5rem;
`;

const FeaturedText = styled.p`
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
`;

const FeaturedProducts = styled.div`
  display: flex;
  opacity: 0;
  transform: translateY(30px);
  align-items: center;
  justify-content: center;
  animation: slide 1.5s forwards;
  @keyframes slide {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Products = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 20px;
  border: 3px #b59575 solid;
  -webkit-box-reflect: below 0px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.05));
  &:hover {
    transform: scale(1.2);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  }
`;

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
  border-radius: 20px;
  margin: 10px;
  border-bottom: 5px solid #b59575;
  border-radius: 5px;
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

const FeaturedLink = styled(Link)``;

const ProductContainer = styled.div``;

export default Categories;
