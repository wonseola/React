import styled from "styled-components";
import { Chat } from "./chatInput";


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr;
`


export const Rooms1 = () => {


    return (
        <Wrapper>
            <Chat />
        </Wrapper>
    );
}