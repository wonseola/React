import styled from "styled-components";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { get, ref, serverTimestamp, set } from "firebase/database";
import { rtdb } from "../firebase";


const Loginlayout = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    height: 100vh;
    margin:auto;
`

const Wrapper = styled.div`
    width:40vw;
    height:50%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 3fr repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    border-radius:20px;
    border:2px solid #ffb032;

`
const Emoji = styled.div`
    display: flex;
    justify-content:center;
    scale:150%;
`
const Textdiv = styled.div`
    justify-content: center;
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 10px;
`

const NickDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    display: flex;
`


const Input = styled.input`
    /* width:30rem; */
    padding: 20px;
    border: none;
    border-bottom:2px solid black;
    color: #000000;
    font-size:20px;
    background-color:transparent;
    text-align:center;
    outline:none;
    &:focus{
        border-bottom:2px solid orange;

    }
`


const Btn = styled.button`
    width:40px;
    height: 40px;
    cursor: pointer;
    border:none;
    background-color:transparent;
    font-size:35px;
`

const Error = styled.h2`
    font-size:30px;
    color:red;
    display: flex;
    justify-content:center;
`



export const SetNickname = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    const Userlist = () => {
        const userRef = ref(rtdb, 'users/' + name);
        const colors = ['Coral', 'Darkseagreen', 'Darksalmon', 'Lightskyblue', 'Steelblue'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        set(userRef, {
            users: name,
            color: randomColor,
            online: true,
            createAt: serverTimestamp(),
        })
    }



    const checkIfUserExists = async (name: string) => {
        const userRef = ref(rtdb, 'users/' + name);
        const snapshot = await get(userRef);
        return snapshot.exists();
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.length >= 20 || name.length == 0) {
            setError("닉네임을 20자 이하로 설정해주세요");
            setName("");
            return
        } else {
            localStorage.setItem('userName', name);
            const exists = await checkIfUserExists(name);
            if (exists) {
                setError("중복 닉넴");
                setName("");
            } else {
                Userlist();
                navigate("/chat");
            }
        }
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
    }, []);


    return (
        <Loginlayout>
            <Wrapper>
                <Emoji>
                    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beating%20Heart.png" alt="Beating Heart" width="80" height="80" />
                    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Hand%20Over%20Mouth.png" alt="Face with Hand Over Mouth" width="80" height="80" />
                </Emoji>

                <Textdiv>
                    <h2 style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "80px", fontWeight: "500", fontStyle: "normal" }}>
                        RANDOM MONG
                    </h2>
                    {/* <h2 style={{ fontSize: "50px", fontWeight: "500" }}>
                        RANDOM MONG</h2> */}
                    <h2 style={{ fontFamily: "'Nanum Pen Script', cursive", fontSize: "50px", fontWeight: "500", fontStyle: "normal" }}>
                        예상할 수 없는 대화
                    </h2>
                </Textdiv>
                <NickDiv>
                    <div></div>
                    <form onSubmit={handleLogin}>
                        <Input type="text" placeholder="닉네임을 입력하세요" value={name} onChange={handleInputChange} name="name" />

                        <Btn>&rarr;</Btn>

                    </form>
                </NickDiv>
                {error !== "" ? <Error>{error}</Error> : null}


            </Wrapper>
        </Loginlayout>
    )
}