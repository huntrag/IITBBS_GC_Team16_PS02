import moment from "moment";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import DownvoteButton from "./downVoteButton";
import LikeButton from "./LikeButton";

function CommentDetails({ comments, postId }) {
  const { user } = useContext(AuthContext);
  if (!comments) return <p>Loading...</p>;
  return (
    comments &&
    comments.map((comment) => (
      <Card fluid key={comment._id}>
        <Card.Content>
          {user && user.name === comment.username && (
            <DeleteButton postId={postId} commentId={comment._id} />
          )}
          <Card.Header>{comment.username}</Card.Header>
          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          <Card.Description className="content-post">
            {comment.content}
          </Card.Description>
          <LikeButton
            postId={postId}
            likes={comment.upvotes}
            userName={user ? user.name : ""}
            likeCount={comment.upvotes.length}
          />
          <DownvoteButton
            postId={postId}
            likes={comment.downvotes}
            userName={user ? user.name : ""}
            likeCount={comment.downvotes.length}
          />
        </Card.Content>
      </Card>
    ))
  );
}

export default CommentDetails;
