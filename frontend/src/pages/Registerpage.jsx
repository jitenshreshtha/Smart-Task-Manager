import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registerpage() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData({...formData,
        [name]:value
    })
  };
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/register',{
        method: 'POST',
        headers:{"Content-Type": "application/json"},
        credentials: 'include',
        body: JSON.stringify(formData)
    });
    const data = await response.json();
    console.log(data);
    if(response.ok){
      console.log('User registered successfully');
      navigate('/');
    } else {
      console.error('Registration failed');
    }
  }
  return(
  <div>
    <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={formData.email} onChange={handleChange}/>
        <input type="password" name="password" value={formData.password} onChange={handleChange}/>
        <button type="submit">Register</button>
    </form>
  </div>
  )
}

export default Registerpage;
