import styled from "styled-components";

 const StyledDetail = styled.section`
    
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 80px;

    img{
        width:436px;
        height: 555px;
        object-fit: cover;
        margin-right:54px;
    }

    .right-section{
        max-width: 544px;
        padding-top: 64px;

        .movie-title{
            
            font-size: 40px;
            color: #CD2E71;
            font-weight: bold;
            margin-right:32px;
        }

        P{
            margin: 40px 0 36px 0;
        }

        .category{
            margin-top: 14px;
            margin-bottom: 64px;
            color:#7E7E7E;
            font-size: 16px;
            font-weight: bold;

        }


        .movie-details{
            display: flex;
            align-items: center;
            justify-content: space-between;
            
        }


        .price{
            text-align: end;
            font-weight: bold;
            color: #CD2E71;
            font-size: 24px;
           
        }

        button{
            background-color: orange;
            color: white;
            font-weight: bold;
            margin-top: 24px;
            appearance: none;
            border: none;
            padding: 12px 24px;

            &:hover{
                transform: scale(1);
            }
        }

        .finish-btn{
            margin-top:12px ;
        }



    }
 `

 export default StyledDetail;