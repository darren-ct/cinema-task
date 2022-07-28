import styled from "styled-components";

 const StyledMyMovies = styled.section`
  padding-right: 84px;
  padding-left: 84px;


 .title{
    color: #CD2E71;
    font-weight:bold;
    font-size: 24px;
    text-align:center;
 }
 
 .mymovies{
    margin:0 auto;
    margin-top: 102px;
    display: grid;
    grid-gap: 24px;
    width: 100%;
    grid-template-columns: repeat(auto-fit,minmax(240px,20%));
    
    
     }
`;

export default StyledMyMovies;