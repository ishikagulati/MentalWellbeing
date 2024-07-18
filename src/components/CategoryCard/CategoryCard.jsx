import React from 'react';
import './CategoryCard.css';
import { BsArrowRightCircle } from "react-icons/bs";

function CategoryCard(data) {
  return (
    <div className='mainCategoryPage'>
        <div className='leftPart'>
            <img src={data.img} alt="" />
        </div>
        <div className='rightPart'>
            <h2>{data.heading}</h2>
            <p>{data.details}</p>
        </div>
        <BsArrowRightCircle className='arrowIcon' size={50}/>
    </div>
  )
}

export default CategoryCard