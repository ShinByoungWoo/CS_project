import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { Grid, Text, Button, Input } from "../elements";
import { actionCreators as questionActions } from "../redux/modules/question";

const QuestionWrite = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const { history } = props;
  const [questions, setQuestions] = React.useState("");

  //작성된 내용 넘겨주기
  const changeQuestions = (e) => {
    setQuestions(e.target.value);
  };
  const addQuestion = () => {
    dispatch(questionActions.addQuestionDB(questions));
  };
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
      <Container>
        <Frame>
          <Text color="black" size="30px">
            {" "}
            🤷‍♂️ 질문을 입력해주세요
          </Text>
          <Input width="100%" multiLine _onChange={changeQuestions}></Input>
          <Button
            margin="15px auto "
            width="150px"
            padding="16px"
            text="질문 작성 완료"
            _onClick={addQuestion}
          ></Button>
        </Frame>
      </Container>
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

export default QuestionWrite;
