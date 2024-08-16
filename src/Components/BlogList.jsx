import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete, MdThumbUp, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    const response = await axios.get('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post');
    setBlogs(response.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (id, likes) => {
    await axios.put(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`, { likes: likes + 1 });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`);
    fetchBlogs();
  };

  const handleComment = async (blogId) => {
    if (!comment) return;
    const blog = blogs.find(b => b.id === blogId);
    const updatedComments = [...(blog.comments || []), { text: comment }];

    await axios.put(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${blogId}`, { comments: updatedComments });
    setComment('');
    fetchBlogs();
  };

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          {blog.image && <img src={blog.image} alt={blog.title} style={{ maxWidth: '100%' }} />}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <span>{blog.likes} Likes</span>
            <div>
              <MdThumbUp onClick={() => handleLike(blog.id, blog.likes)} style={{ cursor: 'pointer' }} />
              <MdEdit onClick={() => navigate(`/edit/${blog.id}`)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
              <MdDelete onClick={() => handleDelete(blog.id)} style={{ cursor: 'pointer', marginLeft: '10px' }} />
            </div>
          </div>
          <div style={{ marginTop: '20px',backgroundColor:'pink',height:'200px' }}>
            <h4>Comments</h4>
            <div style={{overflow:'auto',margin:'auto',backgroundColor:'white',height:'100px',width:'400px',overflowY:'auto'}}>
           {blog.comments ? 
           
           blog.comments.map((c, index) => (
              
            <p key={index}>{c.text}</p>
            
          ))
          :

          <h1>Add your comments</h1>
          
          }
            </div>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button onClick={() => handleComment(blog.id)}>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
