import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React from "react";
import "./Chat.css";
import firebase from "firebase";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [seed, setseed] = React.useState();
  const [message, setmessage] = React.useState("");
  const [roomName, setRoomName] = React.useState("");
  const [messages, setmessages] = React.useState([]);
  const { roomId } = useParams();
  const { user } = useStateValue();

  const handleChange = (e) => {
    setmessage(e.target.value);
  };
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setmessage("");
  };

  React.useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setmessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  let lastSent = new Date(
    messages[messages.length - 1]?.timestamp?.toDate()
  )?.toUTCString();

  React.useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        ></Avatar>
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at {lastSent === "Invalid Date" ? "..." : lastSent}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined></SearchOutlined>
          </IconButton>
          <IconButton>
            <AttachFile></AttachFile>
          </IconButton>
          <IconButton>
            <MoreVert></MoreVert>
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((record) => {
          return (
            <p
              className={`chat__message ${
                user.displayName === record.name && "chat__receiver"
              }`}
            >
              <span className="chat__name">{record.name}</span>
              {record.message}
              <span className="chat__timestamp">
                {new Date(record.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticon></InsertEmoticon>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            onChange={handleChange}
            value={message}
          ></input>
          <button type="submit">send message</button>
        </form>
        <Mic></Mic>
      </div>
    </div>
  );
}

export default Chat;
