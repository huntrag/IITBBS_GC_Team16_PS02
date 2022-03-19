import React, { useState } from "react";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function DeleteButton({ postId, commentId }) {
  const [confirmOpen, setComfirmOpen] = useState(false);
  const navigate = useNavigate();
  const deletePostHandler=()=>{
    console.log("delete Post");
  }
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
