import { useState } from "react";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

const FAQSection = () => {
  const [openprofile1, setOpenProfile1] = useState(false);
  const [openprofile2, setOpenProfile2] = useState(false);
  const [openprofile3, setOpenProfile3] = useState(false);
  const [openprofile4, setOpenProfile4] = useState(false);
  const [plusShow1, setPlusShow1] = useState(true);
  const [plusShow2, setPlusShow2] = useState(true);
  const [plusShow3, setPlusShow3] = useState(true);
  const [plusShow4, setPlusShow4] = useState(true);

  function handleClick1() {
    setOpenProfile1((current) => !current);
    setPlusShow1((current) => !current);
  }

  const handleClick2 = (event) => {
    setOpenProfile2((current) => !current);
    setPlusShow2((current) => !current);
  };

  const handleClick3 = (event) => {
    setOpenProfile3((current) => !current);
    setPlusShow3((current) => !current);
  };

  const handleClick4 = (event) => {
    setOpenProfile4((current) => !current);
    setPlusShow4((current) => !current);
  };
  
  return (
    <div>
      <div className="questioncontainer">
        <div className="aboutheading">
          <span>Frequently Asked Questions</span>
        </div>
        <div className="questionsContent">
          <div className="questions">
            <span>
              How do I know if I need a mental disorder test or mental health
              screening?
              <div className="plus" onClick={handleClick1}>
                {plusShow1 && (
                  <span className="add material-symbols-outlined">
                    <MdKeyboardArrowRight />
                  </span>
                )}
                {openprofile1 && (
                  <span
                    id="removebtn"
                    className="remove material-symbols-outlined"
                  >
                    <MdKeyboardArrowDown color={"grey"} />
                  </span>
                )}
              </div>
            </span>
            {openprofile1 && (
              <div className="answer">
                Consider taking a test to assess your mental health if you’ve
                noticed changes in how you feel or in your ability to function
                for the last for two weeks or more. If you’ve found yourself
                feeling extra tired, irritable, anxious, unfocused, or sad
                lately, and these symptoms are interfering with your ability to
                engage in your day-to-day life, these could be signs that you
                could benefit from mental health treatment.
              </div>
            )}
          </div>
          <div className="questions">
            <span>
              How can I test my mental health condition?
              <div className="plus" onClick={handleClick2}>
                {plusShow2 && (
                  <span className="add material-symbols-outlined">
                    <MdKeyboardArrowRight />
                  </span>
                )}
                {openprofile2 && (
                  <span
                    id="removebtn"
                    className="remove material-symbols-outlined"
                  >
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
            </span>
            {openprofile2 && (
              <div className="answer">
                We offer free mental health tests that only take a few minutes
                to complete. MindWell's mental health tests will give you a
                better understanding of your symptoms, and cover a variety of
                different mental health conditions. Currently MindWell provides
                mental health tests for depression symptoms.
              </div>
            )}
          </div>
          <div className="questions">
            <span>
              Can you get a mental health diagnosis and mental health treatment
              online?
              <div className="plus" onClick={handleClick3}>
                {plusShow3 && (
                  <span className="add material-symbols-outlined">
                    <MdKeyboardArrowRight />
                  </span>
                )}
                {openprofile3 && (
                  <span
                    id="removebtn"
                    className="remove material-symbols-outlined"
                  >
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
            </span>
            {openprofile3 && (
              <div className="answer">
                Online mental health tests can give you a better understanding
                of your mental health symptoms, but these tests can’t provide
                you with a diagnosis. A licensed therapist can discuss your test
                results with you, gather additional information, and then
                formulate a mental health diagnosis to support your treatment
                goals.
              </div>
            )}
          </div>
          <div className="questions">
            <span>
              How accurate is a psychological test online?
              <div className="plus" onClick={handleClick4}>
                {plusShow4 && (
                  <span className="add material-symbols-outlined">
                    <MdKeyboardArrowRight />
                  </span>
                )}
                {openprofile4 && (
                  <span
                    id="removebtn"
                    className="remove material-symbols-outlined"
                  >
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
            </span>
            {openprofile4 && (
              <div className="answer">
                Online mental health tests, provide a snapshot of the severity
                of your symptoms at that particular point in time. For more
                information on the current state of your mental health, consider
                working with a licensed mental health professional. A therapist
                or psychologist can gather additional mental health assessment
                information and test your symptoms at regular intervals to
                determine a diagnosis and get a more accurate picture of your
                mental health.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;