import React from "react";
import DetailCard from "../components/DetailCard";
import { useDispatch } from "react-redux";
import { actionCreators as likeActions } from "../redux/modules/answer";

import { Grid } from "../elements";

const Detail = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(likeActions.getAnswerDB());
  }, []);

  return (
    <Grid>
      <DetailCard />
    </Grid>
  );
};

export default Detail;
