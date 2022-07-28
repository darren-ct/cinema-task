import styled from "styled-components";

export const StyledChatBody = styled.div`
display: flex;
align-items: center;
justify-content: ${(props)=> props.isMe ? "flex-end" : "flex-start" };
margin-bottom: 50px;
padding-right: 24px;



img{
    width: 50px;
    height: 50px;
    border-radius: 100vh;
    object-fit: cover;
    margin-right: 40px;
}

.msg-body{
    position:relative;
    background-color:${(props)=>props.isMe? "#262626" : "#575757"};
    padding: 8px 16px;
    color: white;
    border-radius: 6px;
    width: 200px;
    max-width: 200px;

    .triangle{
        background-color:${(props)=>props.isMe? "#262626" : "#575757"};
        position: absolute;
        left: ${(props)=>props.isMe ? "100%" : "-8px"};
        top: calc(50% - 4px);
        width: 10px;
        height: 10px;
        transform: ${(props)=>props.isMe ? "rotate(180deg)" : "rotate(0deg)"};
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
    }

    .msg{
        word-break: break-all;
        font-size: 14px;
        color: white;
        
    }

    .msg-time{
        color: #ABABAB;
        position: absolute;
        font-size:10px;
        bottom: -18px;
        right: ${(props)=>props.isMe? "60%" : "0px"};
    }

}
`