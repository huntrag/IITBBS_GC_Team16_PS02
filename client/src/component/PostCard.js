import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import DownvoteButton from "./downVoteButton";

function PostCard({ post ,deletePostHandler}) {
  const {
    content: body,
    createdAt,
    upvotes,
    downvotes,
    _id: id,
    username: userName,
    repiles,
    userid,
  } = post;
  const upvotesCount = upvotes.length;
  const commentCount = repiles.length;
  const { image: userImage, mailId: userEmailId } = userid;
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Popup
          content={user && userEmailId === user.name && user.email}
          key={userid._id}
          header={userName}
          position="top center"
          trigger={
            <Image floated="right" size="massive" src={userImage} avatar />
          }
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post._id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          postId={id}
          likes={upvotes}
          userName={user ? user.name : ""}
          likeCount={upvotesCount}
        />
        <DownvoteButton
          postId={id}
          likes={downvotes}
          userName={user ? user.name : ""}
          likeCount={upvotesCount}
        />
        <Popup
          content="Click here to add comment on this post"
          inverted
          position="right center"
          trigger={
            <Button
              as="div"
              labelPosition="right"
              as={Link}
              to={`/posts/${id}`}
            >
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.name === userName && <DeleteButton postId={id} onDelete={deletePostHandler}/>}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
