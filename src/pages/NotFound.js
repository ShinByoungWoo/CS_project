import React from "react";
import { useHistory } from "react-router-dom";

const NotFound = (props) => {
  let history = useHistory();
  return (
    <div>
      <h1>주소가 올바르지 않아요!</h1>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default NotFound;
