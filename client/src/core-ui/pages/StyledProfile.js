import styled from "styled-components";

 const StyledProfile = styled.section`
 display: flex;
 justify-content: center;
 padding-right: 84px;
 padding-left: 84px;

 .left{
     .title{
        font-size: 24px;
        font-weight: bold;
        color: #CD2E71;
     }

    .profile-details{
    display: flex;
    margin-top: 36px;

    img{
    margin-right: 40px;
    object-fit: cover;
}

    .profile-description{
        b{
            color:#CD2E71;
        }

        p{
            margin-top: 6px;
            margin-bottom: 28px;
            max-width: 355px;
        }
    }
 }
 }

 .right{
    margin-left:100px;

    .title{
        font-size: 24px;
        font-weight: bold;
        color: #CD2E71;
    }

    .transaction-container{
        margin-top: 36px;
        overflow-y: scroll;
        height: 488px;
        scrollbar-width: none;
    }
 }
 

 .profile-img{
    width: 338px;
    height: 435px;
 }

 
 `

 export default StyledProfile;