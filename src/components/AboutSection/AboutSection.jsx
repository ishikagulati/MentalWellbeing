import React from "react";
import Search from "../../assets/search.png";
import Plan from "../../assets/plan.png";
import Group from "../../assets/group.png";
import Reward from "../../assets/reward.png";
import { FaArrowRight } from "react-icons/fa";

const AboutSection = () => {
  return (
    <div>
      <div className="aboutcontainer">
        <div className="aboutheading">
          <span>How MindWell Works?</span>
        </div>
        <div className="howitworkscontainer">
          <div className="workscard">
            <img src={Search} id="workcardimg" />
            <span>Take a Mental Health test</span>
            <p>
              Discover your emotional well-being with our confidential
              screening. Take the first step towards understanding your mental
              health.
            </p>
            <button>
              Learn more <FaArrowRight />
            </button>
          </div>
          <div className="workscard">
            <img src={Plan} id="workcardimg" />
            <span>Follow the Plan</span>
            <p>
              Commit to your mental health journey. Stick to your personalized
              treatment plan for progress and lasting well-being.
            </p>
            <button>
              Learn more <FaArrowRight />
            </button>
          </div>
          <div className="workscard">
            <img src={Group} id="workcardimg" />
            <span>Join Support Groups</span>
            <p>
              Gain encouragement and insights by joining supportive groups for
              shared experiences and understanding.
            </p>
            <button>
              Learn more <FaArrowRight />
            </button>
          </div>
          <div className="workscard">
            <img src={Reward} id="workcardimg" />
            <span>Get Counseling</span>
            <p>
              Access personalized guidance from certified therapists for
              effective strategies tailored to your needs and concerns.
            </p>
            <button>
              Learn more <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;