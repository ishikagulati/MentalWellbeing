import React, { useState, useEffect } from 'react'
import '../../styles/Groupdesc.css'
import Navbar from '../../components/Navbar/Navbar'
import GroupAbout from '../../components/GroupDescComponents/GroupAbout'
import GroupSidebar from '../../components/GroupSidebar/GroupSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import swal from 'sweetalert';

const Groupdesc = () => {
    const [groupsData, setGroupsData] = useState([]);
    const [isMember, setMember] = useState(false);
    const [groups, setGroups] = useState([]);
    const [Admin, setAdmin] = useState(false);
    const navigate = useNavigate();
    const id = useParams();

    const [component, setComponentActive] = useState(<GroupAbout />);

    const topics = groupsData.topics ? groupsData.topics.split(', ') : [];

    //fetching details of a specific group using id
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            fetch(`http://localhost:8080/groups/${id.id}`, {
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
                    setGroupsData(data);
                    setComponentActive(<GroupAbout data={data.about} />)
                    localStorage.setItem('GroupName', data.title);
                });
        }
    }, []);

    //adding the support group to the users joinedGroups array and 
    //updating the number of members in the specific support groups
    async function updateMembers(e) {
        const response = await fetch(`http://localhost:8080/extra/addGroup/${localStorage.getItem('id')}`, {
            method: 'PUT',
            body: JSON.stringify(id.id),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.status)
        if (response.status == 200) {
            fetch(`http://localhost:8080/groups/updateGroupMembers/${id.id}`, {
                method: 'PUT',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            swal({
                title: "Welcome!",
                text: "You've successfully joined the group!",
                icon: "success",
                button: "OK",
            });
            navigate("/community")

        } else {
            swal({
                title: "Already in this group!",
                text: "You've already joined this group!",
                button: "OK",
            });
        }
    }

    //if the user is the one who created the support group, 
    //the group will be added to the user's details and members will be updated
    async function updateAdmin(e) {
        const response = await fetch(`http://localhost:8080/extra/addGroup/${localStorage.getItem('id')}`, {
            method: 'PUT',
            body: JSON.stringify(id.id),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.status)
        if (response.status == 200) {
            fetch(`http://localhost:8080/groups/updateGroupMembers/${id.id}`, {
                method: 'PUT',
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })
        }
    }


    //fetching the details of all the groups joined by each user 
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/extra/getJoinedGroups/${localStorage.getItem('id')}`, {
                crossDomain: true,
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json()
                .then((data) => {
                    setGroups(data);
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {

        // Check if id exists in the groups array
        const idExists = groups.some(group => JSON.parse(group) === id.id);

        if (idExists) {
            setMember(true);
            console.log(`exist`);
        } else {
            setMember(false);
            console.log(`not exists`);
        }
    }, [id, groups, Admin]);

    //to check if the current user is the admin of the group
    useEffect(() => {
        const username = localStorage.getItem('name');
        const organizerName = groupsData.organizer;
        if (username === organizerName) {
            setAdmin(true);
            updateAdmin();
        }
    }, [groupsData.organizer])

    function handlejoinchat() {
        navigate('/chat');
    }

    return (
        <div className='grpdescbackcontainer'>
            <Navbar />
            <>
                <div className="descheader">
                    <div className="descheading">
                        <h1>{groupsData.title}</h1>
                        <p><FaLocationDot color='#ff1154' />   {groupsData.location}</p>
                        <p><GrGroup />   {groupsData.members} members</p>
                        <p><IoPersonOutline />Organized by<span>{groupsData.organizer}</span></p>
                    </div>
                    {!isMember && !Admin && (
                        <>
                            <div className='joinbutton'>
                                <button onClick={updateMembers}>Join Group</button>
                            </div>
                        </>
                    )}

                    {isMember && !Admin && (
                        <>
                            <div className='joinbutton'>
                                <button onClick={handlejoinchat}>Join Group Chat</button>
                            </div>
                        </>
                    )}

                    {isMember && Admin && (
                        <>
                            <div className='joinbutton'>
                                <button onClick={handlejoinchat}>Join Group Chat</button>
                            </div>
                        </>
                    )}

                </div>
                
                <div className="groupelements">
                    <GroupSidebar componentHandler={setComponentActive} member={isMember} admin={Admin} />
                    {component}
                </div>

                <div className="topicsSection">
                    <p>Related Topics</p>
                    <div className="topicboxes">
                        {topics.map((topic, index) => (
                            <div id='topicbox' key={index}>{topic}</div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    )
}

export default Groupdesc