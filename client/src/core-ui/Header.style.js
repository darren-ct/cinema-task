import styled from "styled-components";

export const StyledHeader = styled.header`

.container.nav{
         max-width: 1600px;
         height: 80px;
         font-size: AvenirBold;

         margin: 0 auto;
         padding: 64px 100px;

         display: flex;
         align-items: center;
         justify-content: space-between;

         color:white;
         font-weight: bold;

         .left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
         }

         .right{
            display: flex;
            align-items: center;

            .profile {
               border-radius: 100vh;
               border-width: 2px;
               border-style: solid;
               border-color: ${(props)=> props.modal? "#CD2E71":"transparent"};
               width: 48px;
               height: 48px;
               object-fit: cover;
               cursor: pointer

            };

            .triangle {
               position: absolute;
               clip-path: polygon(100% 0, 0 50%, 100% 100%);
               background-color: ${(props)=> props.modal? "#0D0D0D":"transparent"};
               width: 24px;
               height: 24px;
               transform: rotate(90deg);
               top: 96px;
               right: 112px;
            }
         }

        p{ margin-left: 24px;
           cursor: pointer;
           transition: 150ms ease;
           
         }

        a{
         text-decoration: none;
         margin-right: 32px;
        }

         
}

`