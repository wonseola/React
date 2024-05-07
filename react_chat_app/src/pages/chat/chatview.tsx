import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../../firebase";

const Wrapper = styled.div`
    background-color:#fef9ec8e;
    overflow-y:scroll;
    max-height:700px;
    `;


const Textdiv = styled.div`
    display: flex;
    flex-direction: column-reverse; /* 역순으로 정렬 */
    overflow-y: auto; /* 내용이 넘치면 스크롤이 생기도록 */
    
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

    const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the bottom of the messages div

    useEffect(() => {
        // Textdiv가 업데이트될 때마다 스크롤을 맨 아래로 이동
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
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

                messages.sort((a, b) => a.createAt - b.createAt);
                setMessage(messages);
            } else {
                setMessage([]);
            }
        });
    }, [id]);

    return (
        <Wrapper className="message">
            <h2>참여중인 사람 : {onlineuser.join(", ")} </h2> {/* 로그아웃 테스트하이 */}

            {message.map((msg, index) => (
                <Textdiv key={index} ref={messagesEndRef}>
                    <Text>{msg.user}: {msg.message}</Text>
                </Textdiv>
            ))}

        </Wrapper>
    );
};
