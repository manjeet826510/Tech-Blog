import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import getError from "../utils";

const SigninScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  // console.log(search);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  // console.log(redirectInUrl);
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  // console.log(state);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data: {data} } = await axios.post("http://localhost:8080/api/users/signin", {
        email: email,
        password: password,
      });
      // console.log(data);
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      // console.log(state);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      // console.log(data);
    } catch (err) {
      console.log(err);
      
      if(err.response.status==500){
        toast.error('Internal server error or no Internet')
        return;
      }
      console.log(err);
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container" >
      {/* <Helmet>
        <title>Sign In</title>
      </Helmet> */}
      <br/>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div>
          New User?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
        {/* <div>
          Forget Password?{" "}
          <Link to={`/forgot-password`}>Reset your password</Link>
        </div> */}
      </Form>
      <br/>
    </Container>
  );
};

export default SigninScreen;
