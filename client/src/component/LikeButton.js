import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";

function LikeButton({ likeCount, postId, upvotes, userId, replyId, onSubmit }) {
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (upvotes && upvotes.findIndex((upId) => upId === userId) !== -1)
      setLiked(true);
    else if (upvotes && upvotes.findIndex((upId) => upId === userId) === -1)
      setLiked(false);
  }, [upvotes, userId]);

  const likePostHandler = async () => {
    setLiked(!liked);
    const body = !replyId
      ? {
          upvote: true,
          postId,
          userId,
        }
      : {
          upvote: true,
          replyId,
          userId,
        };
    const API_URL = replyId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/vote`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/vote`;
    await axiosInstance.patch(API_URL, body);
    onSubmit();
  };

  const likedButton = userId ? (
    liked ? (
      <Button color="grey">
        <Icon name="arrow alternate circle up" />
      </Button>
    ) : (
      <Button color="black" basic>
        <Icon name="arrow alternate circle up" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="grey" basic>
      <Icon name="arrow alternate circle up" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePostHandler}>
      <Popup
        content="upvote this post"
        inverted
        position="left center"
        trigger={likedButton}
      />
      <Label basic color="grey" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
