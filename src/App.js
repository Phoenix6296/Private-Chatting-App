import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [userInput, setUserInput] = useState('');//User Input State
  const [messages, setMessages] = useState([]);//Submit state of the message in the form of the objects.
  const [username, setUsername] = useState('');

  //Setting up FireBase Listener:SnapShot is a FireBase Listener
  useEffect(() => {
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
    })
  }, [])

  //When useEffect dependencies are empty, in defalut it will only run once when the page reloads.„

  useEffect(() => {
    setUsername(prompt("Enter the user Name : "));
  }, [])

  //Pushing new message to the end of the previous array of messages.Eg:['1','2','3'].
  const sendMessages = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: userInput,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setUserInput('');
  };
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png" />
      {/* <h1>Facebook Messenger Clone🚀</h1> */}
      <h2 className="app-h2">Welcome, {username}</h2>
      <hr />
      <form className="app-form">
        <FormControl className="app-formControl">
          <Input className="app-iconInput" placeholder="Enter a message" value={userInput} onChange={event => setUserInput(event.target.value)} />
          <IconButton className="app-iconButton" disabled={!userInput} type="submit" variant="contained" color="secondary" onClick={sendMessages}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/* Iterating thorugh the messages using map function */}
      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

    </div >
  );
}

export default App;