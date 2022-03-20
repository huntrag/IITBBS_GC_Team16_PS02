import moment from "moment";
import React, { useContext } from "react";
import { Card } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import DownvoteButton from "./downVoteButton";
import LikeButton from "./LikeButton";

function CommentDetails({ comments, postId, onSubmit }) {
  const { user } = useContext(AuthContext);
  if (!comments) return <p>Loading...</p>;
  return (
    comments &&
    comments.map((comment) => (
      <Card fluid key={comment._id}>
        <Card.Content>
          {user && user.name === comment.username && (
            <DeleteButton
              postId={postId}
              commentId={comment._id}
              onSubmit={onSubmit}
            />
          )}
          <Card.Header>{comment.username}</Card.Header>
          <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
          <Card.Description className="content-post">
            {comment.content}
          </Card.Description>
          <LikeButton
            replyId={comment._id}
            upvotes={comment.upvotes}
            userId={user ? user.id : ""}
            likeCount={comment.upvotes.length}
            onSubmit={onSubmit}
          />
          <DownvoteButton
            replyId={comment._id}
            onSubmit={onSubmit}
            downvotes={comment.downvotes}
            userId={user ? user.id : ""}
            likeCount={comment.downvotes.length}
          />
        </Card.Content>
      </Card>
    ))
  );
}

export default CommentDetails;
