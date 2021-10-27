import React from "react";
import "./FilterSidebar.css";
import Rating from "../Rating/Rating";
import { Form, Button } from "react-bootstrap";
import useCustomContext from "../../Hooks/UseCustomContext";

const FilterSidebar = () => {
  //   const [rating, setRating] = React.useState(0);
  const { sortBy, byStock, byFastDelivery, byRating, dispatchFilter } =
    useCustomContext();

  //   console.log(
  //     "Filter => ",
  //     sortBy,
  //     byStock,
  //     byFastDelivery,
  //     byRating,
  //   );
  return (
    <div className="filterSidebar__section">
      <h1 className="filterSidebar__title">Filter Products</h1>
      <hr />
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={(event) => {
            dispatchFilter({
              type: "SORT_BY_PRICE",
              payload: "LowToHigh",
            });
          }}
          checked={sortBy === "LowToHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={(event) => {
            dispatchFilter({
              type: "SORT_BY_PRICE",
              payload: "HighToLow",
            });
          }}
          checked={sortBy === "HighToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include Out of Stock"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={() =>
            dispatchFilter({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Delivery Only"
          name="group1"
          type="checkbox"
          id={`inline-4`}
          onChange={() =>
            dispatchFilter({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
      </span>
      <span>
        <label style={{ paddingRight: 10 }}>Rating: </label>
        <Rating
          rating={byRating}
          style={{ cursor: "pointer" }}
          onClick={(idx, event) => {
            //console.log("SIDEBAR => ", event);
            // setRating(idx + 1);
            dispatchFilter({
              type: "FILTER_BY_RATING",
              payload: idx + 1,
            });
          }}
        />
      </span>
      <Button
        variant="light"
        onClick={() =>
          dispatchFilter({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
