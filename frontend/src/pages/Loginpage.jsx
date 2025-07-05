import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

function Loginpage() {
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
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/login",{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            credentials: 'include', 
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if(response.ok){
            console.log('User logged in successfully');
            navigate('/');
        } else {
            console.error('Login failed');
        }
    }
    return(
        <div>
            <h2>Login page</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password"  onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Loginpage;