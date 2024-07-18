import React, { useState, useEffect } from 'react';
import './Support.css'
import { GrGroup } from "react-icons/gr";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const GroupDashboard = ({ groupId }) => {
    const [groupDetails, setGroupDetails] = useState([]);
    const [Admin, setAdmin] = useState(false);

    useEffect(() => {
        // Fetch Specific Group Details
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/groups/${JSON.parse(groupId)}`, {
                    crossDomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const result = await response.json()
                    .then((data) => {
                        setGroupDetails(data)
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [groupId]);

    function handleGroupLeave() {
        swal({
            title: "Are you sure?",
            text: "Do you want to leave this group?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                swal("Group left successfully!", {
                    icon: "success",
                });
            } else {
                swal("Thanks for not leaving us!");
            }
        });
    }

    useEffect(() => {
        const username = localStorage.getItem('name');
        const organizerName = groupDetails.organizer;
        if (username === organizerName) {
            setAdmin(true);
        }
    }, [groupDetails.organizer])

    return (
        <div>
            {groupDetails ? (
                <div className="dashsupportcontainer">
                    {!Admin && (
                        <>
                            <div className="grpleft">
                                <div className="grpname">{groupDetails.title}</div>
                                <div className="grporg">Organized by {groupDetails.organizer}</div>
                                <div className="grpmembers"><GrGroup /> {groupDetails.members} members</div>
                                <div className="grptopics"></div>
                            </div>
                            <div className="grpright">
                                <div className="grpview">
                                    <Link to={`/groupdesc/${groupDetails._id}`}>
                                        <button>View</button>
                                    </Link>
                                </div>
                                <div className="grpleave">
                                    <button onClick={handleGroupLeave}>Leave</button>
                                </div>
                            </div>
                        </>
                    )}
                    {Admin && (
                        <>
                            <div className="grpleft">
                                <div className="grpname">{groupDetails.title}</div>
                                <div className="grporg">Organized by {groupDetails.organizer}</div>
                                <div className="grpmembers"><GrGroup /> {groupDetails.members} members</div>
                                <div className="grptopics"></div>
                            </div>
                            <div className="grpright">
                                <div className="grpview">
                                    <Link to={`/groupdesc/${groupDetails._id}`}>
                                        <button>View</button>
                                    </Link>
                                </div>
                                <div className="grpdashchat">
                                    <Link to={'/chat'}>
                                        <button>Chat</button>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            ) : (
                <p>Loading</p>
            )
        }
        </div>
    )
}

export default GroupDashboard