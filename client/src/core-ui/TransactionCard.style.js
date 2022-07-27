import styled from "styled-components";

const StyledTransactionCard = styled.div`

background-color:#303030;
padding: 16px 28px;
width: 524px;
display: flex;
align-items:center;
margin-bottom:16px;

img{
    width: 70px;
    height: 68px;
    margin-right: 14px;
}

.transaction-img{
height: 120px;
width: 80px;
object-fit: cover;
}

.transaction-description{
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;

    b{
        color: #F74D4D;
        word-break: break-all;
    }

    span{
        color:#F74D4D;
        margin: 4px 0 8px 0;
        word-break: break-all;
    }

    .total{
        flex: 1;
        color: white;
        margin-top: 24px ;
        word-break: break-all;
    }
}

.status{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    width: 80px;

    font-weight: bold;
    color: white;

    background-color: ${(props)=> props.status === "success" ? "rgba(103,255,146,.65)" : "pending" ? "rgba(255,223,107,.65)" : "rgba(255,98,88,.65)"};
}
`

export default StyledTransactionCard;