import styled from "styled-components"
import { Chatcontent } from "./chat/chatview"
import { Chat } from "./chat/chatInput"


const Contents = styled.div`
display: flex;
flex-direction:column;
`

export const Messages = () => {

    return (
        <Contents>
            <Chatcontent />
            <Chat />
        </Contents>
    )
}