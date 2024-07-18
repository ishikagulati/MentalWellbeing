import {React, useState, useEffect} from 'react';
import classes from "./Dashboard.module.css";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Map from "../Map/Map";
import girlImg from "../../assets/greetingImg.png";
import tasks from "../../assets/complete.svg";
import sleep from "../../assets/sleeping.svg";
import reports from "../../assets/reports.svg";
import {formatISO9075, subDays} from "date-fns"

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Dashboard() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = today.toLocaleDateString(undefined, options);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [sleepData, setSleepData] = useState({});
  
  // Fetch Moods Average

  const fetchData = () => {
    if (localStorage.getItem('id') != null) {
      try {
        fetch(`http://localhost:8080/extra/moodsAvg/${localStorage.getItem('id')}`,{ 
          crossDomain: true, 
          headers: { 'Content-Type':'application/json', 
            Accept: "application/json", 
            "Access-Control-Allow-Origin": "*", 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          } 
        })
        .then((res) => res.json())
        .then((data) => {
          setData(data) 
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  
  // Fetch Tasks Completed

  const fetchTasksCompleted = async () => {
    if (localStorage.getItem('id') != null) {
      const response = await fetch(`http://localhost:8080/extra/tasksCompleted/${localStorage.getItem('id')}`,{ 
        crossDomain: true, 
        headers: { 'Content-Type':'application/json', 
          Accept: "application/json", 
          "Access-Control-Allow-Origin": "*", 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        } 
      })
      if (response.status === 200) {
        await response.json()
        .then((data) => {
          setTasksCompleted(data.filter((value) => value === true).length) 
        })
      } else {
        setTasksCompleted(0);
      }
    }
  }

  // Fetch Sleep Data

  const fetchSleep = async () => {
    if (localStorage.getItem('id') != null) {
      const response = await fetch(`http://localhost:8080/extra/getSleep/${localStorage.getItem('id')}`,{ 
        crossDomain: true, 
        headers: { 'Content-Type':'application/json', 
          Accept: "application/json", 
          "Access-Control-Allow-Origin": "*", 
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        } 
      })
      if (response.status === 200) {
        await response.json()
        .then((data) => {
          setSleepData(data) 
        })
      }
    }
  }

  useEffect(() => { 
    fetchData();
    fetchTasksCompleted();
    fetchSleep();
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
    }, 1000);
  },[]) 

  // Add fetched Moods Data in avgData
  const avgData = Object.keys(data).map(key => {
      return {...data, name: key, Mood: data[key]}
  })

  // Add fetched Sleep Data in sleepDetail
  const sleepDetail = Object.keys(sleepData).map(key => {
    return {...sleepData, name: key, Sleep: (sleepData[key] < 4 || sleepData[key] > 11 ? 0 : (sleepData[key] >= 4 && sleepData[key] <= 7) || (sleepData[key] >= 9 && sleepData[key] <= 11) ? 1 : 2)}
  })
  
  // Merge avgData and sleepDetail
  const mergedData = [...avgData, ...sleepDetail]

  // Merge the mood and sleep of same day
  const groupedData = mergedData.reduce((result, item) => {
    const existingItem = result.find((i) => i.name === item.name);
    if (existingItem) {
      Object.keys(item).forEach((key) => {
        existingItem[key] = existingItem[key] || item[key];
      });
    } else {
      result.push({ ...item });
    }
    return result;
  }, []);

  // Sort the final data according to dates
  const sortedMergedData = [...groupedData].sort((a, b) => new Date(a.name) - new Date(b.name));
  
  return (
    <>
      {loading ? (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>) : (
        <main className={classes["main-container"]}>
          <div className={classes["main-title"]}>
            <h3>Dashboard</h3>
            <h6>{formattedDate}</h6>
          </div>

          <div className={classes.helloCard}>
            <div className={classes.greetingDiv}>
              <h4>
                Hi, <span>{localStorage.getItem('name')}</span>
              </h4>
              <p>
                Let's beat it!
                <br /> You have {3 - tasksCompleted} weekly tasks to complete today.
              </p>
            </div>
            <img src={girlImg} alt="girl greeting"/>
          </div>

          <h3>At a Glance</h3>
          <div className={classes["main-cards"]}>

            <div className={classes.card}>
              <div className={classes["card-inner"]}>
                <img src={tasks} alt="tick-icon"  className={classes["card_icon"]} />
              </div>
              <div className={classes.cardContent}>
                <h5>{tasksCompleted} Done</h5>
                <h6>Tasks</h6>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes["card-inner"]}>
                <img src={sleep} alt="tick-icon"  className={classes["card_icon"]} />
              </div>
              <div className={classes.cardContent}>
                <h5>{sleepData[formatISO9075(subDays(new Date(), 1)).split(' ')[0]] ? sleepData[formatISO9075(subDays(new Date(), 1)).split(' ')[0]] : "Add Sleep"} Hours</h5>
                <h6>Sleep</h6>
              </div>
            </div>
            <div className={classes.card}>
              <div className={classes["card-inner"]}>
                <img src={reports} alt="tick-icon"  className={classes["card_icon"]} />
              </div>
              <div className={classes.cardContent}>
                <h5>12 Reports</h5>
                <h6>Tests</h6>
              </div>
            </div>
      
          </div>

        <h3>Your Progress</h3>

        {/* Graph and Calender */}

          <div className={classes.charts}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={sortedMergedData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Mood"
                  stroke="#86c5bf"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Sleep" stroke="#e27259" activeDot={{ r: 8 }}/>
              </LineChart>
              </ResponsiveContainer>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar defaultValue={dayjs()} />
              </LocalizationProvider>
            </div>

            {/* Map Locations */}

            <Map/>  
          </main>
      )}
    </>
  );
}
export default Dashboard;