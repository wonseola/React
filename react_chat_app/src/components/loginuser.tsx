import styled from "styled-components";


const Div = styled.div`
    width:70px;
    height:70px;
    background-color:${() => '#' + Math.floor(Math.random() * 16777215).toString(16)};
    display: flex;
    justify-content:center;
    align-items: center;
    margin:auto;
    border-radius:50%;
`

const Text = styled.h1`
    font-size:30px;
    color:black;
`



export const Loginuser = () => {
    const name = localStorage.getItem("userName");
    const shortenedName = name ? name.slice(0, 2) : "";
    return (
        <>
            <Div>
                <Text>{shortenedName}</Text>
            </Div>
        </>
    )
}