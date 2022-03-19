import React, { useRef } from "react";
import { Button, Card, Form } from "semantic-ui-react";

function AddPost({ postId }) {
  const commentInputRef = useRef();
 const submitHandler=()=>{
   console.log("Add Comment")
 }

  return (
    <Card style={{ width: "140%" }}>
      <Card.Content>
        <form onSubmit={submitHandler}>
          <h2>Add Comment</h2>
          <div className="ui action input fluid">
            <input
              placeholder="Comment..."
              name="body"
              // value={values.body}
              // error={error ? error.graphQLErrors[0].message : false}
              // onChange={changeValuesHandler}
              // ref={commentInputRef}
            />
            <button
              type="submit"
              className="ui button teal"
              // disabled={values.body.trim().length === 0}
            >
              Add Comment
            </button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}

export default AddPost;
