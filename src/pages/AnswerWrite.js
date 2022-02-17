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
  
  React.useEffect(() => {
    dispatch(questionActions.loadQuestionDB());
    if (is_edit && !answer) {
      window.alert("답변 내용이 확인되지 않아 이전 페이지로 되돌아 갑니다!")
      history.goBack();

      return;
    }
    if (is_edit){
      answer && (setAnswers(answer.answer));
    }
  }, []);

// 답변 생성 넘겨주기
const [answers, setAnswers] = React.useState("");
const changeAnswers = (e) => {
  setAnswers(e.target.value);
};

  //is_edit
  const questionList = useSelector((state) => state.question.list);
  const answerList = useSelector((state) => state.answer.list);

  const paramsId = props.match.params.id;
  const questionIndex = questionList.findIndex((e) => e._id === paramsId);
  let is_edit = questionIndex === -1 ? true : false;
  //  true : answer . flase : question
  let answerIndex = is_edit ? answerList.findIndex((a) => a._id === paramsId) : questionIndex;
  console.log(answerIndex);
  const answer = answerList[answerIndex];
  console.log(answer);

  const question = questionList[questionIndex];
  console.log(question);


  // 답변 생성

  const editAnswer = () => {
    dispatch(answerActions.editAnswerDB(paramsId, answers));
  };
  const addAnswer = () => {
    dispatch(answerActions.addAnswerDB(paramsId, answers));
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
        {(is_edit ? answer : question) && (
          <Text size="30px">
            {is_edit ? "답변 수정" : question.questionTitle}
          </Text>
        )}
        
        <Input multiLine  value={answers} _onChange={changeAnswers}></Input>
        <BtnBox>
          <Button
            margin="10px"
            padding="10px"
            width="80px"
            text="취소"
            _onClick={() => {
              history.goBack();
            }}
          ></Button>
          {is_edit ? (
          <Button
          margin="10px"
          width="80px"
          text="수정하기"
          _onClick={() => {
            editAnswer();
            history.goBack();
          }}
        ></Button>
        ) : (
          <Button
            margin="10px"
            width="80px"
            text="작성하기"
            _onClick={() => {
              addAnswer();
              history.goBack();
            }}
          ></Button>
        )}
        </BtnBox>
      </Frame>
    </React.Fragment>
  );
};

const Container = styled.div`
  margin-top: 150px;
`;

const Frame = styled.div`
  background-color: white;
  width: 50%;
  padding: 30px;
  margin: 25px;
  border-radius: 20px;
  box-shadow: 5px 5px 10px black;
  display: grid;
  margin: auto;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default AnswerWrite;
