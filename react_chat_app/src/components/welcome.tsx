import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    flex-direction:column;
`

const Img = styled.img`
    
`


export const Welcome = () => {



    return (
        <Wrapper>
            <h2>어떤 방에 들어갈가요~~ </h2>
            <Img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Revolving%20Hearts.png" />
        </Wrapper>
    );
};

