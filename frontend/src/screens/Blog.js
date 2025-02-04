import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import axios from "axios";

const Article = () => {
  const { slug } = useParams();  // Fetch the slug from the URL params
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/blogs/${slug}`);
        setArticle(response.data.data);
      } catch (err) {
        setError("Article not found");
      }
      setLoading(false);
    };

    fetchArticle();
  }, [slug]); // Re-run when the slug changes

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error || !article) {
    return <MessageBox variant="warning">Article not found</MessageBox>;
  }

  return (
    <Container
  style={{
    marginTop: "1rem",
    marginBottom: "1rem",
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent white
    backdropFilter: "blur(10px)", // Apply the blur effect
    borderRadius: "8px", // Optional: Add rounded corners
    padding: "2rem", // Optional: Adjust padding as per need
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Add some shadow for depth
  }}
>
  <Helmet>
    <title>{article.title}</title>
  </Helmet>
  <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
    {article.title}
  </h1>
  <p
  className="mx-auto leading-relaxed text-base mb-4"
  dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br>") }}
/>

  <p style={{ color: "gray" }}>
    <i>This article is contributed by {article.author}</i>
  </p>
</Container>

  );
};

export default Article;
