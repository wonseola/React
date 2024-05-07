import styled from "styled-components"
import { useEffect, useState } from "react";
import { Createroom } from "../../components/createRoom";
import { Myinfo } from "../../components/userstate";
import { rtdb } from "../../firebase";
import { onValue, ref } from "firebase/database";
import { Logouticon } from "../../components/logout";
import { Link } from "react-router-dom";




const Wrapper = styled.div`

    display: grid;
    grid-template-rows: repeat(5, auto) 2fr ;
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

const RoomItem = styled.div<{ selected: boolean }>`
  margin: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
       
    }
    background-color: ${(props) => (props.selected ? "LightSalmon" : "transparent")};

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
    username: string;
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
                // console.log(roomData)
                if (roomData) {
                    const roomList: Room[] = Object.entries(roomData).map(([roomId, roomInfo]: [string, any]) => ({
                        id: roomId,
                        createAt: roomInfo.createAt,
                        name: roomInfo.room,
                        username: roomInfo.user,
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
                            <Linkto to={`/chat/${selectedRoom?.id}`}>
                                <RoomItem key={room.id}
                                    onClick={() => handleRoomItemClick(room)}
                                    selected={selectedRoom ? selectedRoom.id === room.id : false}
                                >
                                    {room.name}
                                </RoomItem>
                            </Linkto>

                        ))}
                    </RoomList>
                )}

            </Listwrapper>

            <Logouticon />


        </Wrapper>
    )
}