import React from "react";
import { Button, Form } from "semantic-ui-react";

function AddPost() {
  const submitPostHandler=()=>{
    console.log("submit post");
  }

  return (
    <>
      <Form onSubmit={submitPostHandler}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi Guys"
            name="body"
            // value={values.body}
            // error={error ?error.graphQLErrors[0].message: false}
            // onChange={changeValuesHandler}
          />
          <Button type="submit" color="teal">
            Add Post
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default AddPost;
