import { off, onDisconnect, onValue, ref, remove, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { rtdb } from "../firebase";
import { useEffect } from "react";

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
    const navigate = useNavigate();
    const nick = localStorage.getItem('userName');
    const onlineRef = ref(rtdb, `users/${nick}/online`);
    const offlineRef = ref(rtdb, `users/${nick}`);

    onDisconnect(offlineRef).update({ online: false });

    const onLogOut = async (text: string) => {
        const ok = confirm(text);
        if (ok) {
            navigate("/");
            set(onlineRef, false);
        }
    };

    useEffect(() => {
        const outUser = () => {
            onValue(onlineRef, (snapshot) => {
                const userData: boolean = snapshot.val();
                if (userData === false) {
                    remove(offlineRef);
                }
            });
            outUser();
            return () => { off(offlineRef) }
        }
    }, []);

    return (
        <>
            <Logout className="logout" onClick={() => onLogOut("대화 내용이 모두 사라집니다!")}>
                <Icon src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Back%20Arrow.png" />
            </Logout>
        </>
    )
}