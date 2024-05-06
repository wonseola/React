import styled from "styled-components"
import { Chatcontent } from "./chat/chatview"
import { Chat } from "./chat/chatInput"


const Contents = styled.div`
display: grid;
grid-template-rows: 1fr auto;
padding-left: 20px;
border-left:solid 1px black;
`

export const Messages = () => {

    return (
        <Contents>
            <Chatcontent />
            <Chat />
        </Contents>
    )
}