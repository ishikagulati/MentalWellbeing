import React from 'react'
import { useNavigate } from 'react-router-dom'

const GroupChat = () => {
  const navigate = useNavigate();

  function handlejoinchat() {
    navigate('/chat');
  }

  return (
    <div>
      <div className="grpchatcontainer">
        <h2 id='grpchatheading'>Welcome to Our Supportive Community Chat Room!</h2>
        <p>At MindWell, we understand the importance of connection and the power of shared experiences. Our group chat room is a dedicated space for members to come together, offering a virtual haven for support, encouragement, and understanding.</p>
        <h2>🌟 Why Join Our Chat Room?</h2>
        <ol>
          <li><span>Instant Connection:</span> Engage in real-time conversations with individuals who genuinely understand what you're going through. Our chat room provides a space for immediate connection and support.</li>
          <li><span>Anonymity and Privacy:</span> Feel free to express yourself openly and honestly. Our platform prioritizes your privacy, allowing you to share as much or as little as you're comfortable with.</li>
          <li><span>Diverse Perspectives:</span> Our community is made up of individuals from various backgrounds and experiences. Gain insights and perspectives from others who may have faced similar challenges, fostering a sense of camaraderie.</li>
          <li><span>Supportive Environment: </span>Our chat room is a judgment-free zone. Whether you're seeking advice, venting, or simply looking for a listening ear, you'll find compassion and understanding from fellow community members.</li>
        </ol>
        <div className="joinchatbutton">
          <button onClick={handlejoinchat}>Join Chat Room</button>
        </div>
      </div>
    </div>
  )
}

export default GroupChat