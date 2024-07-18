import React, { useEffect } from 'react'
import { useState } from 'react';
import '../../styles/Groupdesc.css'
import { FaComment } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { formatISO9075, formatISO } from 'date-fns';
import { differenceInMinutes, formatDistanceToNow } from 'date-fns';
import { uid } from 'uid';
import { IoSend } from "react-icons/io5";

const GroupPosts = () => {
  const [postHistory, setPostHistory] = useState([]);
  const [liked, setLiked] = useState(false);

  const [postDetails, setpostDetails] = useState({
    postID: '',
    username: localStorage.getItem('name'),
    content: '',
    timestamp: '',
    likes: 0,
    isLiked: false,
    opencomments: false,
    visibleComments: 0
  });
  
  const [commentDetails, setCommentDetails] = useState({
    username: localStorage.getItem('name'),
    content: '',
    timestamp: '',
  })
  
  const id = useParams();

  const sortedPosts = postHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const formatTimestamp = (timestamp) => {
    const difference = differenceInMinutes(new Date(), new Date(timestamp));
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // Update Post Likes
  const handleIconClick = async (postId) => {
    setLiked(prevstate => !prevstate);
    try {
      const response = await fetch(`http://localhost:8080/groups/updatePostLikes/${id.id}`, {
        method: 'PUT',
        crossDomain: true,
        body: JSON.stringify(postId),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          "Liked": !liked
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error!');
    }
  };

  function handleUserInputChange(e) {
    const { value } = e.target;
    setpostDetails({
      ...postDetails,
      "content": value,
      "postID": uid(16)
    });
  }

  // Add group Posts
  const handlesubmit = async () => {
    const response = await fetch(`http://localhost:8080/groups/addPost/${id.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ "postID": postDetails.postID, "username": postDetails.username, "content": postDetails.content, "timestamp": formatISO9075(new Date()), "likes": postDetails.likes }),
    });
    fetchData();
  }

  // Fetch Group Posts
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/groups/getPosts/${id.id}`, {
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          "MyDate": formatISO(new Date(), { representation: 'date' })
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json()
        .then((data) => {
          setPostHistory(data)
        })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  function handlepostcommentchange(e) {
    const { value } = e.target;
    setCommentDetails({
      ...commentDetails,
      "content": value,
    })
  }

  // Open Comments
  const handleopencomments = async (postId) => {
    const updatedPostHistory = postHistory.map(post => {
      if (post.postID === postId) {
        return {
          ...post,
          opencomments: !post.opencomments,
          visibleComments: 3 // Toggle the like status
        };
      }
      return post;
    });

    setPostHistory(updatedPostHistory);
  }

  // Add comments API
  const handlecommentpost = async (postId) => {
    const response = await fetch(`http://localhost:8080/groups/addComment/${id.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        "postID": postId,
      },
      body: JSON.stringify({ "username": commentDetails.username, "content": commentDetails.content, "timestamp": formatISO9075(new Date()) }),
    });
    fetchData();
  }

  const loadMoreComments = async (postId) => {
    const updatedPostHistory = postHistory.map(post => {
      if (post.postID === postId) {
        return {
          ...post,
          visibleComments: post.visibleComments + 3,
        };
      }
      return post;
    });

    setPostHistory(updatedPostHistory);
  };

  const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  return (
    <div>
      <div className="grppostcontainer">
        <div className="newpostcontainer">
          <span id='postheading'>Join the Conversation: Where Thoughts Take Flight and Ideas Find Home! 🚀✨  #CommunityChatter</span>
          <span>Share your stories, coping mechanisms or just anything that you feel like sharing!</span>
          <textarea value={postDetails.content} onChange={handleUserInputChange} type="text" name='content' placeholder='Enter your post...' required />
          <span id='postbutton'><button onClick={handlesubmit}>Post</button></span>
        </div>
        {sortedPosts.length !== 0 ? (
          <div className="allpostscontainer">
            {sortedPosts.map((entry, index) => (
              <div key={index} className="postcontainer">
                <div className="postheader">
                  <div className="postimg">
                    <i style={{ backgroundColor: getAvatarColor(entry.username) }}>{entry.username[0]}</i>
                  </div>
                  <div className="postname">
                    <div className="postusername">{entry.username}</div>
                    <div className="postTime">{formatTimestamp(entry.timestamp)}</div>
                  </div>
                </div>
                <p>{entry.content}</p>
                <div className="likecomment">
                  <span>
                    <div class="heart-container" title="Like">
                      <input type="checkbox" class="checkbox" id="Give-It-An-Id" onClick={() => handleIconClick(entry.postID)} />
                      <div class="svg-container">
                        <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                          </path>
                        </svg>
                        <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                          </path>
                        </svg>
                        <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="10,10 20,20"></polygon>
                          <polygon points="10,50 20,50"></polygon>
                          <polygon points="20,80 30,70"></polygon>
                          <polygon points="90,10 80,20"></polygon>
                          <polygon points="90,50 80,50"></polygon>
                          <polygon points="80,80 70,70"></polygon>
                        </svg>
                      </div>
                      <span>{entry.likes}</span>
                    </div>
                  </span>
                  <span id="commenticon" onClick={() => handleopencomments(entry.postID)}><FaComment color='grey' size={23} /> {entry.comments != null ? (entry.comments.length == 1 ? (`${entry.comments.length} comment`) : (`${entry.comments.length} comments`)) : ('0 comments')} </span>
                </div>
                {entry.opencomments && (
                  <div className='comments-part'>

                    <h3>Comments</h3>
                    <div className="commentscontainer">
                      {entry.comments != null ? (
                        <>
                          {entry.comments.slice(0, entry.visibleComments).map((comment, index) => (
                            <div className='onecommentcontainer' key={index}>
                              <div className="postimg">
                              <i style={{ backgroundColor: getAvatarColor(comment.username) }}>{comment.username[0]}</i>
                              </div>
                              <div className="commentheader">
                                <div className="postname">
                                  <div className="postusername">{comment.username}</div>
                                  <div className="postTime">{formatTimestamp(comment.timestamp)}</div>
                                </div>
                                <div className="commentcontent"><p>{comment.content}</p></div>
                              </div>
                            </div>
                          ))}

                          {entry.visibleComments < entry.comments.length ? (
                            <>
                              <div className="loadmorecomments">
                                <button onClick={() => loadMoreComments(entry.postID)}>Load more comments</button>
                              </div>
                            </>
                          ) : (<></>)}
                        </>
                      ) : (<></>)}
                    </div>
                    <div className="commentInput">
                      <input
                        type='text'
                        placeholder="Add a comment"
                        onChange={handlepostcommentchange}
                        name='content'
                        required
                      />
                      <button onClick={() => handlecommentpost(entry.postID)}><IoSend size={20} color='grey'/></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
          </>
        )}
      </div>
    </div>
  )
}

export default GroupPosts