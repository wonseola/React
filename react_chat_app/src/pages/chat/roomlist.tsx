import styled from "styled-components"
import { useEffect, useState } from "react";
import { Createroom } from "../../components/createRoom";
import { Myinfo } from "../../components/userstate";
import { rtdb } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Link } from "react-router-dom";


const Wrapper = styled.div`

    display: grid;
    grid-template-rows: repeat(2, auto) 10fr ;
`

const Icon = styled.img`
    width: 30px;
    height: 30px;



`

const Top = styled.div`
    display: flex;
    justify-content:space-between;
    margin:3%;
`

const Name = styled.h1`
    font-size:120%;
`

const Listwrapper = styled.div`
    /* background-color:tan; */
`

const RoomItem = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`;


interface Room {
    id: string;
    name: string;
}

export const List = () => {

    const [addMode, setAddMode] = useState<boolean>(false);
    const [rooms, setRooms] = useState<Room[]>([]);

    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

    const handleRoomItemClick = (room: Room) => {
        setSelectedRoom(room);
    };
    useEffect(() => {
        const fetchRooms = async () => {
            const roomsRef = ref(rtdb, 'rooms/');
            onValue(roomsRef, (snapshot) => {
                const roomData = snapshot.val();
                if (roomData) {
                    const roomList = Object.keys(roomData).map((room) => ({
                        name: room,
                        ...roomData[room],
                    }));
                    setRooms(roomList);
                }
            });
        };
        fetchRooms();
    }, []);


    return (
        <Wrapper>
            <Myinfo />
            <Top>
                <Name>방 목록</Name>
                <div>
                    <Icon
                        src={addMode ? "./minus.png" : "./plus.png"}
                        alt=""
                        className="add"
                        onClick={() => setAddMode((prev) => !prev)}
                    />
                    <h1></h1>
                </div>
            </Top>

            <Listwrapper>

                {addMode ? (
                    <>
                        <Createroom onSubmit={() => setAddMode(false)} />
                    </>
                ) : (
                    <div>{rooms.map((room) => (
                        <RoomItem key={room.id} onClick={() => handleRoomItemClick(room)}>{room.id}</RoomItem>
                    ))}</div>
                )}
            </Listwrapper>

            <div>
                <h2>선택된 방 정보:</h2>
                {selectedRoom && (
                    <div>
                        <p>방 name: {selectedRoom.name}</p>
                        <Link to={`/rooms/${selectedRoom.id}`}>방으로 이동</Link>
                    </div>
                )}
            </div>


        </Wrapper>
    )
}