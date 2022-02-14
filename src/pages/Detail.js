// 하트는 초기값이 빈하트 
// 삭제 수정 버튼은 본인이 올린 글만 나오게 

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { Input, Text, Grid, Button } from "../elements";

import { CgChevronDoubleUp } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Detail = (props) => {
  const dispatch = useDispatch();

  // const quest_lists = useState((state) => state.answer.list);     //answer.js에서 값 가져오기
  const quest_lists = [
    {
      authorization: "Bearer token",
      questionTitle: "cs란 무엇인가요",
    },
  ];

  const cards = [
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
    {
      answer:
        "포인터는 포인터다eeeeeeedddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeee.asdasd",
    },
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
    {
      answer: "포인터는 포인터다eeeeeeeeeeee.asdasd",
    },
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
    {
      answer: "포인터는 포인터다eeeeeeeeeeee.asdasd",
    },
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
    {
      answer: "포인터는 포인터다eeeeeeeeeeee.asdasd",
    },
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
    {
      answer: "포인터는 포인터다eeeeeeeeeeee.asdasd",
    },
    {
      answer: "컴퓨터 사이언스. 컴퓨터 지식이다.",
    },
    {
      answer: "스택은 스택이다.",
    },
  ];

  // useEffect(() => {    // 리스트 불러오기
  //   if (quest_lists.length === 0) {
  //     dispatch(answerActions.getQuestionDB());
  //   }
  // }, []);

  return (
    <React.Fragment>
      <Wrap>
        {/* 작성자와 답변하기 버튼 , 질문 내용 */}
        <Grid padding={"16px"} margin={"40px 0px"} is_flex>
          <Text bold size={"16px"}>
            작성자: 신병우
          </Text>
          <Text size={"32px"} bold>
            질문내용
          </Text>
          {/* <Input multiLine placeholder={"질문하기 가져올 곳"}/> */}
          {/* <QuestionInput placeholder={"질문하기 가져올 곳"}/> */}
          <Button width={"100px"}>답변하기</Button>
        </Grid>

        {/* 카드 생성구역 */}
        {cards.map((list, index) => {
          return (
            <QuestionCard key={index}>
              <BtnGroup>
                
                <Btn>
                  <AiOutlineHeart className="like"/>
                  {/* <AiFillHeart color={"red"} className="like" /> */}
                </Btn>

                <Btn>
                  <FiEdit className="edit" />
                </Btn>
                <Btn>
                  <RiDeleteBin6Line className="delete" />
                </Btn>
              </BtnGroup>
              <Text bold>{list.answer}</Text>
            </QuestionCard>
          );
        })}

        <TopBtn
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          <CgChevronDoubleUp />
        </TopBtn>
      </Wrap>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100vw;
  text-align: left;
  justify-content: center;
`;

const QuestionInput = styled.input`
  border: 1px solid #212121;
  width: 80vw;
  padding: 12px 4px;
  box-sizing: border-box;
`;

const QuestionCard = styled.div`
  border: 1px solid black;
  margin: 20px;
  padding: 5px;
  box-sizing: border-box;
  width: 300px;
  height: 150px;
  text-align: center;
  word-break: break-all;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px;
`;

const Btn = styled.button`
  width: 50px;
  height: 20px;
  margin: 0px 5px;
  font-size: 16px;
  background-color: #81bef7;
  color: ${(props) => props.color};
  padding: 0px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  background: none;
  cursor: pointer;
`;

const TopBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  text-align: center;
  vertical-align: middle;
  bottom: 50px;
  right: 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;

export default Detail;
