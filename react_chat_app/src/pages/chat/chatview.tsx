import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../../firebase";

const Wrapper = styled.div`
    background-color:#fef9ec8e;
    overflow-y:scroll;
    max-height:700px;
    scroll-behavior: smooth;
    `;


const Textdiv = styled.div`
    display: flex;
    padding-top:5px;
    
`
const Text = styled.span`
`


export interface Roomdata {
    createAt: number;
    room: string;
    user: string;
    message: string;
}

interface Messages {
    createAt: number;
    message: string;
    user: string;
}


export const Chatcontent = () => {
    const [message, setMessage] = useState<Messages[]>([]);
    const [onlineuser, setOnlineuser] = useState<string[]>([]);

    const param = useParams();
    const id = param["*"];

    useEffect(() => {
        const chatRef = ref(rtdb, `rooms/${id}`);
        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data.roomonline) {
                const keys = Object.keys(data.roomonline);
                setOnlineuser(keys);
            }
        });
    }, [id]);

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollTop = endRef.current.scrollHeight;
        }
    }, [message]);

    useEffect(() => {
        const msgRef = ref(rtdb, `rooms/${id}/message`);
        onValue(msgRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messages: Messages[] = Object.entries(data).map(([createAt, message]: [string, any]) => ({
                    createAt: parseInt(createAt),
                    message: message.message,
                    user: message.user,
                }
                ));

                setMessage(messages);
            } else {
                setMessage([]);
            }
        });
    }, [id]);

    return (
        <Wrapper className="message" ref={endRef}>
            <h2>참여중인 사람 : {onlineuser.join(", ")} </h2>

            {message.map((msg, index) => (
                <Textdiv key={index} >
                    <Text>{msg.user}: {msg.message}</Text>
                </Textdiv>
            ))}

        </Wrapper>
    );

};
