import styled from "styled-components";

export const MenuSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 100lvh;
  overflow: hidden;
  .custom-button:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

export const DivTable = styled.div`
width: 100%;
height: 450px;
overflow: auto;
`