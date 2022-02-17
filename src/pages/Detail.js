import React from "react";
import DetailCard from "../components/DetailCard";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { actionCreators as qustionActions } from "../redux/modules/question";
import { useHistory } from "react-router";
import { Grid, Text, Button } from "../elements";

const Detail = (props) => {
  const questionId = props.match.params.id;
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(qustionActions.loadQuestionDB());
    dispatch(answerActions.loadAnswerDB(questionId));
  }, []);

  const questionList = useSelector((state) => state.question.list);
  // console.log(questionList);
  const answerList = useSelector((state) => state.answer.list);
  console.log(answerList);

  const question_idx = questionList.findIndex((p) => p._id === questionId);
  // console.log(questionId)
  // console.log(question_idx)
  const question = questionList[question_idx];

  return (
    <Grid padding={"20px 20%"}>
    {/* {question &&  */}
    <Text bold size={"16px"}>
      {question && question.date}
    </Text>
    <Grid margin={"0% 20% 0px 20p%"} is_flex>
      <Text bold size={"16px"}>
        {question && question.nickname}
      </Text>
      <Text size={"32px"} bold>
        {question && question.questionTitle}
      </Text>
      <Button
        width={"100px"}
        _onClick={() => {
          history.push(`/detail/${questionId}/answerwrite`);
        }}
      >
        답변하기
      </Button>
    </Grid>

    {/*카드부분은 우선 완료!*/}
    <Wrap>
      {answerList.map((v, i) => {
        return <DetailCard key={i} {...v} />;
      })}
    </Wrap>
  </Grid>
);
};

//답변카드 스타일
const Wrap = styled.div`
display: flex;
flex-wrap: wrap;
gap: 30px;
padding: 30px;
justify-content: center; /* 수평 가운데 정렬 */
`;

export default Detail;