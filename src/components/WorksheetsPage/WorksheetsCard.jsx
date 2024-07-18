import React, { useState, useEffect } from "react";
import classes from "./WorksheetsCard.module.css";
import image1 from "../../assets/blogImage.jpg";
import { Link } from "react-router-dom";

function WorksheetCard({ id, image, title, content, pdf }) {
  return (
    <div className={classes.worksheetCard}>
      <img className={classes.image} src={image} alt="worksheet" />

      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <Link to={pdf} className={classes.button} target="_blank">
        Download
      </Link>
    </div>
  );
}

export default WorksheetCard;