import styled from "styled-components";

export const StyledDropdown = styled.div`
     position: absolute;
     z-index: 1000;
     width: 295px;
     background-color: #0D0D0D;

     top: 110px;
     right: 60px;
     
     border-radius:12px;

     height: ${(props)=> props.isShown ? "" : "0px" };
     padding: ${(props)=> props.isShown ? "30px" : "0px" };
     visibility: ${(props)=> props.isShown ? "" : "hidden" };
     opacity: ${(props)=> props.isShown ? "100%" : "0%" };

     img {
        width: 24px;
        height: 24px;
        background-color: #0D0D0D;
        margin-right: 20px;
     }

     .link{
        display: flex;
        align-items: center;
        margin-bottom: 32px;
     }

     .link.logout{
        p{
            margin-left: -1px;
            margin-right: 0px;
            visibility: ${(props)=> props.isShown ? "" : "hidden" };
        }

        border-top: 1px solid white;
        padding-top: 28px;
        margin-bottom:0px;
        visibility: ${(props)=> props.isShown ? "" : "hidden" };
     }
`