import styled from "styled-components";

 const StyledMovieCard = styled.div`
 width: 100%;
border-radius: 6px;


background: #212121;
margin-right: 16px;
margin-bottom: 32px;
overflow: hidden;
cursor: pointer;

transition: 150ms ease;

.movie-img{
width:100%;
height: 312px;
object-fit: cover;
margin-bottom: 16px;
}

span{
    font-weight: bold;
    color:#CD2E71;
    font-size: 18px;
    margin-left:12px;
}

p{
    word-break: break-all;
    margin: 12px;
}

&:hover{
    transform: scale(1.02);
}

 `

 export default StyledMovieCard;
