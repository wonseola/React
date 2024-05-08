import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { onValue, ref } from "firebase/database";
import { rtdb } from "../../firebase";

const Wrapper = styled.div`
    background-color:PapayaWhip;
    overflow-y:scroll;
    max-height:80vh;
    height: 80vh;
    scroll-behavior: smooth;
    border-radius:8px;
    box-shadow: 0px 0px 5px #44444438;
    margin-top:2%;
`;

const Textdiv = styled.div`
    display: flex;
    padding-top:5px;
    flex-direction:column;
    margin: 0 2% 0 2% ;
`;

const NickText = styled.p`
    font-size:18px;
`;

const MsgText = styled.span<{ ismine: string }>`
    display:inline-block;
    background-color:${(props) => (props.ismine === 'true' ? 'lightblue' : 'tan')};
    padding: 10px;
    align-self:${(props) => (props.ismine === 'true' ? 'flex-end' : 'flex-start')};
    border-radius:10px;
`;
const Nickarea = styled.div<{ ismine: string }>`
    width: 100px;
    align-self: ${(props) => (props.ismine === 'true' ? 'flex-end' : 'flex-start')};
    background-color: ${(props) => (props.ismine === 'true' ? 'lightblue' : 'tan')};
`;


interface Messages {
    createAt: number;
    message: string;
    user: string;
}

export const Chatcontent = () => {
    const [message, setMessage] = useState<Messages[]>([]);
    const [onlineuser, setOnlineuser] = useState<string[]>([]);
    const [roomId, setRoomId] = useState<string>('');

    const param = useParams();
    const id = param["*"];
    const nick = localStorage.getItem("userName") ?? '';

    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (id) setRoomId(id);
    }, [id]);

    useEffect(() => {
        if (!roomId) return;

        const chatRef = ref(rtdb, `rooms/${roomId}`);
        const unsub = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data?.roomonline) {
                const keys = Object.keys(data.roomonline);
                setOnlineuser(keys);
            }
        });
        return () => {
            unsub();
        };
    }, [roomId]);

    useEffect(() => {

        const msgRef = ref(rtdb, `rooms/${id}/message`);
        const unsub = onValue(msgRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messages: Messages[] = Object.entries(data).map(([createAt, message]: [string, any]) => ({
                    createAt: parseInt(createAt),
                    message: message.message,
                    user: message.user,
                })).sort((a, b) => a.createAt - b.createAt);

                setMessage(messages);

            } else {
                setMessage([]);
            }
        });
        return () => {
            unsub();
        };
    }, [roomId]);

    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollTop = endRef.current.scrollHeight;
        }
    }, [message]);

    return (
        <Wrapper className="message" ref={endRef}>
            <h2>참여중인 사람 : {onlineuser.join(", ")} </h2>

            {message.map((msg, index) => (
                <Textdiv key={index} >
                    <Nickarea ismine={msg.user === nick ? "true" : "false"} >
                        <NickText>{msg.user}</NickText>
                    </Nickarea>
                    {/* <span> &rarr; &nbsp;</span> */}
                    <MsgText ismine={msg.user === nick ? "true" : "false"}>{msg.message}</MsgText>
                </Textdiv>
            ))}
        </Wrapper>
    );
};