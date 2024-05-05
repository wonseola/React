import { useState } from "react";
import { Message } from "../pages/chat/chat";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

interface ChatviewProps {
    chatRoomId: string;
    messages: Message[];
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}


export const Chatview: React.FC<ChatviewProps> = ({ chatRoomId, messages, setMessages }) => {
    const [messageText, setMessageText] = useState<string>('');

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        const name = localStorage.getItem("userName") || "익명";
        const userId = name;
        await sendMessageToChatRoom(chatRoomId, messageText, userId);
        setMessageText('');
    };


    async function sendMessageToChatRoom(chatRoomId: string, messageText: string, userId: string): Promise<void> {
        try {
            await addDoc(collection(doc(db, 'chatRooms', chatRoomId), 'messages'), {
                text: messageText,
                senderId: userId,
                timestamp: serverTimestamp(),
            });
            console.log("메시지가 성공적으로 전송되었습니다.");
        } catch (error) {
            console.error("메시지 전송 중 오류가 발생했습니다.", error);
        }
    }
    return (
        <>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="메시지 입력"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button>메시지 전송</button>
            </form>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.text}</p>
                        <p>{message.senderId}</p>
                        {/* <p>{message.timestamp && new Date(message.timestamp.seconds * 1000).toLocaleString()}</p> */}
                        <p>{message.timestamp?.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </>
    )
}