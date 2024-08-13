import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`);
      setTitle(response.data.title);
      setContent(response.data.content);
      setImage(response.data.image);
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`https://66b2f68a7fba54a5b7eaee35.mockapi.io/yes/post/${id}`, {
      title,
      content,
      image
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
      <button type='submit'>Update Blog</button>
    </form>
  );
};

export default EditBlog;
