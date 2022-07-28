import styled from "styled-components";

export const StyledChat = styled.section`

display: flex;
height: 100vh;
padding-top:16px;
padding-bottom: 16px;

button {
    margin-bottom: 48px;
}

.chat-container{
    width:422px;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    padding-left:48px;
}

.chat-container::-webkit-scrollbar {
        display: none;
    }


.middle-line{
    position: absolute;
    left:460px;
    top:-120px;

    height: 140vh;
    width: 2px;
    background-color: #6A6A6A4D;

}

.chatbody{
    padding: 0 0 0 48px;
    flex:1;
    display: flex;
    flex-direction: column;
    
    .messages-container{
        position: relative;
        flex:1;
        overflow-y:scroll;
        scrollbar-width: none;
        padding-right:16px;
    
        .messages-list {
            
            p {
                text-align: center;
                
            }
        }
    }

    .messages-container::-webkit-scrollbar {
        display: none;
    }


    form{
        width: 100%;
        border: 1px solid;
        
        input {
            outline: none;
            width:100%;
            height: 59px;
            font-size: 18px;
            background-color: #ABABAB26;
            padding: 0 32px;
            border: none;
        };
    }
}

// list




`