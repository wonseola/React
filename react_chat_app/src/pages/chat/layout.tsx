import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Loginuser } from "../../components/userInfo";



const Div = styled.div`
    height:100%;
    display: flex;
    align-items: center;
    justify-content:center;
    margin:auto;
`

const Wrapper = styled.div`
display: grid;
grid-template-columns: 1fr 13fr;
height:90%;
gap:20px;
background-color:white;
background-color:#fff;
`;

const Menu = styled.div`
display: flex;
flex-direction:column;
gap:10px;
padding-top:20px;
border-right:1px solid black;
justify-content:center;
align-items: center;
@media (max-width: 500px) {
    display: none;
  }
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
margin-top: ${props => props.className === "logout" ? "auto" : "0"};
`;
const Menutext = styled.h2`
    font-size:20px;
    /* margin-left:20px; */
    color:black;
    
`;


export const Layout = () => {
    const navigator = useNavigate();

    const onLogOut = async (text: string) => {
        const ok = confirm(text);
        if (ok) {
            navigator("/");
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
                    {/* <Linkto to="rooms" >
                        <MenuItem>
                            <Menutext>Create Room</Menutext>
                        </MenuItem>
                    </Linkto> */}
                    <Linkto to="list" >
                        <MenuItem>
                            <Menutext>Room List</Menutext>
                        </MenuItem>
                    </Linkto>
                    <MenuItem className="logout" onClick={() => onLogOut("대화 내용이 모두 사라집니다!")}>
                        <Menutext>LOGOUT</Menutext>
                    </MenuItem>
                </Menu>
                <Outlet />
            </Wrapper>



        </Div>
    )
}