import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router"; // 병우추가

import { useSelector, useDispatch } from "react-redux";
import { Grid, Text, Button, Image, Input } from "../elements";
import { actionCreators as answerActions } from "../redux/modules/answer"; // 병우추가

const AnswerWrite = (props) => {
  const dispatch = useDispatch();
  // console.log(props);
  const is_login = useSelector((state) => state.user.is_login);
  // const { history } = props;

  const [answers, setAnswers] = React.useState("");

  //작성된 내용 넘겨주기
  const changeAnswers = (e) => {
    setAnswers(e.target.value);
  };

  //병우추가
  React.useEffect(() => {
    dispatch(answerActions.loadAnswerDB());
  }, []);

  const history = useHistory(); 

  const question_list = useSelector((state) => state.question.list);

  // console.log(question_list);

  // const question_id = useSelector(state => state.question.qId) 
  

  const id = props.match.params.id;
  console.log(id)
  const question_idx = question_list.findIndex((q) => q._id === id);
  console.log(question_idx)
  const question = question_list[question_idx];
  console.log(question)

  const addAnswer = () => {

    dispatch(answerActions.addAnswerDB(answers));
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
      <Frame>
        <Text color="white" size="30px">
          {question.questionTitle}
        </Text>
        <Input multiLine _onChange={changeAnswers}></Input>
        <BtnBox>
          <Button
            margin="10px"
            padding="10px"
            width="80px"
            text="취소"
            _onClikt={() => {
              // history.goBack(); // 이거 왜 안돼?
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
