import React from "react";
import classes from "./About.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";

// import image from "../assets/images/hero-banner.jpg";

function About() {
  return (
    <>
      <Navbar />
      <div className={classes.aboutDiv}>
        <div className={classes.banner}>
          <div className={classes.bannerHeading}>
            <h1>About Us</h1>
          </div>
        </div>
        <div className={classes.content}>
          <h4>Welcome to MindWell</h4>
          <h3>Elevate your mind, Embrace your wellness!</h3>
          <p>
            At MindWell, we champion mental well-being as a fundamental aspect
            of a fulfilling life. Our platform is more than a resource hub; it's
            a community-driven initiative committed to making mental health
            support accessible to all.
          </p>{" "}
          <br />
          <br />
          <p>
            <strong>Our Mission: Accessible Support for Mental Health</strong>
            <br />
            MindWell is driven by a singular mission: to provide accessible
            resources and unwavering support for mental health. We're dedicated
            to breaking down barriers, ensuring that everyone has access to the
            tools and guidance needed to nurture their mental well-being.
            Through innovative approaches and community-driven initiatives, we
            aim to bridge the gap between individuals and the resources they
            need for their mental health journey. Whether through educational
            materials, supportive networks, or expert guidance, MindWell
            endeavors to empower individuals with the means to prioritize their
            mental wellness.
          </p>
          <br />
          <br />
          <p>
            <strong>
              Values That Guide Us: Empathy, Inclusivity, Community
            </strong>{" "}
            <br />
            Our core values—empathy, inclusivity, and community—serve as the
            compass for all that we do. We believe in the power of empathy to
            foster understanding and connection. Inclusivity is woven into our
            fabric, recognizing and celebrating the diversity of experiences
            within our community. And through a strong sense of community, we
            thrive by supporting and uplifting one another.
          </p>
          <br />
          <br />
          <p>
            <strong>Community at the Heart of MindWell</strong> <br />
            Community forms the beating heart of MindWell. We prioritize
            building a supportive community where individuals can share
            experiences, find solace, and receive the encouragement needed on
            their mental health journey. <br />
            <br />
            At MindWell, we're not just an organization; we're a movement—a
            collective effort toward fostering a world where mental health is
            prioritized and accessible to all. Join us in this journey towards a
            mentally healthier tomorrow.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;