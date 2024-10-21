import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this includes your CSS for styles

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Mock data simulating what you would get from MongoDB
  const mockBlogs = [
    {
      _id: '1',
      title: 'Contract Law',
      description: 'An overview of contract law and its applications.',
      image: 'https://via.placeholder.com/400', // Replace with your image URL
      content: 'Contract law is a fundamental aspect of legal practice. It involves the creation and enforcement of agreements between parties...',
      author: 'John Doe',
      fullContent: 'Contract law is a fundamental aspect of legal practice. It involves the creation and enforcement of agreements between parties. Understanding the basic principles of contract law is essential for both individuals and businesses...'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/300', // Replace with your image URL
      content: 'Getting legal advice can save you time and money...',
      author: 'Jane Smith'
    },
    // Add more mock blogs as needed
  ];

  useEffect(() => {
    // Simulating fetching from MongoDB
    const fetchBlogs = () => {
      setBlogs(mockBlogs);
    };
    fetchBlogs();
  }, []);

  // Navigate to blog detail page
  const handleReadMore = (blog) => {
    navigate('/blog-detail', { state: { blog } }); // Pass blog data as state
  };

  return (
    <div className="blog-container">
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-card">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-description">{blog.description}</p>
          <button className="blog-button" onClick={() => handleReadMore(blog)}>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
