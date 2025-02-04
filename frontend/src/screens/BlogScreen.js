import React, { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Articles from "../components/Articles";
import MessageBox from "../components/MessageBox";
import axios from "axios";

const BlogScreen = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("createdAt"); // Default sort by created date
  const [order, setOrder] = useState("desc"); // Default order descending
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If any filter (searchTerm, sortOption, or order) is applied, reset the page to 1
    if (searchTerm || sortOption !== 'createdAt' || order !== 'desc') {
      setCurrentPage(1);  // Reset to page 1
    }
    fetchBlogs();
  }, [searchTerm, sortOption, order]); // Re-run when filters change
  
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/blogs`, {
        params: {
          page: currentPage - 1, // Backend uses 0-based indexing
          query: searchTerm || null,
          sort: sortOption,
          order: order,
        },
      });
  
      setArticles(response.data.data.content);
      setTotalPages(response.data.data.totalPages);
      setError(null);
    } catch (error) {
      console.error("Error fetching articles:", error.message);
      setError(error.message);
    }
    setLoading(false);
  };
  

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container-fluid" style={{ padding: "1.5rem" }} >
      <h1 className="text-center mb-4">Tech Blogs</h1>
      <Card className="p-3">
        <div className="row">
          {/* Left Section: Articles */}
          <div className="col-md-9">
            {error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : loading ? (
              <div className="d-flex justify-content-center mt-5">
                <span>Loading...</span>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center mt-5">No blogs found</div>
            ) : (
              <Articles articles={articles} />
            )}
          </div>

          {/* Right Section: Filters */}
          <div className="col-md-3">
            <h5>Filter Blogs</h5>

            <Form.Group className="mb-3">
              <Form.Label>Search Blog</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sort By</Form.Label>
              <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="createdAt">Recently Created</option>
                <option value="title">Title</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Order</Form.Label>
              <Form.Select value={order} onChange={(e) => setOrder(e.target.value)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </Form.Select>
            </Form.Group>

            {/* <Button variant="warning" className="w-100" onClick={fetchBlogs}>
              Reset Filters
            </Button> */}
          </div>
        </div>

        {/* Pagination Controls */}

        {articles.length !== 0 &&
          <div className="d-flex justify-content-center mt-4">
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            variant="secondary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>}

      </Card>
    </div>
  );
};

export default BlogScreen;
