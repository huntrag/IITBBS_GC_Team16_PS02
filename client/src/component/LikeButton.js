import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LikeButton({ likeCount, postId, likes, userName }) {
  const [liked, setLiked] = useState(false);

  const likePostHandler=()=>{
    setLiked(!liked)
  }

  const likedButton = userName ? (
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
