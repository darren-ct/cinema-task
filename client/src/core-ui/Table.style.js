import styled from "styled-components";

export const StyledTable = styled.table`


width: 100%;
margin-top: 48px;
border-collapse: collapse;

   thead tr{
        background-color:#303030;
        border-bottom: 1px solid lightgray;
        
        th{
        padding: 16px;
        color: white;
         }
   }

   .table-body-rows{
    background-color:#232323;
    text-align: center;
    border-bottom: 1px solid lightgray;
     
    td{
        padding: 12px;
        color: white;
    }

   }

   .table-body-rows:nth-child(even){
    background-color:#303030;
   }

   button {
    margin-left: 12px;
   }


`