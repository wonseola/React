import styled from "styled-components"
import { useEffect, useState } from "react";
import { Createroom } from "../../components/createRoom";
import { Myinfo } from "../../components/userstate";
import { rtdb } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Logouticon } from "../../components/logout";
import { Link, useNavigate } from "react-router-dom";


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


export interface Room {
    id: string;
    name: string;
    createAt: number;
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
                    const roomList = Object.keys(roomData).map((room, time) => ({
                        name: room,
                        createAt: time,
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
                    <div>
                        {rooms.map((room) => (
                            <RoomItem key={room.name}
                                onClick={() => handleRoomItemClick(room)}
                            >
                                {room.name}
                            </RoomItem>
                        ))}
                    </div>
                )}
                <Link to={`/chat/${selectedRoom?.createAt}`}>

                    <button>asdf</button></Link>
            </Listwrapper>

            <Logouticon />
            <div>
                {selectedRoom && (
                    <div>
                        <p>방 name: {selectedRoom.name}</p>
                        <p>방 Id: {selectedRoom.createAt}</p>
                    </div>
                )}
            </div>


        </Wrapper>
    )
}