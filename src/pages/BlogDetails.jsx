// BlogDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/blogs/${id}`);
        setBlog(response.data.data);
      } catch (error) {
        setError(error);
      }
    };

    const fetchRecommendedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/blogs');

        const filteredBlogs = response.data.data.filter(blog => blog.id !== id);
        setRecommendedBlogs(filteredBlogs);
      } catch (error) {
        setError(error);
      }
    };

    fetchBlogDetails();
    fetchRecommendedBlogs();
  }, [id]);

  if (error) {
    return <div className="max-w-2xl mx-auto mt-10">Error fetching data: {error.message}</div>;
  }

  if (!blog || recommendedBlogs.length === 0) {
    return <div className="max-w-2xl mx-auto mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 flex">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6">{blog.attributes.blogTitle}</h1>
        <p className="text-gray-600 mb-4">{blog.attributes.publishedDate} by {blog.attributes.author}</p>

       
<p className="text-gray-800 mb-4">{blog.attributes.blogContent}</p>


        <Link to="/blog" className="text-blue-500 hover:underline block mt-8">
          Back to Blog List
        </Link>
      </div>
      <div className="flex-1 ml-8">
        <h2 className="text-2xl font-bold mb-4">Other Blogs</h2>
        <div className="bg-gray-200 p-4 rounded">
          {recommendedBlogs.map(recommendedBlog => (
            <Link
              key={recommendedBlog.id}
              to={`/blog/${recommendedBlog.id}`}
              className="text-blue-500 hover:underline block mb-2"
            >
              {recommendedBlog.attributes.blogTitle}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
