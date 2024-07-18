import React from 'react'
import { useState, useEffect } from 'react';
import './Support.css'
import GroupDashboard from './GroupDashboard';

const Support = () => {
    const [groups, setgroups] = useState([]); 

    // Get Groups Joined
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/extra/getJoinedGroups/${localStorage.getItem('id')}`,{ 
          crossDomain: true, 
          headers: { 'Content-Type':'application/json', 
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
          setgroups(data);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    
    useEffect(() => { 
      fetchData();
    },[])

  return (
    <div>
        <div className="supportcontainer">
            <h3>Your Support Groups</h3>
            {groups.map((groupId) => (
              <GroupDashboard key={groupId} groupId={groupId}/>
            ))}
        </div>
    </div>
  )
}

export default Support