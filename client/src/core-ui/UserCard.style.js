import styled from "styled-components";

export const StyledUserCard = styled.div`
display: flex;
align-items:center;
justify-content: center;

background-color:#303030;
margin: 0 auto;
max-width: 800px;
margin-bottom: 24px;
padding: 24px 64px;

border-radius: 16px;
cursor: pointer;
transition: 150ms ease;

&:hover{
  transform: scale(1.05);
}

img{
    border-radius:100vh;
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right :160px;
};

.user-info{
    display: flex;
    flex-direction: column;

    span{
        font-weight: bold;
        margin-bottom: 8px;
    }

    P{
        margin-bottom: 8px;
    }

    button{
        background-color: rgba(247, 77, 77, 1);
    }
}

`