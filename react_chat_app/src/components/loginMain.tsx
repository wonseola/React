import styled from "styled-components";
import ReactEmojis from "@souhaildev/reactemojis";
import React, { ChangeEvent, useState } from "react";
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
    text-align:center;
    outline:none;
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
        if (name.length >= 10 || name.length == 0) {
            setError("닉네임을 10자 이하로 설정해주세요");
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
                navigate("/list");
            }
        }
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <Loginlayout>
            <Wrapper>
                <Emoji>
                    <ReactEmojis emoji="👋" emojiStyle="2" />
                    <ReactEmojis emoji="😎" emojiStyle="2" />
                </Emoji>

                <Textdiv>
                    <h2 style={{ fontSize: "50px", fontWeight: "500" }}>
                        랜챗이름 머하지</h2>
                    <h2 style={{ fontSize: "20px", marginTop: "10px" }}>
                        닉네임을 입력해주세요!
                    </h2>
                </Textdiv>
                <NickDiv>
                    <div></div>
                    <form onSubmit={handleLogin}>
                        <Input type="text" value={name} onChange={handleInputChange} name="name" />

                        <Btn>&rarr;</Btn>

                    </form>
                </NickDiv>
                {error !== "" ? <Error>{error}</Error> : null}


            </Wrapper>
        </Loginlayout>
    )
}