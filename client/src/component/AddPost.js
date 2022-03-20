import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axiosInstance from '../util/axiosInstance'

function AddPost() {
  const [content,setContent]=useState('');
  const changeValuesHandler=(e)=>{
   setContent(e.target.value);
  }
  const submitPostHandler=async()=>{
    if(content.trim().length>0)
     await axiosInstance.post(`${process.env.REACT_APP_BACKEND_HOST}/post`,{content});
    setContent(''); 
  }

  return (
    <>
      <Form onSubmit={submitPostHandler}>
        <h2>Create a Post</h2>
        <Form.Field>
          <Form.Input
            placeholder="Hi Guys"
            name="body"
            value={content}
            // error={error ?error.graphQLErrors[0].message: false}
            onChange={changeValuesHandler}
          />
          <Button type="submit" color="teal" disabled={content.trim().length === 0}>
            Add Post
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}

export default AddPost;
