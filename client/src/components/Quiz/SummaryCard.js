import React from "react";

const SummaryCard = ({ questionRes }) => {
  return (
    <div className=" flex-1 divide-x-4 divide-gray-200 float-left m-2">
      {questionRes.res ? (
        <>
          <div className="text-green-900 flex-auto p-2 float-left">
            <i className="fas fa-check-circle text-green-600"></i>{" "}
            {questionRes.question}{" "}
          </div>
        </>
      ) : (
        <>
          <div className="text-red-900 flex-auto p-2 float-left">
            <i className=" fas fa-times-circle text-red-600"></i>{" "}
            {questionRes.question}{" "}
          </div>
        </>
      )}

      <hr />
    </div>
  );
};

export default SummaryCard;
