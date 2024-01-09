import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    blogTitle: '',
    blogContent: '', // Changed from ReactQuill to a regular text area
    coverImage: null,
    publishedDate: '',
    author: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, coverImage: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(formData));
      formDataToSend.append('files.coverImage', formData.coverImage);

      const response = await axios.post('http://localhost:1337/api/blogs', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data); // Log the response for debugging

      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 pt-10">
      <h1 className="text-4xl font-bold mb-8">Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-600">
            Blog Title
          </label>
          <input
            type="text"
            id="blogTitle"
            name="blogTitle"
            value={formData.blogTitle}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blogContent" className="block text-sm font-medium text-gray-600">
            Blog Content
          </label>
          <textarea
            id="blogContent"
            name="blogContent"
            value={formData.blogContent}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            rows="10" // Set the number of rows as needed
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-600">
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-600">
            Published Date
          </label>
          <input
            type="date"
            id="publishedDate"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-600">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
