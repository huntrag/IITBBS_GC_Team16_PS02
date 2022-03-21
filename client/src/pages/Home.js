import React, { useContext, useEffect, useState } from "react";
import { Grid, Image, Transition } from "semantic-ui-react";
import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";
import AddPost from "../component/AddPost";
import axiosInstance from "../util/axiosInstance";
import { useSearchParams } from "react-router-dom";
import SortButton from "../component/SortButton";

function Home() {
  const authCtx = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchkey = searchParams.get("searchkey");
  const sort = searchParams.get("sort");
  // console.log("search from home",searchParams.get("searchkey"));
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
    const getAllBySortPosts = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/post`,
        { params: { sort } }
      );
      setPosts(response.data);
    };
    if (sort) getAllBySortPosts();
  }, [sort]);

  useEffect(() => {
    const getSearchPost = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/search`,
        { params: { searchkey } }
      );
      setPosts(response.data);
    };
    if (searchkey) getSearchPost();
    const getAllPosts = async () => {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BACKEND_HOST}/post`
      );
      setPosts(response.data);
    };
    if (!searchkey&&!sort) getAllPosts();
  }, [searchkey,sort]);

  const deletePostHandler = (postId) => {
    const filterPost = posts.filter(
      (post) => post._id.toString() !== postId.toString()
    );
    setPosts(filterPost);
  };
  return (
    <Grid columns={2}>
      <Grid.Row className="page-title">
        {searchkey ? (
          <h1>
            Posts which contains{" "}
            <strong style={{ color: "#00b5ad" }}>{searchkey}</strong>
          </h1>
        ) : (
          <h1>Recent Posts</h1>
        )}
        {!user && (
          <div className="ui yellow mini message">
            You have to login for accessing posts
          </div>
        )}
      </Grid.Row>
        <SortButton/>
      <Grid.Row>
        {user && !searchkey && (
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
