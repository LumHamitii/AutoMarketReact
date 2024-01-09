// Blog.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/blogs');
        setBlogs(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchBlogs();
  }, []);

  if (error) {
    return <div>Error fetching blog data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-2xl mx-auto mt-20 pt-30">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Blog Page</h1>
            <Link to="/create-blog" className="text-blue-500 hover:underline">
              Create Blog
            </Link>
          </div>
          <div>
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-2">{blog.attributes.blogTitle}</h2>
                <p className="text-gray-600 mb-4">
                  {blog.attributes.publishedDate} by {blog.attributes.author}
                </p>
                {blog.attributes.blogContent && (
  <p className="text-gray-800 mb-4">
    {blog.attributes.blogContent.substring(0, 150)}...
  </p>
)}

                {blog.attributes.coverImage && (
                  <img
                    src={`http://localhost:1337${blog.attributes.coverImage[0].url}`}
                    alt="Blog Cover"
                    className="w-full h-auto mb-4"
                  />
                )}
                <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
