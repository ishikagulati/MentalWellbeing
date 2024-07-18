import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import HealthImg from '../../assets/mentalHealthImg.png';
import mentalData from '../../utils/healthData.js';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import './Categories.css';

function Categories() {
    const [mentalActive, setMentalActive] = useState(true);
    const [physicalActive, setPhysicalActive] = useState(false);
    const [isMentalActive, setIsMentalActive] = useState(false);
    const [isPhysicalActive, setIsPhysicalActive] = useState(false);

    //functions used to toggle between mental and physical categories
    const mentalButtonPressed = () => {
        setMentalActive(true);
        setPhysicalActive(false);

        if (isMentalActive) {
            setIsMentalActive(false);
            setIsPhysicalActive(true);
        }
        setIsPhysicalActive(false);
    }

    const physicalButtonPressed = () => {
        setMentalActive(false);
        setPhysicalActive(true);

        if (isPhysicalActive) {
            setIsPhysicalActive(false);
            setIsMentalActive(false);
        } else {
            setIsPhysicalActive(true);
            setIsMentalActive(true);
        }
    }

    //fetching the current user details after sign up
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            fetch('http://localhost:8080/current-user', {
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (localStorage.getItem('name') == null) {
                        localStorage.setItem('id', data._id);
                        localStorage.setItem('name', data.name)
                        localStorage.setItem('email', data.username);
                        window.location.reload();
                    }
                });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div className='categoryMain'>
                <div className='categoryTop'>
                    <div className='categoryTopLeft'>
                        <img src={HealthImg} alt="" />
                    </div>
                    <div className='categoryTopRight'>
                        <h1>Which category you fall under?</h1>
                        <div className='categoryButtons'>
                            <button onClick={mentalButtonPressed} className={isMentalActive ? 'mentalButton' : ''}>Mental</button>
                            <button onClick={physicalButtonPressed} className={isPhysicalActive ? 'physicalButton' : ''}>Physical</button>
                        </div>
                    </div>
                </div>
                <div className='categoryBottom'>
                    {mentalActive ?
                        mentalData
                            .filter((data) => data.type === 'mental')
                            .map((data) => (
                                <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/questions/${data.heading}` }}>
                                    <CategoryCard {...data} key={data.id} />
                                </Link>
                            )) :

                        (physicalActive && (
                            mentalData
                                .filter((data) => data.type === 'physical')
                                .map((data) => (
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={{ pathname: `/questions/${data.heading}` }}>
                                        <CategoryCard {...data} key={data.id} />
                                    </Link>
                                ))
                        ))
                    }
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Categories