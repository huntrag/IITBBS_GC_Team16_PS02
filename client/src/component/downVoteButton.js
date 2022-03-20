import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";

function DownvoteButton({likeCount, postId, downvotes, userId, replyId }) {
  const [downVote, setdownVote] = useState(false);
  useEffect(() => {
    if (downvotes && downvotes.findIndex((upId) => upId === userId) !== -1)
      setdownVote(true);
    else if (downvotes && downvotes.findIndex((upId) => upId === userId) === -1)
      setdownVote(false);
  }, [downvotes, userId]);
  const devotePostHandler=async()=>{
    setdownVote(!downVote);
    const body = !replyId
      ? {
          upvote: false,
          postId,
          userId,
        }
      : {
          upvote: false,
          replyId,
          userId,
        };
    const API_URL = replyId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/vote`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/vote`;
    await axiosInstance.patch(API_URL, body);
}

  const devoteButton = userId ? (
    downVote ? (
      <Button color="red">
        <Icon name="arrow alternate circle down" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="arrow alternate circle down" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="arrow alternate circle down" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={devotePostHandler}>
      <Popup
        content="downvote this post"
        inverted
        position="left center"
        trigger={devoteButton}
      />
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default DownvoteButton;
