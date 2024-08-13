import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdThumbUp, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const response = await axios.get('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post');
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    await axios.delete(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`);
    fetchBlogs(); 
  };

  const likeBlog = async (id, likes) => {
    await axios.put(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`, {
      likes: likes + 1
    });
    fetchBlogs(); 
  };

  const editBlog = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%' }} />}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <span>{blog.likes} Likes</span>
            <div>
              <MdThumbUp style={{ cursor: 'pointer' }} onClick={() => likeBlog(blog.id, blog.likes)} />
              <MdEdit style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => editBlog(blog.id)} />
              <MdDelete style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => deleteBlog(blog.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
