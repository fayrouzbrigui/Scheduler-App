import React, { useState } from 'react'
import './signup.css'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : ''
  })

  const handleInputChange = (event) =>{
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST", 
        headers : {"Content-Type" : "application/json"}, 
        body : JSON.stringify(formData)
      })
      const result = await response.json();
      console.log(result);
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    } finally{
      setFormData({
        name : "",
        email : "",
        password : ""
      })
    }
  }
  return (
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="name" placeholder="Enter username" value={formData.name} onChange={handleInputChange}/>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange}/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
        </div>

        <button type="submit">Signup</button>
        </form>
      </div>
  )
}

export default Signup