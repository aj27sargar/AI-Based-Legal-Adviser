import React from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css'; // Include your CSS file

const BlogDetail = () => {
  const location = useLocation();
  const { blog } = location.state || { blog: {} }; // Get the blog passed via location state

  if (!blog) {
    return <div>Blog not found</div>; // Fallback if no blog is found
  }

  return (
    <div className="blog-detail">
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="blog-image" />
      <p>{blog.fullContent}</p> {/* Use fullContent for detailed view */}
      <p><strong>Author:</strong> {blog.author}</p>
      <a href="/blogs">Go Back</a>
    </div>
  );
};

export default BlogDetail;
