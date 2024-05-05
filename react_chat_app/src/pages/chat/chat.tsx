import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { Chatview } from "../../components/chatview";

export interface Message {
  text: string;
  senderId: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}

export const Chat = () => {

  const [chatRoomName, setChatRoomName] = useState<string>('');
  const [chatRoomId, setChatRoomId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    if (chatRoomId) {
      unsubscribe = listenToMessagesInChatRoom(chatRoomId, (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatRoomId]);


  const handleCreateChatRoom = async () => {
    const createdChatRoomId = await createChatRoom(chatRoomName);
    setChatRoomId(createdChatRoomId);
  };
  const getChatRoomByName = async (name: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'chatRooms'));
      const rooms: any[] = [];
      querySnapshot.forEach((doc) => {
        const room = { id: doc.id, ...doc.data() };
        rooms.push(room);
      });
      const foundRoom = rooms.find(room => room.name === name);
      return foundRoom;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const handleEnterChatRoom = async () => {
    const roomData = await getChatRoomByName(chatRoomName);
    if (roomData) {
      setChatRoomId(roomData.id);
    } else {
      console.error("Chat room not found!");
    }
  };




  async function createChatRoom(chatRoomName: string): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'chatRooms'), {
        name: chatRoomName
      });
      console.log("채팅방 생성 성공:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
      return '';
    }
  }



  function listenToMessagesInChatRoom(chatRoomId: string, callback: (message: any) => void): () => void {
    const q = query(collection(doc(db, 'chatRooms', chatRoomId), 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const message = change.doc.data() as Message;
          callback(message);
        }
      });
    });
    return unsubscribe;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="채팅방 이름"
        value={chatRoomName}
        onChange={(e) => setChatRoomName(e.target.value)}
      />
      <button onClick={handleCreateChatRoom}>채팅방 생성</button>


      <input
        type="text"
        placeholder="채팅방 이름"
        value={chatRoomName}
        onChange={(e) => setChatRoomName(e.target.value)}
      />
      <button onClick={handleEnterChatRoom}>채팅방 입장</button>
      <Chatview chatRoomId={chatRoomId} messages={messages} setMessages={setMessages} />

    </div>
  )
}
