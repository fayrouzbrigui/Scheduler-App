import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST", 
        headers : {"Content-Type" : "application/json"}, 
        body : JSON.stringify(formData)
      })
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result);
      navigate("/scheduler");
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
          <h1>Login</h1>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange}/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
        </div>

        <button type="submit">Login</button>
        </form>
      </div>
  )
}

export default Login