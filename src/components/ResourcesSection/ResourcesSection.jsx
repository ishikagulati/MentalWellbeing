import React from 'react'
import Planner from '../../assets/counselling.png'
import Resource from '../../assets/resource.png'
import Groups from '../../assets/groups.png'
import { FaArrowRight } from 'react-icons/fa'

const ResourcesSection = () => {
  return (
    <div>
      <div className="resources-container">
      <div class="containerr">
          <div className="resources-left">
            <span id='leftheading'>We Are Here To Help</span>
            <div className='helpbox'>
              <div id='help-button'>Start your healing journey with us:</div>
              <div id='go-button'><FaArrowRight /></div>
            </div>
          </div>
          <div class="palette">
            <div class="color">
              <img src={Planner}/>
              <h3 id='color-heading'><h2>01</h2><span>Get Counselling</span></h3>
            </div>
            <div class="color">
              <img src={Resource}/>
              <h3 id='color-heading'><h2>02</h2><span>Resources</span></h3>
            </div>
            <div class="color">
              <img src={Groups}/>
              <h3 id='color-heading'><h2>03</h2><span>Support Groups</span></h3>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}

export default ResourcesSection


