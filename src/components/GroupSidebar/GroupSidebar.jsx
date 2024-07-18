import React, { useState, useEffect } from 'react'
import GroupAbout from '../GroupDescComponents/GroupAbout';
import GroupEvents from '../GroupDescComponents/GroupEvents';
import GroupReviews from '../GroupDescComponents/GroupReviews';
import '../../styles/Groupdesc.css'
import { useParams } from 'react-router-dom';
import GroupPosts from '../GroupDescComponents/GroupPosts';
import GroupChat from '../GroupDescComponents/GroupChat';
import GroupPhotos from '../GroupDescComponents/GroupPhotos';

const GroupSidebar = ({ componentHandler, member, admin }) => {
  const [active, setActive] = useState('GroupAbout');
  const [isMember, setMember] = useState(true);
  const [about, setAbout] = useState('');
  const [Admin, setAdmin] = useState(false);
  const id = useParams();

  useEffect(() => {
    if (member) {
      setMember(true)
    } else {
      setMember(false)
    }
  }, [member]);

  useEffect(() => {
    if (admin) {
      setAdmin(true)
    } else {
      setAdmin(false)
    }
  }, [admin]);

  // Fetch Group Details
  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      fetch(`http://localhost:8080/groups/${id.id}`, {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setAbout(data.about);
        });
    }
  }, []);

  return (
    <div className='groupelements'>
          <ul>
            <li onClick={() => { componentHandler(<GroupAbout data={about} />); setActive('GroupAbout') }} className={` ${active === 'GroupAbout' ? `` : ''}`}>
              About
            </li>

            <li onClick={() => { componentHandler(<GroupEvents admin={Admin} />); setActive('Plan') }} className={` ${active === 'Plan' ? `` : ''}`}>
              Events
            </li>

            <li onClick={() => { componentHandler(<GroupReviews />); setActive('MoodTracker') }} className={` ${active === 'MoodTracker' ? `` : ''}`}>
              Reviews
            </li>
            {isMember && (
              <>
                <li onClick={() => { componentHandler(<GroupPosts />); setActive('GroupAbout') }} className={` ${active === 'GroupAbout' ? `` : ''}`}>
                  Posts
                </li>

                <li onClick={() => { componentHandler(<GroupChat />); setActive('Plan') }} className={` ${active === 'Plan' ? `` : ''}`}>
                  Group Chat
                </li>

                <li onClick={() => { componentHandler(<GroupPhotos />); setActive('MoodTracker') }} className={` ${active === 'MoodTracker' ? `` : ''}`}>
                  Photos
                </li>
              </>
            )}
            {!isMember && Admin && (
              <>
                <li onClick={() => { componentHandler(<GroupPosts />); setActive('GroupAbout') }} className={` ${active === 'GroupAbout' ? `` : ''}`}>
                  Posts
                </li>

                <li onClick={() => { componentHandler(<GroupChat />); setActive('Plan') }} className={` ${active === 'Plan' ? `` : ''}`}>
                  Group Chat
                </li>

                <li onClick={() => { componentHandler(<GroupPhotos />); setActive('MoodTracker') }} className={` ${active === 'MoodTracker' ? `` : ''}`}>
                  Photos
                </li>
              </>
            )}
          </ul>    
    </div>
  )
}

export default GroupSidebar
