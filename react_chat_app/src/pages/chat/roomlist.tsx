import styled from "styled-components"
import { useEffect, useState } from "react";
import { Createroom } from "../../components/createRoom";
import { Myinfo } from "../../components/userstate";
import { rtdb } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Logouticon } from "../../components/logout";
import { Link } from "react-router-dom";
import UserList from "../../components/onlineUser";




const Wrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(5, auto) 2fr ;
    background-color:Cornsilk;
    height:90vh;
    padding: 5%;
    border-radius:10px;
`

const Icon = styled.img`
    width: 30px;
    height: 30px;
`

const Top = styled.div`
    display: flex;
    justify-content:space-between;
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
  border: 1px solid darkgoldenrod;
  border-radius: 5px;
  cursor: pointer;

`;

const RoomList = styled.div`
    overflow-x:scroll;
    /* background-color:gold; */
    max-height:60vh;
    height: 60vh;
    
`

const Linkto = styled(Link)`
  text-decoration: none;
  max-width:100%;
  color:black;
`;



interface Room {
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
        setSelectedRoom(null);
    }, [selectedRoom]);

    useEffect(() => {
        const fetchRooms = async () => {
            const roomsRef = ref(rtdb, 'rooms/');
            onValue(roomsRef, (snapshot) => {
                const roomData = snapshot.val();
                if (roomData) {
                    const roomList: Room[] = Object.entries(roomData).map(([roomId, roomInfo]: [string, any]) => ({
                        id: roomId,
                        createAt: roomInfo.createAt,
                        name: roomInfo.room,
                    }));
                    const sortedRooms = roomList.sort((a, b) => b.createAt - a.createAt);
                    setRooms(sortedRooms);
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
                        src={addMode ?
                            "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Minus.png" : "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Plus.png"}
                        alt=""
                        className="add"
                        onClick={() => setAddMode((prev) => !prev)}
                    />
                </div>
            </Top>

            <Listwrapper>

                {addMode ? (
                    <>
                        <Createroom onSubmit={() => setAddMode(false)} />
                    </>
                ) : (
                    <RoomList>
                        {rooms.map((room) => (
                            <Linkto key={room.id} to={`/chat/${room.id}`}>
                                <RoomItem
                                    onClick={() => handleRoomItemClick(room)}
                                >
                                    {room.name}
                                </RoomItem>
                            </Linkto>
                        ))}
                    </RoomList>
                )}

            </Listwrapper>
            <UserList />
            <Logouticon />

        </Wrapper>
    )
}