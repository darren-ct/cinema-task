import styled from "styled-components";

 const StyledFormProfile = styled.section`

  padding-right: 84px;
  padding-left: 84px;
  
   b{
   font-size: 24px;
  }

  .upload-img{
    margin-top:48px;
    display: flex;
    width: 240px;
    align-items: center;
    cursor: pointer;

    div{
      font-size: 18px;
      background-color: #F74D4D;
      margin-right:16px;
      padding: 12px;
      border-radius: 8px;
    }
  }

  form{
    margin-top:26px;

    textarea{
                padding: 8px 24px 8px 16px;
                width: 100%;
                background-color:#BCBCBC;
                color: #555555;
                font-size:18px;
                border: 1px solid #D2D2D240;
                border-radius: 5px;
                outline: none;
                resize: none;
    }

    .form-control{
            position: relative;
            margin-bottom: 32px;
            
            input{
                 outline: none;
                 border: 1px solid #D2D2D240;
                 border-radius: 5px;
               
                padding: 12px;
                width: 100%;
                background-color:#BCBCBC;
                color: #555555;
                font-size:18px;

                transition: 150ms ease;
            }
          
            p{
              top: calc(100% + 2px);
              position: absolute;
              color:red;
            
            }
          }

    button{
        margin-top: 70px;
        width: 100%;
        background: #56C05A;
        font-size: 18px;
        padding: 12px;
        &:hover{
            scale: 1;
        }
    }
  }
 `

export default StyledFormProfile