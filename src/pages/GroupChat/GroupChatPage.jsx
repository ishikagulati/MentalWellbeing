import React, { useState, useEffect } from 'react';
import './GroupChatPage.css'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs';
import Navbar from '../../components/Navbar/Navbar';

var stompClient = null;

const ChatApp = () => {
  const [connecting, setConnecting] = useState(true);
  const [messages, setMessages] = useState([]);
  const [GroupName, setGroupName] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    connected: false,
    message: ''
  });

  const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
  ];

  useEffect(() => {
    setGroupName(localStorage.getItem('GroupName'))
  }, [])

  //function to connect the user to the websocket server
  const connect = () => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = Client.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  //once the connection is established, add user to the chat
  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    console.log(userData)

    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send("/app/chat.addUser",
      {},
      JSON.stringify({ sender: userData.username, type: 'JOIN' })
    );

    setConnecting(false);
  };

  //error in connecting to the server
  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
  };

  //sending message to the chat
  const sendMessage = (event) => {
    if (stompClient) {
      var chatMessage = {
        sender: userData.username,
        content: userData.message,
        type: 'CHAT'
      };
      stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
    event.preventDefault();
  };

  //recieving the chat message
  const onMessageReceived = (payload) => {
    var message = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  //this function is used to get different avatar colors
  const getAvatarColor = (messageSender) => {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
      hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
  };

  const registerUser = (e) => {
    e.preventDefault();
    connect();
  }

  const handleUsername = (event) => {
    const { value } = event.target;
    console.log(value)
    setUserData({ ...userData, "username": value });
  }

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, "message": value });
  }

  return (
    <div className='chatpagecontainer'>
      <Navbar />

      {userData.connected && (
        <div id="chat-page">
          <div className="chat-container">
            <div className="chat-header">
              <h2>{GroupName}</h2>
            </div>
            <ul id="messageArea">
              {messages.map((message, index) => (
                <li key={index} className={message.type === 'JOIN' || message.type == 'LEAVE' ? 'event-message' : 'chat-message'}>
                  {message.type === 'JOIN' && (
                    <li>{message.sender} joined!</li>
                  )}
                  {message.type === 'LEAVE' && (
                    <li>{message.sender} left!</li>
                  )}
                  {message.type !== 'JOIN' && message.type !== 'LEAVE' && (
                    <>
                      <i style={{ backgroundColor: getAvatarColor(message.sender) }}>{message.sender[0]}</i>
                      <span>{message.sender}</span>
                    </>
                  )}
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
            <form onSubmit={sendMessage}>
              <div className="form-group">
                <div className="input-group clearfix">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    autoComplete="off"
                    className="form-control"
                    value={userData.message}
                    onChange={handleMessage}
                  />
                  <button type="submit" className="primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {!userData.connected && (
        <div class="username-page">
          <div className="username-page-container">
            <h2 className="title">Type your username to enter the Chatroom</h2>
            <form onSubmit={registerUser}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  className="form-control"
                  value={userData.username}
                  onChange={handleUsername}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="accent username-submit">Start Chatting</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default ChatApp;