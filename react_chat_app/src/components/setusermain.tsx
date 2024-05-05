import styled from "styled-components";
import ReactEmojis from "@souhaildev/reactemojis";
import React, { useState } from "react";
import { FirebaseError } from "@firebase/util";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "@firebase/firestore";
import { useNavigate } from "react-router";


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
    const [login, setLogin] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === "name") {
            setName(value);
        }

    }

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!name) {
            setError("닉네임이 없어요..!");
            return;
        }
        try {
            setLogin(true);
            const res = await signInAnonymously(auth);
            await setDoc(doc(db, "users", name), {
                name,
                id: res.user.uid,
            });

            navigate("/chat");
        }
        catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
                setLogin(false);
            }
        }
    }


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
                        {login ? "Loading..." : "닉네임을 입력해주세요!"}
                    </h2>
                </Textdiv>
                <NickDiv>
                    <div></div>
                    <form onSubmit={handleLogin}>
                        <Input type="text" onChange={onChange} name="name" />
                        <Btn>&rarr;</Btn>

                    </form>
                </NickDiv>
                {error !== "" ? <Error>{error}</Error> : null}


            </Wrapper>
        </Loginlayout>
    )
}