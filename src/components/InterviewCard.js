//InterviewCard (components 안에 있는 파일 )

import React from "react";
import styled from "styled-components";
import { Button, Text } from "../elements";

import { useDispatch } from 'react-redux';
import { history } from "../redux/configureStore";

const InterviewCard = (props) => {
  // console.log(props)
  const dispatch = useDispatch();
  // const { history } = props;
  return (
    <Container>
          <Card >
          <Cardhead>
            <Text>{props.date}</Text>
            <Text>{props.nickname}</Text>
          </Cardhead>
          <Questionbox>
            <Text>{props.questionTitle}</Text>
          </Questionbox>
          <Button text="다른사람은 이렇게 답변했어요!" _onClick={() => {
                    history.push(`/detail/${props._id}`);
                  }}></Button>
        </Card>
    </Container>
  );
};

// 데이터가 없으면 오류가 나기때문에 디폴트값을 지정해주는 작업
InterviewCard.defaultProps = {
  questions: "리액트에서 리덕스를 왜 사용하나요?",
  user_name: "dokyung",
  date: "2022-02-13",
};

//스타일 잡아주기 !
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin: 60px;
  justify-content: center; /* 수평 가운데 정렬 */
`;

const Card = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

//날짜, 작성자부분
const Cardhead = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Questionbox = styled.div`
  height: 150px;
  padding-top: 50px;
  box-sizing: border-box;
`;

export default InterviewCard;
