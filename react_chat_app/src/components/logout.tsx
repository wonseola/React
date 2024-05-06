import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = styled.div`
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

const Icon = styled.img`
    width: 70px;
    height: 70px;
`
export const Logouticon = () => {
    const navigator = useNavigate();

    const onLogOut = async (text: string) => {
        const ok = confirm(text);
        if (ok) {
            navigator("/");
        }
    };

    return (
        <>
            <Logout className="logout" onClick={() => onLogOut("대화 내용이 모두 사라집니다!")}>
                <Icon src="./logout.png" />
            </Logout>
        </>
    )
}