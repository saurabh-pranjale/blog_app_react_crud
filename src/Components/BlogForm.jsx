import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post', {
      title,
      content,
      image,
      likes: 0
    });

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text' 
        placeholder='Title' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder='Content' 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <input 
        type='text' 
        placeholder='Image URL' 
        value={image} 
        onChange={(e) => setImage(e.target.value)} 
      />
      <button type='submit'>Create Blog</button>
    </form>
  );
};

export default BlogForm;
