import React, { useEffect } from 'react'
import "../../App.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import { useState } from "react";

const UserDashboard = () => {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
    const [component, setComponentActive] = useState(<Dashboard />);

    const handleSidebar = () => {
        setOpenSidebarToggle((prev) => !prev);
    };

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
                    if (localStorage.getItem('name') === null) {
                        localStorage.setItem('id', data._id)
                        localStorage.setItem('name', data.name)
                        localStorage.setItem('email', data.username)
                        window.location.reload();
                    }
                });
            fetch(`http://localhost:8080/extra/detail/${localStorage.getItem('id')}`, {
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
                    localStorage.setItem("result", data.result)
                });
        }
    }, []);

    return (
        <div className="grid-container">

            <>
                <Header sidebarHandler={handleSidebar} />
                <Sidebar componentHandler={setComponentActive} sidebarHandler={handleSidebar} openSidebar={openSidebarToggle} />
                {component}
            </>

        </div>
    );
}

export default UserDashboard