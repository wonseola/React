import styled from "styled-components"
import EmojiPicker from "emoji-picker-react"
import { useState } from "react"
import { Loginuser } from "../../components/userInfo"


const Chatview = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    border-left:1px solid black;
`

const Bottom = styled.div`
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid black;
    gap: 20px;
    margin-top: auto;
`

const Message = styled.input`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.124);
    border: none;
    outline: none;
    color: #000000;
    padding: 20px;
    border-radius: 10px;
    font-size: 16px;
`

const Send = styled.button`
      background-color: tan;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const Emojii = styled.div`
      position: relative;
    cursor: pointer;
`

const Picker = styled.div`
  position: absolute;
  bottom: 50px;
`

const Top = styled.div`
      padding: 20px;
    flex: 1;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-x: hidden;
`

const Icon = styled.img`
  width:40px;
`

export const Chat = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState("");

  const handleEmoji = (event: any) => {
    // console.log(event);
    setText((prev) => prev + event.emoji);
    setOpen(false);
  }


  return (
    <Chatview>
      <Top>
        <div className="message">
          <Loginuser />
          <div className="messages">
            <p>asdfadfadfadfadfadsfadfad</p>
            <span>1 min ago</span>
          </div>
        </div>

      </Top>
      <Bottom>
        <Message type="text"
          placeholder="Type a message . . ."
          onChange={(event) => setText(event.target.value)}
          value={text}
        />
        <Emojii className="emoji">
          <Icon src="./emoji.png" alt=""
            onClick={() => setOpen(prev => !prev)} />
          <Picker className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </Picker>
        </Emojii>
        <Send>Send</Send>
      </Bottom>
    </Chatview>
  )

}