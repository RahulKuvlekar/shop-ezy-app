import React from "react";
import useCustomContext from "../../Hooks/UseCustomContext";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";
import "./HomeBody.css";
import FilterSidebar from "../FilterSidebar/FilterSidebar";

const HomeBody = () => {
  const { products, sortBy, byStock, byFastDelivery, byRating, searchQuery } =
    useCustomContext();

  const filterProducts = () => {
    let filteredProducts = products;

    if (sortBy) {
      filteredProducts = filteredProducts.sort((a, b) =>
        sortBy === "LowToHigh" ? a.price - b.price : b.price - a.price
      );
    }
    if (!byStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.inStock > 0
      );
    }
    if (byFastDelivery) {
      filteredProducts = filteredProducts.filter(
        (product) => product.fastDelivery
      );
    }
    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (product) => product.ratings >= byRating
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return filteredProducts;
  };
  return (
    <div className="home__section">
      <FilterSidebar />
      <div className="product__container">
        {products.length > 0 &&
          filterProducts().map((product) => (
            <SingleProduct product={product} key={product.id}></SingleProduct>
          ))}
      </div>
    </div>
  );
};

export default HomeBody;
