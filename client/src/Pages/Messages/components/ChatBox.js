import React from 'react';
import { css } from '@emotion/css';

const ChatBox = ({ props: { messages, sendMessage } }) => {
  return (
    <table className={chatBoxCss}>
      <thead>
        <tr>
          <th>sender</th>
          <th>time</th>
          <th>message</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <Message props={{ message }} key={message._id} />
        ))}
      </tbody>
    </table>
  );
};

const Message = ({ props: { message } }) => {
  return (
    <tr className='message'>
      <td>{message.name}</td>
      <td>
        {message._createdAt.toDateString()}
        {message._createdAt.toTimeString().slice(0, 9)}
      </td>
      <td>{message.content}</td>
    </tr>
  );
};

const chatBoxCss = css`
  width: 100%;
  background: black;
  color: white;
  th,
  td,
  tr {
    border: 1px solid white;
  }
`;

export default ChatBox;
