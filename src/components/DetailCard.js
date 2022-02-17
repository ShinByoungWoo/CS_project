// 하트는 초기값이 빈하트
// 삭제 수정 버튼은 본인이 올린 글만 나오게

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { actionCreators as likeActions } from "../redux/modules/like"; // 라이크 다시 가져옴 ㅠ
import { actionCreators as answerActions } from "../redux/modules/answer"
import { Text } from "../elements";
import { useHistory } from "react-router";

import { CgChevronDoubleUp } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import instance from "../shared/api";


const DetailCard = (props) => {
  const answer_id = props._id; //answer의 Id
  console.log(props);
  // console.log(answer_id);
  const dispatch = useDispatch();
  // const { history } = props;
  const history = useHistory();

  const like_list = useSelector((state) => state.answer.list);
  console.log(like_list);
  console.log(like_list[answer_id]);
  const user_info = useSelector((state) => state.user.user);
  console.log(user_info);
  const user = useSelector((state) => state.user);
  console.log(user.is_login);

  const count = useSelector((state) => state.like.likes);
  console.log(count); 

  const [likeState, setLikeState] = React.useState("");
  const [list, setList] = React.useState("");

  React.useEffect(() => {
    const likecnt = dispatch(likeActions.likeCountDB(answer_id));
    console.log(likecnt)
  }, []);

  const is_token = localStorage.getItem("token") ? true : false;
  console.log(user.is_token);
  console.log(is_token);




  // 그냥 끼워 맞추기식
  // const [cnt, setCnt] = useState(0)

  // up = () => {
  //   setCnt(cnt + 1)
  // }
  
  // down = () => {
  //   setCnt(cnt - 1)
  // }



  return (
    <React.Fragment>
      <Wrap>
        {/* 카드 생성구역 */}
        <Btn
          onClick={() => {
            dispatch(likeActions.likeCountDB(answer_id));
          }}
        >gd
        </Btn>
        <QuestionCard>
          <BtnGroup>
            {is_token && likeState ? (
              <Btn // 풀 하트
                style={{ display: "flex" }}
                onClick={() => {
                  setLikeState(false);
                  
                  const newPostLikeCnt = parseInt(list.postLikeCnt) - 1;
                  setList({ ...list, postLikeCnt: newPostLikeCnt });
                  dispatch(likeActions.deleteLikeDB(answer_id));
                }}
              >
                <AiFillHeart color={"red"} className="like" />
                <Text size="15px" margin="0px">
                  0
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
                <AiOutlineHeart className="dislike" />
                <Text size="15px" margin="0px">
                  {props.postLikeCnt}
                </Text>
              </Btn>
            )}

            {/* 테스트용 버튼 */}
            {/* <Btn onClick={test}
              style={
                toggle ? { color: "pink" } : { color: "grey"}
              }
            >
              <Text size="15px" margin="0px">
                {props.postLikeCnt}
              </Text>
              <AiOutlineHeart className="dislike" />
            </Btn> */}

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
