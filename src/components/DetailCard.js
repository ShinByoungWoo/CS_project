// 하트는 초기값이 빈하트
// 삭제 수정 버튼은 본인이 올린 글만 나오게

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as answerActions } from "../redux/modules/answer";
import { Text, Grid, Button } from "../elements";
import { useHistory } from "react-router";

import { CgChevronDoubleUp } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const DetailCard = (props) => {
  console.log(props);

  const answer_id = props;
  console.log(answer_id);

  const dispatch = useDispatch();
  //   const { history } = props;
  const history = useHistory();
  const [likeState, setLikeState] = React.useState("");
  const [post, setPost] = React.useState("");
  console.log(post, setPost);
  console.log(likeState, setLikeState);

  const postlist = useSelector((state) => state.user.user);
  console.log(postlist); // null

  React.useEffect(() => {
    // dispatch(likeActions.getAnswerDB());
  }, []);

  const quest_lists = [
    {
      authorization: "Bearer token",
      questionTitle: "cs란 무엇인가요",
    },
  ];

  // useEffect(() => {
  //   // 리스트 불러오기
  //   dispatch(answerActions.getQuestionDB());
  // }, []);

  return (
    <React.Fragment>
      <Wrap>
        {/* 작성자와 답변하기 버튼 , 질문 내용 */}
        <Grid padding={"16px"} margin={"40px 0px"} is_flex>
          <Text bold size={"16px"}>
            작성자: {props.nickname}
          </Text>
          <Text size={"32px"} bold>
            질문내용
          </Text>
          <Button
            width={"100px"}
            _onClick={() => {
              history.push("/answerwrite");
            }}
          >
            답변하기
          </Button>
        </Grid>

        {/* 카드 생성구역 */}

        <QuestionCard>
          <BtnGroup>
            {/* 색칠 된 하트  is_me를 사용해서 하트 눌렀는지 확인*/}
            <Btn
              style={{ display: "flex" }}
              onClick={() => {
                setLikeState(false);
                const newPostLikeCnt = post.postLikeCnt - 1;
                setPost({ ...post, postLikeCnt: newPostLikeCnt });
                dispatch(likeActions.toggleLikeDB(answer_id, false));
              }}
            >
              <Text size="15px" margin="0px">
                {props.postLikeCnt}
              </Text>
              <AiFillHeart color={"red"} className="like" />
            </Btn>

            {/* 색칠 안된 하트 */}
            <Btn
              style={{ display: "flex" }}
              onClick={() => {
                setLikeState(true);
                const newPostLikeCnt = post.postLikeCnt - 1;
                setPost({ ...post, postLikeCnt: newPostLikeCnt });
                dispatch(likeActions.toggleLikeDB(answer_id, false));
              }}
            >
              <Text size="15px" margin="0px">
                {props.postLikeCnt}
              </Text>
              <AiOutlineHeart className="dislike" />
            </Btn>

            {/* 수정버튼 */}
            <Btn
              onClick={() => {
                history.push("/answerwrite");
              }}
            >
              <FiEdit className="edit" />
            </Btn>

            {/* 삭제버튼 */}
            <Btn
              onClick={() => {
                // 삭제 디스패치 여기에
              }}
            >
              <RiDeleteBin6Line className="delete" />
            </Btn>
          </BtnGroup>
          <Text bold>카드 질문 내용</Text>
        </QuestionCard>

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

DetailCard.defaultProps = {
  title: "질문내용",
  usernick: "병우병우머리머리",
  content: "카드 속 질문내용",
  post_date: "2022-02-15 03:00:00",
  postLikeCnt: 0,
  is_me: false,
};

const Wrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100vw;
  text-align: left;
  justify-content: center;
`;

// const QuestionInput = styled.input`
//   border: 1px solid #212121;
//   width: 80vw;
//   padding: 12px 4px;
//   box-sizing: border-box;
// `;

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

export default DetailCard;
