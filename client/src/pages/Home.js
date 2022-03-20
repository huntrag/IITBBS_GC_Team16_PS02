import React, { useContext, useEffect, useState } from "react";
import { Grid, Image, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import AddPost from "../component/AddPost";
import axiosInstance from "../util/axiosInstance";

function Home() {
  const authCtx = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const { user } = authCtx;

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/login/user`
      );
      if (!response.data.error) authCtx.login({ token: response.data.token });
      else if (authCtx.user) authCtx.logout();
    };
    getUser();
  }, [authCtx]);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/post`
      );
      setPosts(response.data);
      // if (!response.data.error) authCtx.login({ token: response.data.token });
      // else authCtx.logout();
    };
    getAllPosts();
  });

  const deletePostHandler = (postId) => {
    const filterPost = posts.filter(
      (post) => post._id.toString() !== postId.toString()
    );
    setPosts(filterPost);
  };
  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
        {!user && (
          <div className="ui yellow mini message">
            You have to login for accessing posts
          </div>
        )}
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <AddPost />
          </Grid.Column>
        )}
        {posts && posts.length === 0 ? (
          <p>No post to show</p>
        ) : (
          <Transition.Group>
            {" "}
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post._id} style={{ marginBottom: "20px" }}>
                  <PostCard
                    post={post}
                    key={post._id}
                    deletePostHandler={deletePostHandler}
                  />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
