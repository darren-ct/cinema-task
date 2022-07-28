import styled from "styled-components";

 const StyledHome = styled.div`
 padding: 0 100px 48px 100px ;

.swiper {
   margin-bottom: 48px;
};

 .title {
    font-size:24px;
    color: #CD2E71;
    margin: 100px auto 0px auto;
    text-align: center;
    font-weight: bold;
 };

 form{
    width: 100%;
    max-width:800px;
    margin: 48px auto 0 auto ;
 }

 input {
    width: 100%;
    padding: 12px;
    outline: none;
    background-color: #BCBCBC;
    color : #0d0d0d;
    border-radius: 8px;
    margin-bottom: 102px;
 }

 .movies{
    margin:0 auto;
    /* margin-top: 102px; */
    display: grid;
    grid-gap: 24px;
    width: 100%;
    grid-template-columns: repeat(auto-fit,minmax(240px,20%));
    
    
     }
 

 `

 export default StyledHome;