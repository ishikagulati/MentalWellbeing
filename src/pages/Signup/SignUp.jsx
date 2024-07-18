import { useState, useRef } from 'react';
import React from 'react';
import img from '../../assets/TaeAugust05.jpg';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import emailjs from '@emailjs/browser';

function SignUp() {
    const [showEmergency, setShowEmergency] = useState(false);
    const [userDetails, setUserDetails] = useState({
        user_name: '',
        user_number: '',
        user_email: '',
        user_password: ''
    });
    const [emergencyDetails, setEmergencyDetails] = useState({
        extra_name: '',
        extra_number: '',
        extra_email: ''
    });
    const [formData, setFormData] = useState({});

    const form1 = useRef();
    const form2 = useRef();

    const navigate = useNavigate();

    function handleUserInputChange(e) {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        setFormData({
            ...formData,
            user_name: form1.current.user_name.value
        })
    }

    function handleEmergencyInputChange(e) {
        const { name, value } = e.target;
        setEmergencyDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
        setFormData({
            ...formData,
            extra_name: form2.current.extra_name.value,
            extra_email: form2.current.extra_email.value
        })
    }

    function saveDetails(e) {
        e.preventDefault();
        setShowEmergency(current => !current);
        console.log(userDetails);
    }

    async function submitDetails(e) {
        e.preventDefault();
        console.log(formData)
        emailjs.send('service_wakzvca', 'template_55qorzw', formData, 'W6vv5FFrgOHL5ZovX')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        const response = await fetch('http://localhost:8080/user/register', {
            method: 'POST',
            body: JSON.stringify({ "name": userDetails.user_name, "number": userDetails.user_number, "username": userDetails.user_email, "password": userDetails.user_password, "emergencyContact": { "name": emergencyDetails.extra_name, "number": emergencyDetails.extra_number, "email": emergencyDetails.extra_email } }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status === 200) {
            swal({
                title: "Registered!",
                text: "You have registered successfully!",
                icon: "success",
                button: "Ok",
            });
            fetch("http://localhost:8080/generate-token", {
                method: 'POST',
                crossDomain: true,
                body: JSON.stringify({ 'username': userDetails.user_email, 'password': userDetails.user_password }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true"
                }
            }).then((res) => res.json())
                .then((data) => {
                    if (data.token !== "") {
                        window.localStorage.setItem("token", data.token);
                        navigate("/categories");
                    } else {
                        swal("Wrong Credentials", "Something went wrong!", "error")
                    }
                });
            navigate("/login");

        } else {
            swal({
                title: "User Already Registered!",
                button: "Ok",
            });
        }
    }

    return (
        <>
            <Navbar />
            <div className='main'>
                <div className='loginImage'>
                    <img src={img} alt="" />
                </div>
                <div className='details'>
                    {!showEmergency && (<>
                        <h2>Create an Account</h2>
                        <form ref={form1} onSubmit={saveDetails}>
                            <label>Full Name</label>
                            <input value={userDetails.user_name} onChange={handleUserInputChange} type="text" name="user_name" id="" placeholder='Your Name' required />
                            <label>Mobile Number</label>
                            <input value={userDetails.user_number} maxLength={10} onChange={handleUserInputChange} type="number" name="user_number" id="" placeholder='Enter Your Number' required />
                            <label>Email</label>
                            <input value={userDetails.user_email} onChange={handleUserInputChange} type="email" name="user_email" id="" placeholder='Email' required />
                            <label>Password</label>
                            <input value={userDetails.user_password} onChange={handleUserInputChange} type="password" name="user_password" id="" placeholder='Password' required />
                            <button type='submit'>Continue</button>
                        </form>
                    </>
                    )}
                    {showEmergency && (<>
                        <h2>Emergency Contact Details</h2>
                        <form ref={form2} onSubmit={submitDetails}>
                            <label>Emergency Contact Name</label>
                            <input value={emergencyDetails.extra_name} onChange={handleEmergencyInputChange} type="text" name="extra_name" id="" placeholder='Emergency Contact Name' required />
                            <label>Emergency Contact Mobile Number</label>
                            <input value={emergencyDetails.extra_number} onChange={handleEmergencyInputChange} type="number" name="extra_number" id="" placeholder='Emergency Contact Number' required />
                            <label>Emergency Contact Email</label>
                            <input value={emergencyDetails.extra_email} onChange={handleEmergencyInputChange} type="email" name="extra_email" id="" placeholder='Emergency Contact Email' required />
                            <button type='submit'>Register</button>
                        </form>
                    </>
                    )}
                </div>

            </div>
        </>
    )
}

export default SignUp