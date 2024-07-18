import React from "react";
import classes from "./Therapists.module.css";
import { Link } from "react-router-dom";
function TherapistsCard({ img, name, designation, details }) {
  return (
    <div className={classes.therapistCard}>
      <div className={classes.therapistImg}>
        <img src={img} alt="therapist pfp" />
      </div>

      <div className={classes.details}>
        <h4>{name}</h4>
        <h6>{designation}</h6>
        <p>{details}</p>
      </div>
    </div>
  );
}

export default TherapistsCard;