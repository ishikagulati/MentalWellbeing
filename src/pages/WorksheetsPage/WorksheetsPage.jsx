import React from "react";
import WorksheetCard from "../../components/WorksheetsPage/WorksheetsCard";
import classes from "../../components/WorksheetsPage/WorksheetsCard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";

// import worksheets from "../../worksheets.json";
// import image from "../../assets/blogImage.jpg"
import one from "../../assets/WorksheetsImgs/challenging negative thoughts.jpg";
import two from "../../assets/WorksheetsImgs/coping-skills-for-depression.jpg";
import three from "../../assets/WorksheetsImgs/decatastrophising.jpg";
import four from "../../assets/WorksheetsImgs/goal breakdown.jpg";
import five from "../../assets/WorksheetsImgs/goals exploration.jpg";
import six from "../../assets/WorksheetsImgs/gratitude exercises.jpg";
import seven from "../../assets/WorksheetsImgs/gratitude journaling.jpg";
import eight from "../../assets/WorksheetsImgs/letter to my past self.jpg";
import nine from "../../assets/WorksheetsImgs/self-care.jpg";
import ten from "../../assets/WorksheetsImgs/self esteem journal.jpg";
import eleven from "../../assets/WorksheetsImgs/sleep-diary.jpg";
import twelve from "../../assets/WorksheetsImgs/thought log.jpg";
import thirteen from "../../assets/WorksheetsImgs/mindfullness.jpg";
import fourteen from "../../assets/WorksheetsImgs/life story.jpg";
import fifteen from "../../assets/WorksheetsImgs/strengths weaknesses.jpg";

function WorksheetsPage() {
  return (
    <>
      <Navbar />
      <div className={classes.bodyText}>
        <div className={classes.banner}>
          <div className={classes.bannerHeading}>
            <h1>Free Printable Worksheets </h1>
          </div>
        </div>

        <h3>Explore and Empower Yourself!</h3>
        <p>
          Our free resources are designed to provide valuable tools and guidance
          to enhance your self-care practices and promote positive mental
          health.
        </p>
        <p>
          Discover a range of thoughtfully curated worksheets aimed at nurturing
          various aspects of mental health. Whether you're seeking strategies to
          manage stress, enhance self-awareness, or cultivate resilience, our
          collection of worksheets offers practical exercises and insights to
          guide you on your path to emotional wellness.
        </p>
        <br />
        <p>
          <strong>
            Download, print, and fill them up as you engage in meaningful
            self-reflection and growth, empowering yourself with each worksheet.
          </strong>
        </p>
      </div>
      <div className={classes.worksheetsWrapper}>
        {worksheets.map((worksheet) => (
          <>
            {console.log(worksheet.pdf)}
            <WorksheetCard
              key={worksheet.id}
              id={worksheet.id}
              image={worksheet.image}
              title={worksheet.title}
              content={worksheet.content}
              pdf={worksheet.pdf}
            />
          </>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default WorksheetsPage;

const worksheets = [
  {
    id: 1,
    image: one,
    title: "Challenging Negative Thoughts",
    content:
      "Techniques to question and reframe negative thoughts, fostering a positive mindset.",
    pdf: "/pdfs/challenging-negative-thoughts.pdf",
  },
  {
    id: 2,
    image: two,

    title: "Coping Skills for Depression",
    content:
      "Effective coping mechanisms to manage symptoms and improve daily life with depression.",
    pdf: "/pdfs/coping-skills-depression.pdf",
  },
  {
    id: 3,
    image: three,

    title: "De-Catastrophizing",
    content:
      "Methods to reduce catastrophic thinking, promoting a more balanced perspective.",
    pdf: "/pdfs/decatastrophizing.pdf",
  },
  {
    id: 4,
    image: four,
    title: "Goal Breakdown",
    content:
      "Breaking down long-term goals into manageable steps for progress in depression management.",
    pdf: "/pdfs/goal-breakdown.pdf",
  },
  {
    id: 5,
    image: five,
    title: "Goal Exploration",
    content:
      "Discovering and setting meaningful goals aligned with managing depression effectively.",
    pdf: "/pdfs/goal-exploration.pdf",
  },
  {
    id: 6,
    image: six,
    title: "Gratitude Exercises",
    content:
      "Practices that cultivate gratitude, aiding in alleviating depressive symptoms.",
    pdf: "/pdfs/gratitude-exercises.pdf",
  },
  {
    id: 7,
    image: seven,
    title: "Gratitude Journaling",
    content:
      "Creating a journal to document daily gratitude, enhancing mental well-being.",
    pdf: "/pdfs/gratitude-journal.pdf",
  },
  {
    id: 8,
    image: eight,
    title: "Letter to My Past Self",
    content:
      "Writing a compassionate letter to oneself, acknowledging growth and resilience.",
    pdf: "/pdfs/letter-to-my-past-self.pdf",
  },
  {
    id: 9,
    image: nine,
    title: "Self Care Assessment",
    content:
      "Assessing and developing a personalized self-care plan for managing depression.",
    pdf: "/pdfs/self-care-assessment.pdf",
  },
  {
    id: 10,
    image: ten,
    title: "Self Esteem Journal",
    content:
      "Techniques and prompts to boost self-esteem and confidence in depression management.",
    pdf: "/pdfs/self-esteem-journal.pdf",
  },
  {
    id: 11,
    image: eleven,
    title: "Sleep Diary",
    content:
      "Tracking sleep patterns and habits to improve sleep quality in depression.",
    pdf: "/pdfs/sleep-diary.pdf",
  },
  {
    id: 12,
    image: twelve,
    title: "Thought Log",
    content:
      "Recording thoughts and emotions to identify patterns and manage depressive symptoms.",
    pdf: "/pdfs/thought-log.pdf",
  },
  {
    id: 13,
    image: thirteen,
    title: "Mindfulness Exercises",
    content:
      "Practical mindfulness exercises to cultivate awareness and reduce stress in daily life.",
    pdf: "/pdfs/mindfulness-exercises.pdf",
  },
  {
    id: 14,
    image: fourteen,
    title: "Life Story",
    content:
      "Exploring one's life journey and experiences as a therapeutic method for mental health.",
    pdf: "/pdfs/life-story.pdf",
  },
  {
    id: 15,
    image: fifteen,
    title: "My Strengths and Weaknesses",
    content:
      "Self-reflection on personal strengths and weaknesses for self-awareness and growth.",
    pdf: "/pdfs/my-strengths-and-qualities.pdf",
  },
];