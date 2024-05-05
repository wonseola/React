import styled from "styled-components"



const Wrapper = styled.div`
    flex-direction:column;
    display: flex;
    background-color:tan;
    align-items: center;
    /* position:fixed; */
    justify-content:center;
`


export const Createroom = () => {

    return (
        <Wrapper>
            <input type="text" />
            <button>방 만들기</button>
        </Wrapper>
    )
}