import React from 'react'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

const GroupEvents = ({ admin }) => {
  const [Admin, setAdmin] = useState(false);

  const steps = ['1', '2', '3', '4']
  const Queue = Swal.mixin({
    progressSteps: steps,
    confirmButtonText: 'Next >',
    // optional classes to avoid backdrop blinking between steps
    showClass: { backdrop: 'swal2-noanimation' },
    hideClass: { backdrop: 'swal2-noanimation' },
  })

  useEffect(() => {
    if (admin) {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [admin]);


  function HandleAddEvent() {
    (async () => {
      await Queue.fire({
        title: 'Enter title of the event',
        html: `<input type="text" id="title" class="swal2-input" placeholder="title of the event" required>`,
        currentProgressStep: 0,
      })
      await Queue.fire({
        title: 'Enter day of the event',
        html: `<input type="date" id="date" class="swal2-input" required>`,
        currentProgressStep: 1,
      })
      await Queue.fire({
        title: 'Enter time of the event',
        html: `<input type="time" id="date" class="swal2-input" required>`,
        currentProgressStep: 2,
      })
      await Queue.fire({
        title: 'Enter location of the event',
        html: `
        <select class="swal2-select name="cars" id="cars">
        <option value="chat">MindWell Group Chat</option>
        <option value="live">Youtube Live</option>
        <option value="meet">Meet/Zoom/Teams</option>
        <option value="other">other</option>
        </select>
        `,
        currentProgressStep: 3,
        confirmButtonText: 'OK',
      })
      await Queue.fire({
        icon: 'success',
        title: 'Your Event will be added soon!',
        text: 'Till then you can make a post on the community page and let all the members know about it.',
        confirmButtonText: 'OK',
      })
    })()
  }

  return (
    <div>
      {Admin ?
        <>
          <div className="eventbutton">
            <button onClick={HandleAddEvent}>Add Event</button>
          </div>
          <div className='grpeventscontainer'>
            <h1>Coming Soon</h1>
            <h3>There are no events yet!</h3>
          </div>
        </>
        :
        <>
          <div className='grpeventscontainer'>
            <h1>Coming Soon</h1>
            <h3>There are no events yet!</h3>
          </div>
        </>
      }
    </div>
  )
}

export default GroupEvents