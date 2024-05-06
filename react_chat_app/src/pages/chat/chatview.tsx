import styled from "styled-components"
import { Loginuser } from "../../components/userInfo"



const Wrapper = styled.div`
    background-color:#fdfeec8e;
`

export const Chatcontent = () => {




    return (
        <Wrapper className="message">
            <Loginuser />
            <p>asdf</p>
            <span>1 min ago</span>
        </Wrapper>
    )
}