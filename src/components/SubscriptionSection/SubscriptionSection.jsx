import React from "react";
import { Link } from "react-router-dom";

const SubscriptionSection = () => {
  return (
    <div>
      <div className="aboutcontainer">
        <div className="aboutheading">
          <span>Our Plans</span>
        </div>
        <div className="planscontainer">
          <div className="plancard">
            <div className="planinner">
              <span className="planpricing">
                <span>
                  ₹0 <small>/ m</small>
                </span>
              </span>
              <p className="plantitle">Free Membership</p>
              <p className="planinfo">
                Join for free and get access to feautres like:{" "}
              </p>
              <ul className="planfeatures">
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Take a Mental Health Test</span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    Join <strong>Support Groups</strong>
                  </span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Get access to Printable Worksheets & Blogs</span>
                </li>
              </ul>
              <div className="planaction">
                <Link to={{ pathname: `/success` }} className="planbutton">
                  Choose plan
                </Link>
              </div>
            </div>
          </div>

          <div className="plancard">
            <div className="planinner">
              <span className="planpricing">
                <span>
                  ₹2000 <small>/ m</small>
                </span>
              </span>
              <p className="plantitle"> Basic Membership</p>
              <p className="planinfo">
                Upgrade for personalized plans and progress tracking.
              </p>
              <ul className="planfeatures">
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    <strong>Personalized Plans</strong> Tailored to Your Needs
                  </span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Take a Mental Health Test</span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    Join <strong>Support Groups</strong>
                  </span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Get access to Printable Worksheets & Blogs</span>
                </li>
              </ul>
              <div className="planaction">
                <Link to={{ pathname: `/payment/${2000}` }} className="planbutton">
                  Choose plan
                </Link>
              </div>
            </div>
          </div>

          <div className="plancard">
            <div className="planinner">
              <span className="planpricing">
                <span>
                  ₹5000 <small>/ m</small>
                </span>
              </span>
              <p className="plantitle">Premium Membership</p>
              <p className="planinfo">
                Unlock everything: personalized counseling, tailored plans,
                progress tracking.
              </p>
              <ul className="planfeatures">
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    Get <strong>Counseling</strong> from Verified Licensed
                    Therapists
                  </span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Take a Mental Health Test</span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>
                    Join <strong>Support Groups</strong>
                  </span>
                </li>
                <li>
                  <span className="planicon">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        fill="currentColor"
                        d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      ></path>
                    </svg>
                  </span>
                  <span>Get access to Printable Worksheets & Blogs</span>
                </li>
              </ul>
              <div className="planaction">
                <Link to={{ pathname: `/payment/${5000}` }} className="planbutton">
                  Choose plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;