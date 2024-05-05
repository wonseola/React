import { useEffect, useState } from "react";
import styled from "styled-components";
import { rtdb } from "../firebase";
import { get, ref } from "firebase/database";

const Div = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin: auto; */
    border-radius: 50%;
  `;

const Text = styled.h1`
    font-size:30px;
    color:black;
    font-weight:800;
`


export const Loginuser = () => {
    const [keys, setKeys] = useState("");
    const name = localStorage.getItem("userName");
    const shortenedName = name ? name.slice(0, 2) : "";

    useEffect(() => {
        const fetchData = async () => {
            const userRef = ref(rtdb, `users/${name}/color`);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setKeys(data);
                } else {
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (name) {
            fetchData();
        }
    }, [name]);

    return (
        <>
            <Div style={{ backgroundColor: `${keys}` }}>
                <Text>{shortenedName}</Text>
            </Div>
        </>
    )
}