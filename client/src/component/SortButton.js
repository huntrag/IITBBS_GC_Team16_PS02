import React from "react";
import { useNavigate } from "react-router";
import { Select } from "semantic-ui-react";

function SortButton() {
  const options = [
    { key: "s", text: "Upvotes", value: "Upvotes" },
    { key: "t", text: "Newest", value: "createdAt" },
  ];
  const navigate = useNavigate();
  const changeSortingOrderHandler = (e) => {
    const sort = e.target.textContent === "Upvotes" ? "hot" : "";
    if (sort) navigate(`/?sort=${sort}`);
    else  navigate(`/`);
  };
  return (
    <Select
      placeholder="Sort By"
      options={options}
      onChange={changeSortingOrderHandler}
    />
  );
}

export default SortButton;
