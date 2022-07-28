import styled from "styled-components";

export const StyledBoard = styled.div`
      img {
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        left: 0px;
        top:0px;
        opacity: 0.4;
        object-fit: cover;
      }
      
      height: 100%;
      padding: 40px 84px;

      .title{
        font-size: 30px;
        text-align: left;
        margin-bottom: 24px;
      }

      .category {
        font-weight: bold;
        margin-bottom:12px;
      }

      .price {
        color:#CD2E71;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .desc{
        max-width: 640px;
        font-size: 14px;
      }



      button{
        margin-top: 16px;
      }


`