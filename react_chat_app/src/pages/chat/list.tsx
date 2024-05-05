import styled from "styled-components"
import { Chat } from "./chatInput"
import { useState } from "react";
import { Createroom } from "../../components/createRoom";


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr;
`

const Icon = styled.img`
    width: 40px;
    height: 40px;
`

const Top = styled.div`
    display: flex;
    justify-content:space-between;
    margin:3%;
    background-color:pink;
`

const Name = styled.h1`
    font-size:120%;
`


export const List = () => {

    const [addMode, setAddMode] = useState<boolean>(false);


    return (
        <Wrapper>
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

            <Chat />
            <div>
                {addMode && <Createroom />}
            </div>
            <div>

            </div>
        </Wrapper>
    )
}