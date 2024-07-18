import React, { useEffect, useState } from 'react';
import './Plan.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Plan() {
    const [planDetail, setPlanDetail] = useState({});
    const [tasksCompleted, setTasksCompleted] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Fetch User Age
    const fetchAge = () => {
        try {
            fetch(`http://localhost:8080/user/age/${localStorage.getItem('email')}`,{ 
                crossDomain: true, 
                headers: { 
                    'Content-Type':'application/json', 
                    Accept: "application/json", 
                    "Access-Control-Allow-Origin": "*", 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` 
                } 
            }).then((res) => res.text())
            .then((data) => {
                fetchPlan(data);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch Weekly Plan According to Age
    const fetchPlan = (age) => {
        if (age != '') {
            try {
                fetch(`http://localhost:8080/plans/plan/${age}`, {
                    crossDomain: true,
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: "application/json",
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                }).then((res) => res.json())
                .then((data) => {
                    setPlanDetail(data)
                });
            } catch (error) {
                setPlanDetail(['false', 'false', 'false'])
            }
        }
    }

    // Fetch Tasks Completed
    const fetchTasks = async () => {
        const response = await fetch(`http://localhost:8080/extra/tasksCompleted/${localStorage.getItem('id')}`,{ 
            crossDomain: true, 
            headers: { 'Content-Type':'application/json', 
              Accept: "application/json", 
              "Access-Control-Allow-Origin": "*", 
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            } 
          })
          if (response.status == 200) {
            const result = await response.json()
            .then((data) => {
              setTasksCompleted(data) 
            })
        } else {
          setTasksCompleted([false, false, false]);
        }
    }

    useEffect(() => {
        fetchAge();
        fetchTasks();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [])

    const handleChange = (index) => {
        const newCheckboxes = [...tasksCompleted];
        newCheckboxes[index] = !newCheckboxes[index];
        setTasksCompleted(newCheckboxes);
        
        fetch(`http://localhost:8080/extra/task/${localStorage.getItem('id')}`,{ 
            method: 'PUT', 
            headers: { 
                'Content-Type':'application/json', 
                Accept: "application/json", 
                "Access-Control-Allow-Origin": "*", 
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },  
            body: JSON.stringify(newCheckboxes)
        }); 
            
        fetchAge();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }

    return (
        <>
        {loading ? (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        ) : (
            <div className='mainPlanPage'>
                <h3>Your This Week's Plan</h3>
                <Box className="planBox" sx={{ width: '100%' }}>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid className='planBoxItem' item xs={6}>
                            <p><strong>Task</strong></p>
                        </Grid>
                        <Grid className='planBoxItem' item xs={6}>
                            <p><strong>Completed</strong></p>
                        </Grid>
                        </Grid>
                    {planDetail.length > 0 && planDetail.map((ele, idx) => (
                        <Grid key = {idx} container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid className='planBoxItem' item xs={6}>
                            <p>{ele}</p>
                        </Grid>
                        <Grid key={idx} className='planBoxItem' item xs={6}>
                            <input type="checkbox" style={{transform: 'scale(1.2)'}} checked={tasksCompleted[idx]} onChange={() => handleChange(idx)}/>
                        </Grid>
                        </Grid>
                    ))}
                </Box>
            </div>
        )}
        </>
    )
}

export default Plan