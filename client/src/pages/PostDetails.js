import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Button,
  Label,
  Card,
  Grid,
  Icon,
  Image,
  Popup,
} from "semantic-ui-react";
import { useNavigate } from "react-router";
import moment from "moment";
import LikeButton from "../component/LikeButton";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import DeleteButton from "../component/DeleteButton";
import CommentDetails from "../component/CommentDetails";
import AddComment from "../component/AddComment";
import DownvoteButton from "../component/downVoteButton";
import axiosInstance from "../util/axiosInstance";
import BlackButton from "../component/BlackButton";

function PostDetails() {
  const navigate = useNavigate();
  const { postId } = useParams();

  const { user } = useContext(AuthContext);

  const [post, setPost] = useState({});
  const [submit, setSubmit] = useState(0);
  const [replies, setReplies] = useState([]);

  // const { body, comments, likes, createdAt, userName } = {};
  useEffect(() => {
    const getOnePost = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/post/currentPost/${postId}`
      );
      const { post, replies } = response.data;
      setPost(post);
      setReplies(replies);
    };
    getOnePost();
  }, [submit, postId]);
  if (Object.keys(post).length === 0) return <p>Loading...</p>;
  const {
    content: body,
    createdAt,
    upvotes,
    downvotes,
    _id: id,
    username: userName,
    blacklist,
    userid,
  } = post;

  const { image: userImage, mailId: userEmailId } = userid || {
    image: "",
    mailId: "",
  };

  const upVotesCount = upvotes.length;
  const downVotesCount = downvotes.length;
  const commentCount = replies.length;

  const commentHandler = () => {
    console.log("comments");
  };

  const deletePostHandler = () => {
    navigate("/", { replace: true });
    console.log("Post deleted");
  };

  const submitCommentHandler = () => {
    setSubmit(submit + 1);
  };

  const postMarkup = (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Popup
            content={userEmailId === user.email && user.email}
            key={userName}
            header={userName}
            trigger={<Image src={userImage} size="small" floated="right" />}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Meta as={Link} to={`/posts/${postId}`}>
                {moment(createdAt).fromNow()}
              </Card.Meta>
              <Card.Description>{body}</Card.Description>
              {blacklist && <strong>BlackListed</strong>}
            </Card.Content>

            <hr />
            <Card.Content extra>
              <LikeButton
                postId={id}
                upvotes={upvotes}
                userId={user ? user.id : ""}
                likeCount={upVotesCount}
                onSubmit={submitCommentHandler}
              />
              <DownvoteButton
                postId={id}
                downvotes={downvotes}
                userId={user ? user.id : ""}
                onSubmit={submitCommentHandler}
                likeCount={downVotesCount}
              />
              <Button as="div" labelPosition="right" onClick={commentHandler}>
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.isAdmin && (
                <BlackButton
                  blacklist={blacklist}
                  postId={postId}
                  onSubmit={submitCommentHandler}
                />
              )}
              {user && user.name === userName && (
                <DeleteButton postId={postId} onDelete={deletePostHandler} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <AddComment onSubmit={submitCommentHandler} postId={postId} />
          )}
          <CommentDetails
            comments={replies}
            postId={postId}
            onSubmit={submitCommentHandler}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
  return postMarkup;
}

export default PostDetails;
