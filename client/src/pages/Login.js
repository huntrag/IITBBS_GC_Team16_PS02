import React, { useContext, useReducer, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

function Login() {
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div>
     Login
    </div>
  );
}

export default Login;
