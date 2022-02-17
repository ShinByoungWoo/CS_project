//InterviewCard (components 안에 있는 파일 )

import React from "react";
import styled from "styled-components";
import { Button, Text } from "../elements";

//아이콘
import { FcCalendar } from "react-icons/fc";
import { GiClick } from "react-icons/gi";

import { useDispatch } from "react-redux";
import { history } from "../redux/configureStore";

const InterviewCard = (props) => {
  // console.log(props);
  const dispatch = useDispatch();

  // const { history } = props;
  return (
    <Card>
      <Cardhead>
        <Text>
          <FcCalendar size="20px" />
          {props.date}
        </Text>
        <Text size="20px">{props.nickname}</Text>
      </Cardhead>

      <Questionbox>
        <Text size="25px">{props.questionTitle}</Text>
      </Questionbox>
      <GiClick
        margin-button="10px"
        size="50px"
        color="#212121"
        onClick={() => {
          history.push(`/detail/${props._id}`);
        }}
      ></GiClick>
    </Card>
  );
};

// 데이터가 없으면 오류가 나기때문에 디폴트값을 지정해주는 작업
InterviewCard.defaultProps = {
  questions: "리액트에서 리덕스를 왜 사용하나요?",
  user_name: "dokyung",
  date: "2022-02-13",
};

//스타일 잡아주기 !
// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap-reverse;
//   gap: 30px;
//   margin: 5px;
//   padding: 30px;
//   justify-content: center; /* 수평 가운데 정렬 */
// `;

const Card = styled.div`
  position: relative;
  width: 350px;
  height: 250px;
  padding: 20px;
  border: 3px solid #1b4332;
  border-radius: 10px;
  text-align: center;
  font-size: 20px;
  background-color: #fdfcdc;
  box-shadow: 5px 5px 10px #081c15;

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
  padding-top: 15px;
  box-sizing: border-box;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

const Btn = styled.button`
  width: 70%;
  height: 20%;
  background-color: white;
  text-align: center;
  padding: 12px 0px;
  background-color: #2c302e;
  border-radius: 5px;
  color: white;

  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

export default InterviewCard;
