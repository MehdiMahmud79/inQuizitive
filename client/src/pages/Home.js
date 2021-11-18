import React, { useState, useEffect } from "react";

import "./style.css";

import Auth from "../utils/auth";
import { searchQuiz } from "../utils/API";

const Home = () => {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchQuiz(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger container.
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </p>
      </div>
    </>
  );
};

export default Home;
