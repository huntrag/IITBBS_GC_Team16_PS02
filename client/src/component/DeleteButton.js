import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../util/axiosInstance";

function DeleteButton({ postId, commentId, onDelete ,onSubmit }) {
  const [confirmOpen, setComfirmOpen] = useState(false);
  const navigate = useNavigate();
  const deletePostHandler = async () => {
    const API_URL = commentId
      ? `${process.env.REACT_APP_BACKEND_HOST}/reply/${commentId}/delete/${postId}`
      : `${process.env.REACT_APP_BACKEND_HOST}/post/${postId}`;
    setComfirmOpen(false);
    if (!commentId) onDelete(postId);
    else onSubmit();
    await axiosInstance.delete(API_URL);
  };
  return (
    <>
      <Popup
        content={`Delete this ${commentId ? "comment" : "post"}`}
        inverted
        position="right center"
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setComfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setComfirmOpen(false)}
        onConfirm={deletePostHandler}
      />
    </>
    //   )}
  );
}

export default DeleteButton;
