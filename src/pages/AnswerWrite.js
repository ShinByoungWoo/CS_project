import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router"; // 병우추가

import { useSelector, useDispatch } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as answerActions } from "../redux/modules/answer"; // 병우추가
import { actionCreators as questionActions } from "../redux/modules/question";

const AnswerWrite = (props) => {
  const dispatch = useDispatch();
  const history = useHistory(); 
  // questionId와 일치하는 질문 내용 불러오기
  React.useEffect(() => {
    dispatch(questionActions.loadQuestionDB());
  }, []);
  
  const question_list = useSelector((state) => state.question.list);
  const questionId = props.match.params.id;
  const question_idx = question_list.findIndex((q) => q._id === questionId);
  const question = question_list[question_idx];
  console.log(question)

  // 답변 생성 넘겨주기
  const [answers, setAnswers] = React.useState("");
 const changeAnswers = (e) => {
    setAnswers(e.target.value);
  };

// 답변 생성
 const addAnswer = () => {
    dispatch(answerActions.addAnswerDB(questionId,answers));
  };
 
  // const is_login = useSelector((state) => state.user.is_login);
  
  /*로그인 되어있지 않을 경우 보여지는 페이지*/
  // if (!is_login) {
  //   return (
  //     <Grid margin="100px 0px" padding="16px" center>
  //       <Text size="32px" bold>
  //         앗! 잠깐!
  //       </Text>
  //       <Text size="16px">로그인 후에만 질문을 작성할 수 있어요!</Text>
  //       <Button
  //         _onClick={() => {
  //           history.replace("/login");
  //         }}
  //       >
  //         로그인 하러가기
  //       </Button>
  //     </Grid>
  //   );
  // }

  return (
    <React.Fragment>
      <Frame>
      {question&&
        <Text color="white" size="30px">
          {question.questionTitle}
        </Text>}
        <Input multiLine _onChange={changeAnswers}></Input>
        <BtnBox>
          <Button
            margin="10px"
            padding="10px"
            width="80px"
            text="취소"
            _onClikt={() => {
              history.goBack() // 왜안돼?
            }}
          ></Button>
          <Button
            margin="10px"
            width="80px"
            text="완료"
            _onClick={addAnswer} // 병우추가
          ></Button>
        </BtnBox>
      </Frame>
    </React.Fragment>
  );
};

const Frame = styled.div`
  background-color: #000000;
  padding: 30px;
  margin: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px #e71d36;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AnswerWrite;
