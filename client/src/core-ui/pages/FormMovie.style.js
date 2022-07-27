import styled from "styled-components";

 const StyledFormMovie = styled.section`

  padding-right: 84px;
  padding-left: 84px;
  padding-top: 64px;
  padding-bottom: 64px;
  
  
   b{
   font-size: 24px;
   color: #CD2E71;
  }

  .upload-img{
    margin-top:48px;
    display: flex;
    width: 240px;
    align-items: center;
    cursor: pointer;

    div{
      font-size: 18px;
      background-color: #CD2E71;
      margin-right:16px;
      padding: 12px;
      border-radius: 8px;
      color: white;
    }
  }

  form{
    margin-top:26px;

    textarea{
                padding: 8px 24px 8px 12px;
                width: 100%;
                background-color:#BCBCBC;
                color: #0D0D0D;
                font-size:18px;
                border: 1px solid #D2D2D240;
                border-radius: 5px;
                outline: none;
                resize: none;
                margin-top: 24px;
    }

    .form-control{
            position: relative;
            margin-bottom: 32px;
            p{
              top: calc(100% + 2px);
              position: absolute;
              color:#FF4C41;
              font-size: 12px;
            
            }
          }

    select{
      margin-top: 32px;
      background-color: #CD2E71;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      padding: 8px 12px 8px 8px;
      font-family: Avenir;
      color: white;
    }

    option{
      font-family: sans-serif;
    }

    button{
        margin-top: 70px;
        
    }

  }
 `

export default StyledFormMovie