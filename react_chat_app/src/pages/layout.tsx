import styled from "styled-components";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onValue, ref, remove, set } from "firebase/database";
import { rtdb } from "../firebase";
import { List } from "./chat/roomlist";
import { BrowserView, MobileView, isBrowser } from "react-device-detect";
import { Mobile } from "../components/aa";

const Div = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  height: 90%;
  width: 100%;
  gap: 20px;
  background-color: #ffffff;

  border-radius: 10px;
  /* padding: 20px; */
  box-shadow: 0px 0px 15px -2px #2d2b2b60;
`;



export const Layout = () => {
    const navigate = useNavigate();
    const nick = localStorage.getItem("userName");
    const onlineRef = ref(rtdb, `users/${nick}/online`);
    const offlineRef = ref(rtdb, `users/${nick}`);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const resetTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(logoutUser, 180000 * 5);
        };

        const logoutUser = async () => {

            localStorage.removeItem("userName");
            set(onlineRef, false);
            navigate("/");

        };

        const activityHandler = () => {
            resetTimer();
        };

        window.addEventListener("mousemove", activityHandler);
        window.addEventListener("keydown", activityHandler);

        return () => {
            window.removeEventListener("mousemove", activityHandler);
            window.removeEventListener("keydown", activityHandler);
            clearTimeout(timer);
        };
    }, [navigate, onlineRef]);

    useEffect(() => {
        const logoutUser = async () => {
            localStorage.removeItem("userName");
            set(onlineRef, false);
            navigate("/");
        };

        const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
            logoutUser();
            event.preventDefault();
            event.returnValue = "";
        };

        window.addEventListener("beforeunload", beforeUnloadHandler);
        window.addEventListener("popstate", beforeUnloadHandler);

        return () => {
            window.removeEventListener("popstate", beforeUnloadHandler);
            window.removeEventListener("beforeunload", beforeUnloadHandler);
        };
    }, []);

    const outUser = () => {
        onValue(onlineRef, (snapshot) => {
            const userData: boolean = snapshot.val();
            if (userData === false || nick == null) {
                remove(offlineRef);
                localStorage.removeItem("userName");
                navigate("/");

            }
        });
    };

    outUser();

    return (
        <Div>
            <Wrapper>
                {isBrowser ? (
                    <BrowserView>
                        <List />
                    </BrowserView>
                ) : (
                    <MobileView>
                        <Mobile />
                    </MobileView>
                )}
                <Outlet />
            </Wrapper>
        </Div>
    );
};
