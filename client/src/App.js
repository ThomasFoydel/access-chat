import React, { useEffect, useRef } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Level } from 'react-accessible-headings';
import NavBar from 'Components/NavBar/NavBar';
import Messages from 'Pages/Messages/Messages';
import io from 'socket.io-client';
import './App.css';
import { connect } from 'react-redux';
import { newMessage } from 'redux/message/actions';
function App({ token }) {
  let socketRef = useRef(null);

  useEffect(() => {
    let subscribed = true;

    if (token) {
      const urlBase =
        process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000/';
      const ENDPOINT = urlBase + `?token=${token}`;
      socketRef.current = io(ENDPOINT, {
        transports: ['websocket', 'polling', 'flashsocket'],
      });
      if (subscribed)
        socketRef.current.on('chat-message', (message) => newMessage(message));
    }
    return () => {
      subscribed = false;
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.off();
      }
    };
  }, [token, newMessage]);

  return (
    <div className='App'>
      <NavBar />
      <Switch>
        <Level>
          <Route path='/messages' component={Messages} />
        </Level>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({ token: state.auth.token });
const mapDispatchToProps = (dispatch) => ({
  newMessage: (message) => dispatch(newMessage(message)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
