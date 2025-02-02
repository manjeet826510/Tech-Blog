import React, { useState } from "react";
import { Link } from "react-router-dom";

const Articles = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => {
        // Ensure we access article.content correctly
        const fullContent = article.content ? article.content : "";
        const previewText = fullContent.substring(0, 110);

        return (
          <div key={index} className="p-4">
            <div className="card shadow-sm">
              <div className="row g-0">
                {/* Thumbnail Image */}
                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to={`/blog/${article.slug}`} className="w-100">
                    <img
                      className="img-fluid rounded-start w-100"
                      src={article.thumbnail}
                      alt={article.title}
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px",
                      }}
                    />
                  </Link>
                </div>

                {/* Article Content */}
                <div className="col-md-8">
                  <div className="card-body">
                    {/* Author Info */}
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={article.authorImage}
                        alt={article.author}
                        className="rounded-circle me-2"
                        style={{ width: "40px", height: "40px" }}
                      />
                      <div>
                        <h6 className="mb-0">{article.author}</h6>
                        <small className="text-muted">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </small>
                      </div>
                    </div>

                    {/* Article Title */}
                    <Link to={`/blog/${article.slug}`} className="text-dark">
                      <h5 className="card-title">{article.title}</h5>
                    </Link>

                    {/* Short Description with Read More (WhatsApp-style) */}
                    <p className="card-text">
                      {previewText}{"... "}
                      <Link
                        to={`/blog/${article.slug}`}
                        style={{ color: "green", textDecoration: "none", fontWeight: "bold" }}
                      >
                        Read more
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Articles;
