import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { ref, update, remove, set } from "firebase/database";
import { rtdb } from "../../firebase";
import { useParams } from "react-router-dom";

const Chatview = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const Bottom = styled.form`
  /* padding: 20px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: auto;
  background-clip: content-box;
  background-color: #0000001b;
  border-radius:0 0 10px 0 ;
`;

const Message = styled.input`
  flex: 1;
  border: none;
  outline: none;
  color: #000000;
  padding: 20px;
  border-radius: 10px;
  font-size: 16px;
  background-color: transparent;
`;

const Send = styled.button`
  background-color: tan;
  color: white;
  padding: 10px 20px;
  margin-right: 4%;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Emojii = styled.div`
  position: relative;
  cursor: pointer;
`;

const Picker = styled.div`
  position: absolute;
  bottom: 50px;
`;

const Icon = styled.img`
  width: 40px;
`;

interface Roomdata {
  createAt: number;
  room: string;
  user: string;
  message: string;
}

export const Chat = () => {
  const param = useParams();
  const id = param["*"];

  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState("");

  const handleEmoji = (event: any) => {
    setText((prev) => prev + event.emoji);
    setOpen(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setText("");
    const userName = localStorage.getItem("userName");
    const currentTime = Date.now();
    const roomRef = ref(rtdb, `rooms/${id}/message`);
    const newData: Roomdata = {
      createAt: currentTime,
      room: id || "",
      user: userName || "aa",
      message: text,
    };
    update(roomRef, { [currentTime]: newData })
  };


  useEffect(() => {
    const userName = localStorage.getItem("userName");

    if (userName) {
      const userRef = ref(rtdb, `rooms/${id}/roomonline/${userName}`);
      set(userRef, true)
        .then(() => {
          console.log(`${userName} joined the room.`);
        })
        .catch((error) => {
          console.error("Error joining the room: ", error);
        });
    }

    return () => {
      if (userName) {
        const roomRef = ref(rtdb, `rooms/${id}/roomonline/${userName}`);
        remove(roomRef)
          .then(() => {
            console.log(`${userName} left the room.`);
          })
          .catch((error) => {
            console.error("Error leaving the room: ", error);
          });
      }
    };
  }, [id]);

  return (
    <Chatview>
      <Bottom onSubmit={handleSend}>
        <Message
          type="text"
          placeholder="Type a message . . ."
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Emojii className="emoji">
          <Icon
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Grinning%20Face.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <Picker className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </Picker>
        </Emojii>
        <Send>Send</Send>
      </Bottom>
    </Chatview>
  );
};
