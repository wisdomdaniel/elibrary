import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(){
    const [Email,setEmail]=useState('')
    const [Password,setPassword]=useState(' ')

    const navigate = useNavigate()

    const users = [
        { email: "admin@example.com", 
            password: "password1",
            role:"admin" },

        { email: "student@example.com", 
            password: "password2",
            role:"student" }
    ]

    function handleEmailChange(e){
     e.preventDefault();

     const user = users.find((u)=> u.email === Email && u.password === Password)

     if(user){
        alert("Invalid email or password")
    }

    localStorage.setItem("user",JSON.stringify(user))

    }

    

    return(
        <div>
             <h1>E-Library Login</h1>

             <form onSubmit={handleEmailChange}>
             <div>
                <label>Email:</label>
                <br/>
                <input type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} required />
             </div>

             <br/>

             <div>
                <label>Password:</label>
                <input type="password" value={Password} onChange={(e)=>setPassword(e.target.value)} required />
             </div> 

              <br/>
                <button type="submit">
                    Login
                </button>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
             </form>
        </div>
       

    )
}
export default Login