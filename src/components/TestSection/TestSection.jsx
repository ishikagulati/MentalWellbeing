import React from 'react'
import { Link } from 'react-router-dom'
import Test from '../../assets/testimg-2-2.png'

const TestSection = () => {
  return (
    <div>
      <div className="testcontainer">
      <div className="testcontainerLeft">
        <img src={Test}/>
      </div>
        <div className="testcontainerRight">
          <div className="testheading"><span>Self Assessment Test</span></div>
          <div className='testsubheading'>
            <span></span>
            <span id='testsubheadingbold'>Mental health conditions, such as depression or anxiety, are real, common and treatable. And recovery is possible.</span>
            <button>
              <Link to={{ pathname: "/categories" }} style={{ textDecoration: "none", color: "#fff" }}>Take a Test</Link>
            </button>
          </div>

          <div className="helpline">
            <span><span id='testsubheadingbold'>Please Note:</span>This website is an informational resource. We are not a crisis support line. If you need immediate help, you can reach the Suicide & Crisis Lifeline by calling 1800-121-3667 or emergency number 112. You can also text “HELP” to 741-741 to reach the Crisis Text Line. Warmlines are an excellent place for non-crisis support.</span>
            <span>For all other screening-related questions and non-emergency support, please use Mindwell’s Contact Us form.</span>
          </div>
        </div>
        

      </div>
    </div>
  )
}

export default TestSection