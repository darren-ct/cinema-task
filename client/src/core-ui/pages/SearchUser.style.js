import styled from "styled-components";

 const StyledSearchUser = styled.section`
 
    form {
        max-width: 800px;
        margin: 0 auto 80px auto;

        

        input{
                margin-top: 64px;
                margin-bottom: 32px;
        }

        .search-btn{
        margin-top: 70px;
        width: 100%;
        background: #56C05A;
        font-size: 18px;
        padding: 12px;

        &:hover{
            scale: 1;
        }
    }


    };

    .user-container {
        height: 800px;
        overflow-y: scroll;
        scrollbar-width: none;

        
    }

    .user-container::-webkit-scrollbar {
        display: none;
    }



 `

 export default StyledSearchUser;