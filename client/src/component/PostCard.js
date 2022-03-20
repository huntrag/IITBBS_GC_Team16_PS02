import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import DownvoteButton from "./downVoteButton";
import BlackButton from "./BlackButton";

function PostCard({ post, deletePostHandler }) {
  const {
    content: body,
    createdAt,
    upvotes,
    downvotes,
    _id: id,
    username: userName,
    replies,
    userid,
    blacklist,
  } = post;
  const upvotesCount = upvotes.length;
  const downvotesCount = downvotes.length;
  const commentCount = replies.length;
  const { image: userImage, mailId: userEmailId } = userid;
  const { user } = useContext(AuthContext);
  const blacklistPopup = (
    <div>
      <p>{userName}</p>
      {user && user.isAdmin && (
        <BlackButton userId={userid._id} blacklist={userid.blackList} />
      )}
    </div>
  );

  return (
    <Card fluid>
      <Card.Content>
        <Popup
          wide
          trigger={
            <Image floated="right" size="massive" src={userImage} avatar />
          }
          on="click"
        >
          {blacklistPopup}
        </Popup>
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post._id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        {blacklist && <strong>BlackListed</strong>}
      </Card.Content>
      <Card.Content extra>
        <LikeButton
          postId={id}
          upvotes={upvotes}
          userId={user ? user.id : ""}
          likeCount={upvotesCount}
        />
        <DownvoteButton
          postId={id}
          downvotes={downvotes}
          userId={user ? user.id : ""}
          likeCount={downvotesCount}
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
        {user && user.name === userName && (
          <DeleteButton postId={id} onDelete={deletePostHandler} />
        )}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
