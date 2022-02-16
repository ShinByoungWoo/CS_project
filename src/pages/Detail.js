import React from "react";
import DetailCard from "../components/DetailCard";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { useHistory } from "react-router";
import { Grid, Text, Button } from "../elements";

const Detail = (props) => {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(answerActions.loadAnswerDB());
  }, []);

  const questionList = useSelector((state) => state.question.list);
  const answerList = useSelector((state) => state.answer.list);
  // console.log(answerList);
  // console.log(questionList);

  const post_idx = questionList.findIndex((p) => p._id === id);
  const post = questionList[post_idx];

  return (
    <Grid padding={"16px"}>
      <Text bold size={"16px"}>
        {post && post.date}
      </Text>
      <Grid margin={"40px 0px"} is_flex>
        <Text bold size={"16px"}>
          {post && post.nickname}
        </Text>
        <Text size={"32px"} bold>
          {post && post.questionTitle}
        </Text>
        <Button
          width={"100px"}
          _onClick={() => {
            history.push(`/detail/${id}/answerwrite`);
          }}
        >
          답변하기
        </Button>
      </Grid>
      <Wrap>
        {answerList && answerList.map((v, i) => {
          return (<DetailCard key={i} {...v} />) 
        })}
      </Wrap>
    </Grid>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  /* float: left; */
  width: 100vw;
  text-align: left;
  justify-content: center;
`;

export default Detail;
