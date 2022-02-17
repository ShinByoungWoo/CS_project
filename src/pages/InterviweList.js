import React from "react";
import InterviewCard from "../components/InterviewCard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as questionActions } from "../redux/modules/question";
import styled from "styled-components";

import { BiEdit } from "react-icons/bi";

const InterviewList = (props) => {
  const dispatch = useDispatch();

  const { history } = props;

  React.useEffect(() => {
    dispatch(questionActions.loadQuestionDB());
  }, []);
  const questionList = useSelector((state) => state.question.list);
  console.log(questionList);

  return (
    <React.Fragment>
      <Container>
        <PostContainer>
          {questionList.map((v, i) => {
            return <InterviewCard key={i} {...v} />;
          })}
        </PostContainer>
        <Btn
          onClick={() => {
            history.push("/QuestionWrite");
          }}
        >
          <BiEdit size="70px" />
        </Btn>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  background-color: #fdffb6;
`;

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 30px;
  justify-content: center; /* 수평 가운데 정렬 */
`;

const Btn = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: 30px;
  position: fixed;
`;

export default InterviewList;
