import styled from "styled-components";

export const StyledChatButton = styled.div`
      position:fixed;
      right: 24px;
      bottom: 24px;

      width: 64px;
      height: 64px;
      border-radius: 100vh;
      cursor: pointer;

      transition:150ms linear;
      

      &:hover{
        transform: scale(1.1);
      }


      div {
         width: 100%;
         height: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
      }

      background-color: white;

`