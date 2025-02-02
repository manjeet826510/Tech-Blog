import React, { useContext, useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { toast } from "react-toastify";

const NewPost = () => {
    const {state} = useContext(Store);
    const {  userInfo } = state;

    const jwtToken = userInfo ? userInfo.jwtToken : null;

    // console.log(jwtToken);
    
    

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);

  

  const saveBlogToDB = async (imageUrlFromUpload) => {
    console.log(imageUrlFromUpload);
    
    try {

        const response = await axios.post("http://localhost:8080/api/blogs", {
            title,
            content,
            thumbnail: imageUrlFromUpload
          },
          { headers: { Authorization: `Bearer ${jwtToken}` } });
    
          if (response.status === 201) {
            setSuccess(true);
            setTitle("");
            setContent("");
          }

      
    } catch (error) {
        setError("An error occurred while creating the post");
      }
      setLoading(false);
  };

  const imageUpload = async (image) => {
    // console.log(image);
    try {
      if (image) {
        const formDataImage = new FormData();
        formDataImage.append("image", image);
  
        const { data: { data: {url} } } = await axios.post("http://localhost:8080/api/upload", formDataImage);
        // console.log(`imageUrl: ${Url}`);
        return url;
      }
    } catch (error) {
      console.error("Error occurred during image upload:", error);
      throw error; // Rethrow the error to be caught in the outer try-catch block
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
  
    try {
      // Upload the image and wait for the response
      const  imageUrlFromUpload  = await imageUpload(image);
 
  
      // Once the image is uploaded, save user data to the database
      await saveBlogToDB(imageUrlFromUpload);

  
      // Navigate to the desired location after successful signup
      toast.success('Post created successfully')
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Blog already exists.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  

  return (
    <>
      <Helmet>
        <title>Create New Post - Tech Blog</title>
      </Helmet>
      <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h1 className="text-center text-4xl font-bold mb-4">Create New Post</h1>

        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {success && (
          <MessageBox variant="success">Post created successfully!</MessageBox>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Post Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="content" className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Write your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageUpload">
                    <Form.Label>Upload Blog Thumbnail (.jpg, .jpeg only)<span className="required-asterisk">*</span></Form.Label>
                    <Form.Control
                      type="file"
                      capture="user"
                      accept=".jpg, .jpeg"
                      required
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Form.Group>

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit Post"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default NewPost;
