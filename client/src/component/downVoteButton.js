import React, { useEffect, useState } from "react";
import { Button, Icon, Label, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";

function DownvoteButton({ likeCount, postId, likes, userName }) {
  const [downVote, setdownVote] = useState(false);

  const devotePostHandler=()=>{
    setdownVote(!downVote);
  }

  const devoteButton = userName ? (
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
