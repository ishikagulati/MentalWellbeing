import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/TaeAugust07.jpg';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert'

function Login() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setUserDetails((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    //generating the token once the user login
    async function login(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/generate-token", {
            method: 'POST',
            crossDomain: true,
            body: JSON.stringify({ 'username': userDetails.email, 'password': userDetails.password }),
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            }
        });
        if (response.status === 200) {
            const result = response.json()
                .then(data => {
                    console.log(data)
                    swal({
                        title: "Welcome!",
                        text: "User logged In Successfully!",
                        icon: "success",
                    });
                    localStorage.setItem("token", data.token);
                    navigate("/dashboard");
                })
        } else {
            swal("Wrong Credentials", "Something went wrong!", "error")
        }
    }

    return (
        <>
            <Navbar />
            <div className='main'>
                <div className='details'>
                    <h2>Login to your account</h2>
                    <form onSubmit={login}>
                        <label>Email</label>
                        <input value={userDetails.email} onChange={handleInputChange} type="email" name="email" id="" placeholder='Email' required />
                        <label>Password</label>
                        <input value={userDetails.password} onChange={handleInputChange} type="password" name="password" id="" placeholder='Password' required />
                        <button type='submit'>Sign In</button>
                    </form>
                    <div className='registerLink'><p>Don't have an account? </p><Link to={{ pathname: "/signup" }}>Register here</Link></div>
                </div>
                <div className='loginImage'>
                    <img src={img} alt="" />
                </div>
            </div>
        </>
    )
}

export default Login