import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";

import TherapistsCard from "../../components/Therapists/TherapistsCard";
import classes from "../../components/Therapists/Therapists.module.css";
import therapist1 from "../../assets/TherapistsImages/therapist1.jpg";
import therapist2 from "../../assets/TherapistsImages/therapist2.jpg";
import therapist3 from "../../assets/TherapistsImages/therapist3.jpg";

const DATA = [
  {
    name: "Dr. Michael Chen",
    img: therapist1,
    designation: "Counseling Psychologist",
    details:
      "Drawing on over 20 years of experience, Dr. Chen specializes in depression management and LGBTQ+ issues, providing compassionate and inclusive care to foster emotional healing and self-discovery.",
  },
  {
    name: "Dr. Emily Watson",
    img: therapist2,
    designation: "Clinical Psychologist",
    details:
      "With 15+ years of experience, Dr. Watson specializes in anxiety disorders and trauma recovery, employing evidence-based practices to promote mental well-being and resilience in her clients.",
  },
  {
    name: "Dr. Rachel Adam",
    img: therapist3,
    designation: "Psychiatrist",
    details:
      "Rachel, with 8 years of experience, specializes in stress management and mindfulness practices, offering holistic support to individuals seeking personal growth, resilience, and emotional well-being.",
  },
];
function TherapistsPage() {
  return (
    <>
      <Navbar />
      <div className={classes.banner}>
        <div className={classes.bannerHeading}>
          <h1>Our Therapists </h1>
        </div>
      </div>
      <div className={classes.bodyText}>
        <p>
          Each of our therapists boasts over 5 years of expertise in addressing
          various mental health challenges. Proficient in Cognitive Behavioral
          Therapy (CBT) and an array of therapeutic methodologies, they bring a
          wealth of experience in online and offline counseling. Alongside
          traditional methods, they excel in alternative therapies and are adept
          at using augmented communication devices.
        </p>
        <p>
          {" "}
          Transparency is one of our top priorities. We believe in providing our
          clients with complete access to the credentials and competencies of
          our therapists, allowing you to thoroughly review their qualifications
          before scheduling a session. We understand that finding the right
          therapist is crucial for your needs, one who can cater to your
          specific requirements and provide you with the support and guidance
          you need.
        </p>
        <p>
          <strong>
            If you find a therapist isn't the right fit for your needs, you have
            the option to choose a different therapist for subsequent sessions.
          </strong>
        </p>
      </div>
      <div className={classes.therapistsWrapper}>
        {DATA.map((data) => (
          <TherapistsCard
            img={data.img}
            name={data.name}
            designation={data.designation}
            details={data.details}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default TherapistsPage;