import React from 'react';
import styled from 'styled-components';
import { Button, Text } from '../elements';

//아이콘
import { FcCalendar } from 'react-icons/fc';
import { GiClick } from 'react-icons/gi';

import { useDispatch } from 'react-redux';
import { history } from '../redux/configureStore';

const InterviewCard = (props) => {
  const dispatch = useDispatch();

  return (
    <Wrap>
      <BtnGroup>
        <Text>
          <FcCalendar size="20px" />
          {props.date}
        </Text>
        <Text size="20px">{props.nickname}</Text>
      </BtnGroup>

      <QuestionCard>
        <Text size="25px">{props.questionTitle}</Text>
      </QuestionCard>
      <GiClick
        margin-button="10px"
        size="50px"
        color="#212121"
        onClick={() => {
          history.push(`/detail/${props._id}`);
        }}
      ></GiClick>
    </Wrap>
  );
};

InterviewCard.defaultProps = {
  questions: '리액트에서 리덕스를 왜 사용하나요?',
  user_name: 'dokyung',
  date: '2022-02-13',
};

const Wrap = styled.div`
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

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionCard = styled.div`
  height: 150px;
  padding-top: 15px;
  box-sizing: border-box;
  @media only screen and (max-width: 768px) {
    min-width: 330px;
  }
`;

export default InterviewCard;
