import styled from "styled-components";

export const StyledConfirmModal = styled.div`
position: fixed;
z-index: 1000;
left: 0px;
top: 0px;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0,.8);

display: flex;
align-items: center;
justify-content: center;

.modal-body{
    background-color: white;
    padding: 32px;

    span {
        margin: 0 auto;
        text-align: center;
        

    }

    .btn-group {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button:first-child {
           margin-right: 8px;
        }
    }
}

`