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
  const selectList = ["Computer Science", "Data Structure", "Database", "Algorithm","JavaScript","React", "Node.js"];
  const [selected, setSelected] = React.useState("Computer Science");

  //작성된 내용 넘겨주기
  const changeQuestions = (e) => {
    setQuestions(e.target.value);
  };
  const addQuestion = () => {
    dispatch(questionActions.addQuestionDB(questions,selected));
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  

  return (
    <React.Fragment>
      <Container>
        <Frame>
          <Text color="black" size="30px">
            🤷‍♂️ 질문을 입력해주세요
          </Text>
          <Text>
            카테고리를 선택해주세요
          </Text>
          <select onChange={handleSelect} value={selected}>
          {selectList.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
          <Input width="100%" multiLine value={questions} _onChange={changeQuestions}></Input>
          <Button
            margin="15px auto "
            width="150px"
            padding="16px"
            text="질문 작성하기"
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
