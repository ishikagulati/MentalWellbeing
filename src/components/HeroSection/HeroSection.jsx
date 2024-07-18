import React from "react";
import "../../styles/HomePage.css";
import Heroimg from "../../assets/heroimg.png";
import { Link } from "react-router-dom";
import Article from "../../assets/blogging.png";
import Group from "../../assets/customer-care.png";
import Therapist from "../../assets/mental-health.png";

const HeroSection = () => {
  return (
    <div>
      <div className="Hero">
        <div className="herocontainer">
          <div className="heroleft">
            <div className="heroheading">
              Elevate your mind, <br /> Embrace your wellness!
            </div>

            <div className="herotext">
              <div className="herospan">
                In mental care, there is no one-size-fits-all approach to mental
                health. We tailor our care plans to fit each individual's unique
                needs. Join us in fostering a mentally healthier tomorrow!
              </div>
              <div className="heroboxes">
                <div className="herobox">
                  <div>
                    <img src={Group} className="handicon" />
                  </div>
                  <div className="testboxtext">
                    <span id="boxnum">10+</span>
                    <span>Support groups</span>
                  </div>
                </div>
                <div className="herobox">
                  <div>
                    <img src={Article} className="handicon" />
                  </div>
                  <div className="testboxtext">
                    <span id="boxnum">100+</span>
                    <span>Worksheets & Blogs</span>
                  </div>
                </div>
                <div className="herobox">
                  <div>
                    <img src={Therapist} className="handicon" />
                  </div>
                  <div className="testboxtext">
                    <span id="boxnum">20+</span>
                    <span>Therapists</span>
                  </div>
                </div>
              </div>
              <button>
                <Link
                  to={{ pathname: "/categories" }}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <span>Take a Test</span>
                </Link>
                <span></span>
              </button>
            </div>
          </div>
          <div className="heroright">
            <img src={Heroimg} className="heroimg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;