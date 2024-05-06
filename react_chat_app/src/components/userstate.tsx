import styled from "styled-components"
import { Loginuser } from "./userInfo"



const Wrapper = styled.div`
    display: flex;
    /* justify-content:center; */
    margin-left:2rem;
    align-items: center;
`

const Text = styled.h2`
    margin: 20px;
    font-weight:600;
`

export const Myinfo = () => {

    const name = localStorage.getItem("userName");

    return (
        <Wrapper>
            <Loginuser />
            <Text>{name}</Text>
        </Wrapper>

    )
}