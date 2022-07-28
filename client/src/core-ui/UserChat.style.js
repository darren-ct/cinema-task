import styled from "styled-components";

export const StyledUserChat = styled.div`

display: flex;
align-items: center;
font-size: 14px;
margin-bottom: 32px;
padding: 12px;
cursor: pointer;
transition: 150ms;

position: relative;

background-color: ${(props)=>props.Clicked ? "#000" : "transaparent"};

&:hover{
    background-color: #000;
}

img{
    margin-right: 24px;
    width: 50px;
    height: 50px;
    border-radius: 100vh;
    object-fit: cover;
}

span{
     
}

div{
    span{
        font-weight: bold;
        margin-bottom:8px;
    }

    p{
        color: #ABABAB;
        word-break: break-all;
    }
}

.time{
    position: absolute;
    right:16px;
    top:16px;
    font-size: 10px;
    color: #ABABAB;
}

`