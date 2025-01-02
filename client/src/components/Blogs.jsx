import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blogs.css'; // Ensure this includes your CSS for styles

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate(); // For navigation

  // Mock data simulating what you would get from MongoDB
  const mockBlogs = [
    {
      _id: '1',
      title: 'The Concept of Deputation of Employees',
      description: 'An overview of contract law and its applications.',
      image: 'https://i0.wp.com/lawbhoomi.com/wp-content/uploads/2023/07/LawBooks8.jpg?w=600&ssl=1', // Replace with your image URL
      content: 'Deputation of Employees is a common practice in various sectors, particularly in government services. It refers to the temporary assignment of an employee to a different role or department outside their usual position, often in a different organisation. This practice is widely used for filling vacancies, promoting skills transfer, and supporting organisational needs. In this article, we will explore what deputation means, its significance, and the process involved, especially in government services.',
      author: 'Sudhanshu Moh Doe',
      fullContent: 'Contract law is a fundamental aspect of legal practice. It involves the creation and enforcement of agreements between parties. Understanding the basic principles of contract law is essential for both individuals and businesses...'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/800', // Replace with your image URL
      content: 'Getting legal advice can save you time and money...',
      author: 'Jane Smith'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/800', // Replace with your image URL
      content: 'Getting legal advice can save you time and money...',
      author: 'Jane Smith'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/800', // Replace with your image URL
      content: 'Getting legal advice can save you time and money...',
      author: 'Jane Smith'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/800', // Replace with your image URL
      content: 'Getting legal advice can save you time and money...',
      author: 'Jane Smith'
    },
    {
      _id: '2',
      title: 'The Importance of Legal Advice',
      description: 'Why seeking legal advice is essential.',
      image: 'https://via.placeholder.com/800', // Replace with your image URL
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
