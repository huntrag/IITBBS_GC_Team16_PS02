import React, { useContext, useEffect } from "react";
import { Grid, Image, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import AddPost from "../component/AddPost";
import axiosInstance from "../util/axiosInstance";

function Home() {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosInstance(
        `${process.env.REACT_APP_BACKEND_HOST}/login/user`
      );
      if (!response.data.error) authCtx.login({ token: response.data.token });
      else authCtx.logout();
    };
    getUser();
  }, [authCtx]);

  const posts = [
    {
      id: "1",
      body: "Dummy Post",
      createdAt: new Date(),
      upVote: [{ userName: "dsgsdg" }],
      downVote: [{ userName: "dsgsdg" }],
      userName: "fdsfds",
      comments: "fdsfds",
    },
  ];

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <AddPost />
          </Grid.Column>
        )}
        <Transition.Group>
          {" "}
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                <PostCard post={post} key={post.id} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}

export default Home;
