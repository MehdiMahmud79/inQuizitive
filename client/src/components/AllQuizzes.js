import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAllQuizzes } from "../utils/queries";
const AllQuizzes = () => {
  const { loading, error, data, refetch } = useQuery(getAllQuizzes);
  useEffect(() => {
    if (!data) return;
    console.log("got data ", data);
    // data.getAllQuizzes[0].author;
  }, [data, loading]);

  return (
    <div className="flex-row">
      {!data ? "your data" : data.getAllQuizzes[0].author_id}{" "}
      {loading ? (
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default AllQuizzes;
