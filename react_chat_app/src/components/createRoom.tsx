import { ref, set, serverTimestamp } from "firebase/database";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import { rtdb } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    flex-direction:column;
    display: flex;
    background-color:tan;
    align-items: center;
    height: 100%;
    gap: 20px;
`;

const Text = styled.h2`
    margin-top:20%;
`;

const Input = styled.input`
    width:90%;
    font-size:20px;
    outline:none;
    border:none;
    border-bottom:2px solid black;
    text-align:center;
    background-color:transparent;
`;

const Btn = styled.button`
    padding: .3em;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    font-weight: 600;
    font-size: 20px;
    gap: 0.5rem;
    align-items: center;
    border: 1px solid black;
    border-radius:10px;
    &:hover{
        border:1px solid red;
    }
`;

const Error = styled.h1`
    margin: 10px;
    color:red;
`;

const Form = styled.form`
    align-items: center;
    justify-content:center;
    flex-direction:column;
    display: flex;
    gap: 20px;
`;

interface CreateroomProps {
    onSubmit: () => void;
}

export const Createroom = ({ onSubmit }: CreateroomProps) => {
    const [room, setRoom] = useState("");
    const [error, setError] = useState("");

    const navi = useNavigate();

    const generateUUID = (): string => {
        return uuidv4(); // UUID 생성
    };
    const Makeroom = async () => {
        const newUid: string = generateUUID();
        const userRef = ref(rtdb, 'rooms/' + newUid);
        await set(userRef, {
            room,
            createAt: serverTimestamp(),
        });
        navi(`/chat/${newUid}`);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (room.length >= 50 || room.length === 0) {
            setError("방 이름을 다시 입력해주세요 !!");
        } else {
            await Makeroom();
            setRoom("");
            onSubmit();
        }
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRoom(event.target.value);
    };


    return (
        <Wrapper>
            <Text>방 제목을 입력해주세요!</Text>
            <Form onSubmit={handleSubmit}>
                <Input type="text" id="room" onChange={onChange} value={room} />
                <Btn>Go!</Btn>
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}

        </Wrapper>
    );
};
