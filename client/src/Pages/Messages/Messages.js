import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';
import { H, Level } from 'react-accessible-headings';
import axios from 'axios';
import { connect } from 'react-redux';

const Messages = ({ token }) => {
  const [messages, setMessages] = useState([
    {
      _id: '11111',
      name: 'rick',
      sender: '123',
      reciever: '234',
      content: 'hello',
      _createdAt: new Date(),
    },
  ]);
  useEffect(() => {
    axios.get('/api/messages', { headers: { 'x-auth-token': token } });
  });
  const sendMessage = (post) => {
    axios
      .post('/api/messages', { post }, { headers: { 'x-auth-token': token } })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <>
      <H>Messages</H>
      <Level>
        <ChatBox props={{ sendMessage, messages }} />
      </Level>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(Messages);
