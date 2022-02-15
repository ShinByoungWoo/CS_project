import React from "react";
import InterviewCard from "../components/InterviewCard";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as questionActions } from "../redux/modules/question";

const InterviewList = (props) => {
  const dispatch = useDispatch();
  
  const { history } = props;

  React.useEffect(() => {
    dispatch(questionActions.loadQuestionDB());
  }, []);
  const questionList = useSelector((state) => state.question.list);
  console.log(questionList)
  
  return (
    <React.Fragment>
      {questionList.map((v,i) => {
        return(
          <InterviewCard key={i} {...v}/>
        )
        })};
    </React.Fragment>
  );
};

export default InterviewList;
