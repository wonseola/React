import styled from "styled-components";
import { List } from "./chat/roomlist";
import { Messages } from "./message";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom"
import { UserInfo } from "../components/aa";



const Div = styled.div`
    height:100%;
    width:80%;
    display: flex;
    align-items: center;
    justify-content:center;
    margin:auto;
    
`

const Wrapper = styled.div`
display: flex;
display: grid;
grid-template-columns: 1fr 3fr;
height:90%;
width:100%;
gap:20px;
background-color:white;
border-radius:10px;
padding: 20px;
box-shadow: 0px 0px 15px -2px #2d2b2b60;


`;



export const Layout = () => {

    const param = useParams();
    console.log(param);
    return (
        <Div>
            <Wrapper>
                <List />
                <Outlet />
            </Wrapper>
        </Div>
    )
}