// 하트는 초기값이 빈하트
// 삭제 수정 버튼은 본인이 올린 글만 나오게

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as likeActions } from "../redux/modules/like"; // 라이크 다시 가져옴 ㅠ
import { actionCreators as answerActions } from "../redux/modules/answer";
import { Text } from "../elements";
import { useHistory } from "react-router";

import { CgChevronDoubleUp } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import instance from "../shared/api";

const DetailCard = (props) => {
  useEffect(() => {
    dispatch(likeActions.likeCountDB(answer_id));
  });
  
  const answer_id = props._id; //answer의 Id
  console.log(props.postLikeCnt);
  // console.log(answer_id);
  const dispatch = useDispatch();
  // const { history } = props;
  const history = useHistory();

  // console.log(props.countLikes)
  const count = useSelector((state) => state.like);
  console.log(count);

  const [likeState, setLikeState] = React.useState("");
  const [list, setList] = React.useState("");


  const is_token = localStorage.getItem("token") ? true : false;
  console.log(is_token);


  return (
    <React.Fragment>
    <Wrap>
      <BtnGroup>
        {is_token && likeState ? (
          <Btn
            // 풀 하트
            style={{ display: "flex" }}
            onClick={() => {
              setLikeState(false);

              const newPostLikeCnt = parseInt(list.postLikeCnt) - 1;
              setList({ ...list, postLikeCnt: newPostLikeCnt });
              dispatch(likeActions.deleteLikeDB(answer_id));
            }}
          >
            <AiFillHeart color={"red"} className="like" />
            <Text size="25px" margin="0px">
             
            </Text>
          </Btn>
        ) : (
          // 빈 하트
          <Btn
            style={{ display: "flex" }}
            onClick={() => {
              setLikeState(true);

              const newPostLikeCnt = parseInt(list.postLikeCnt) + 1;
              setList({ ...list, postLikeCnt: newPostLikeCnt });

              dispatch(likeActions.addLikeDB(answer_id, true));
            }}
          >
            <AiOutlineHeart size="25px" className="dislike" />
            <Text size="20px" margin="0px">
              
            </Text>
          </Btn>
        )}
        {/* 수정버튼 */}
        <Btn
          onClick={() => {
            history.push(`/detail/${props._id}/answerwrite`);
          }}
        >
          <FiEdit className="edit" />
        </Btn>

        {/* 삭제버튼 */}
        {props && (
          <Btn
            onClick={() => {
              dispatch(answerActions.deleteAnswerDB(props._id));
            }}
          >
            <RiDeleteBin6Line className="delete" />
          </Btn>
        )}
        
      </BtnGroup>
      <QuestionCard>
        <Text bold>{props.answer}</Text>
      </QuestionCard>
    </Wrap>

    <TopBtn
      onClick={() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
    >
      <CgChevronDoubleUp />
    </TopBtn>
  </React.Fragment>
);
};

DetailCard.defaultProps = {
title: "질문내용",
usernick: "머리머리",
content: "카드 속 답변내용",
post_date: "2022-02-15 03:00:00",
postLikeCnt: 0,
is_me: false,
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
padding: 20px;

@media only screen and (max-width: 768px) {
  min-width: 330px;
}
`;

const QuestionCard = styled.div`
height: 150px;
padding-top: 15px;
box-sizing: border-box;
@media only screen and (max-width: 768px) {
  min-width: 330px;
}
`;
const BtnGroup = styled.div`
display: flex;
justify-content: space-around;
`;

const Btn = styled.button`
width: 50px;
height: 20px;
margin: 0px 5px;
font-size: 25px;
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

export default DetailCard;
