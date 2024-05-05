import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loginuser } from "../../components/loginuser";
import { auth, db } from "../../firebase";
import { useEffect } from "react";
import { deleteField, doc, updateDoc } from "firebase/firestore";


const Div = styled.div`
    height:100%;
    display: flex;
    align-items: center;
    margin:auto;
`

const Wrapper = styled.div`
display: grid;
grid-template-columns: 1fr 13fr;
height:90%;
gap:20px;
background-color:white;
background-color:#a7aedd89;
`;

const Menu = styled.div`
display: flex;
flex-direction:column;
align-items:center;
gap:10px;
padding-top:20px;
border-right:1px solid black;
`;

const Linkto = styled(Link)`
  text-decoration: none;
  max-width:100%;
`;

const MenuItem = styled.div`
cursor: pointer;
display:flex;
justify-content:flex-start;
align-items:center;
height:50px;
width:100px;
max-width:100%;
padding-left: 20px; 
position: relative;
transition: background-color 0.3s ;
  &:hover {
    background-color: #ffb032;
}

`;
const Menutext = styled.h2`
    font-size:20px;
    /* margin-left:20px; */
    color:black;
    @media (max-width: 800px) {
    display: none;
  }
`;


export const Layout = () => {
    const navigator = useNavigate();


    const Deleteuser = async () => {
        const user = auth.currentUser;
        const name = localStorage.getItem("userName");
        console.log(name);
        if (name) {
            const ref = doc(db, "users", name);
            try {
                await user?.delete();
                await updateDoc(ref, { [name]: deleteField(), });
                navigator("/");
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }

    }

    const onLogOut = async (text: string) => {
        const ok = confirm(text);
        if (ok) {
            auth.signOut();
            Deleteuser();
        }
    };


    return (
        <Div>
            <Wrapper>
                <Menu>
                    <Linkto to="/">
                        <Loginuser />
                        <MenuItem>
                            <Menutext>Change Name</Menutext>
                        </MenuItem>
                    </Linkto>
                    <Linkto to="/rooms">
                        <MenuItem>
                            <Menutext>Rooms</Menutext>
                        </MenuItem>
                    </Linkto>
                    <Linkto to="/chat">
                        <MenuItem>
                            <Menutext>Chat</Menutext>
                        </MenuItem>
                    </Linkto>
                    <Linkto to="/menu">
                        <MenuItem>
                            <Menutext>Menu</Menutext>
                        </MenuItem>
                    </Linkto>
                    <MenuItem onClick={() => onLogOut("대화 내용이 모두 사라집니다!")}>
                        <Menutext>LOGOUT</Menutext>
                    </MenuItem>
                </Menu>
                <Outlet />
            </Wrapper>



        </Div>
    )
}