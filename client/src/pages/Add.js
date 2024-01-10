import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [book, setBook] = useState({
    title:"",
    desc:"",
    cover:"",
    price:null
  });

  const navigate = useNavigate();

  const handlechange = (e) => {
    setBook((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/books', book);
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type='text' placeholder='Title' onChange={handlechange} name='title' />
      <input type='text' placeholder='Description' onChange={handlechange} name='desc' />
      <input type='text' placeholder='CoverImage Url' onChange={handlechange} name='cover' />
      <input type='number' placeholder='Price' onChange={handlechange} name='price' />
      <button className='formBtn add' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add