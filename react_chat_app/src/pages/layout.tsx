import styled from "styled-components";
import { List } from "./chat/roomlist";
import { Outlet, useNavigate } from "react-router-dom";

import {
    BrowserView,
    MobileView,
    isBrowser,
} from "react-device-detect";
import { Mobile } from "../components/aa";
import { useEffect } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { rtdb } from "../firebase";
import UserList from "../components/onlineUser";

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

    const navigate = useNavigate();
    const nick = localStorage.getItem('userName');
    const onlineRef = ref(rtdb, `users/${nick}/online`);
    const offlineRef = ref(rtdb, `users/${nick}`);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(logoutUser, 180000 * 5);
        };

        const logoutUser = async () => {
            const ok = confirm("입력이 없어서 로그아웃 됩니당~~");
            if (ok) {
                navigate('/');
                set(onlineRef, false);
            } else {
                return;
            }
        };

        const activityHandler = () => {
            resetTimer();
        };

        window.addEventListener('mousemove', activityHandler);
        window.addEventListener('keydown', activityHandler);
        window.addEventListener('beforeunload', logoutUser);

        return () => {
            window.removeEventListener('mousemove', activityHandler);
            window.removeEventListener('keydown', activityHandler);
            clearTimeout(timer);
        };
    }, [navigate, onlineRef]);

    const outUser = () => {
        onValue(onlineRef, (snapshot) => {
            const userData: boolean = snapshot.val();
            if (userData === false) {
                remove(offlineRef);
            }
        });
    };

    outUser();



    return (
        <Div>
            <Wrapper>
                {isBrowser ?
                    <BrowserView>
                        <List />
                        <UserList />
                    </BrowserView>
                    :

                    <MobileView>
                        <Mobile />
                    </MobileView>
                }
                <Outlet />
            </Wrapper>




        </Div>
    )
}