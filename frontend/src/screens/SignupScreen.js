import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
// import getError from "../utils";

const SignupScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  // console.log(search);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  // console.log(redirectInUrl);
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const imageUpload = async (image) => {
    // console.log(image);
    try {
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const { data: { data: {url} } } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/upload`, formDataImage);
        // console.log(`imageUrl: ${Url}`);
        setLocation(url);
        return url;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };


  const saveUserToDB = async (imageUrlFromUpload) => {
    try {
      const { data: {data} } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users/signup`, {
        name: name,
        email: email,
        password: password,
        image: imageUrlFromUpload,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      return data;
    } catch (error) {
      console.error("Error occurred while saving user data to the database:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };
  
  const submitHandler = async (e) => {
    // console.log("submitHandler");
    
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    try {
        // console.log("image upload");
      // Upload the image and wait for the response
      const  imageUrlFromUpload  = await imageUpload(image);
 
  
      // Once the image is uploaded, save user data to the database
      await saveUserToDB(imageUrlFromUpload);

  
      // Navigate to the desired location after successful signup
      navigate(redirect || "/");
      toast.success('sign up successfull')
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("User already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  
  

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <br/>
      <h1 className="my-3">Sign Up</h1>

      <Form onSubmit={submitHandler}>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name<span className="required-asterisk">*</span></Form.Label>
          <Form.Control required onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageUpload">
          <Form.Label>Upload Profile Photo (.jpg, .jpeg only)<span className="required-asterisk">*</span></Form.Label>
          <Form.Control
            type="file"
            capture="user"
            accept=".jpg, .jpeg"
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>


        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div>
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </div>
      </Form>

      
      <br/><br/>
    </Container>
    
  );
};

export default SignupScreen;
