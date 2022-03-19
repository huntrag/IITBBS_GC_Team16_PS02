import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LikeButton({ likeCount, postId, likes, userName }) {
  const [liked, setLiked] = useState(false);

  const likePostHandler=()=>{
    console.log("Like");
  }

  const likedButton = userName ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );
  return (
    <Button as="div" labelPosition="right" onClick={likePostHandler}>
      <Popup
        content={`${liked ? "Dislike" : "Like"}  this post`}
        inverted
        position="left center"
        trigger={likedButton}
      />
      <Label basic color="red" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

export default LikeButton;
