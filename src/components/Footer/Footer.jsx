import React from 'react'
import "./Footer.css"
import Logo from '../../assets/logo.png'
import { RiFacebookBoxLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineLinkedin } from "react-icons/ai";
import { Link } from 'react-router-dom';

const footer = () => {
    return (
        <div className="main-footer">
            <div className="footerContent">
                <div className="">
                    <div className="footerLogo">
                        <img src={Logo} width={60} />
                        <span>MindWell</span>
                    </div>
                    <div className="footerIcons">
                        <RiFacebookBoxLine size={30} />
                        <BsTwitterX size={20} />
                        <BsInstagram size={20} />
                        <AiOutlineLinkedin size={30} />
                    </div>
                </div>
                <div className="footerSection">
                    <h3>Explore</h3>
                    <Link to="/categories">Self Assessment</Link>
                    <Link to="/">Get Counselling</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/resources">Worksheets</Link>
                    <Link to="/community">Community</Link>
                </div>
                <div className="footerSection">
                    <h3>Contact Us</h3>
                    <a className="mailToEmail" href="mailto:mindwell@gmail.com">mindwell@gmail.com</a>
                    <p>24, DLF Cyber Hub,<br/> Gurugram</p>
                    <p>+ 913211342210</p>

                </div>
                <div className="footerSection">
                    <h3>Subscribe</h3>
                    <p>Enter your email to subscribe to our Newsletter.</p>
                    <input type='text' placeholder='Email' />
                </div>
            </div>
            <div className="allrights">
                <span>Privacy Policy | Terms of Service | Disclaimer</span>
                <span>© 2023 MindWell. All rights reserved.</span>
            </div>
        </div>
    )
}

export default footer