import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import axiosInstance from "../util/axiosInstance";

function BlackButton({ blacklist,postId,onSubmit }) {
  const { user } = useContext(AuthContext);
  const toggleBlackListHandler=async()=>{
      const body={
          postId,
          blacklist
      }
      await axiosInstance.patch(`${process.env.REACT_APP_BACKEND_HOST}/post/blacklist`,body);
      onSubmit();
  }
  return (
    user &&
    user.isAdmin && (
      <Button onClick={toggleBlackListHandler}>
        {blacklist ? "Remove from BlackList" : "Add to BlackList"}
      </Button>
    )
  );
}

export default BlackButton;
