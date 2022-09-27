import React, { Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { feedbackActions } from "../../../store/feedback/feedback";

import Feedback from "../../../components/ui/components/feedback/Feedback";
import Backdrop from "../../../components/ui/components/backdrop/Backdrop";

function FeedbackProvider(props) {
  const dispatch = useDispatch();
  const { feedback } = useSelector((state) => state);

  const closeFeedbackHandler = () => {
    dispatch(feedbackActions.cleanMessage());
  };

  return (
    <Fragment>
      {feedback.message && (
        <Fragment>
          <Feedback
            feedbackMessage={feedback.message}
            onClick={closeFeedbackHandler}
          />
          <Backdrop onClick={closeFeedbackHandler} />
        </Fragment>
      )}
      {props.children}
    </Fragment>
  );
}

export default FeedbackProvider;
