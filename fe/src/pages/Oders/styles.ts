import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1216px;
  margin: 40px auto;
  display: flex;
  gap: 32px;

  @media (max-width: 768px) {
    width: 90%;
    margin: 20px auto;
    flex-direction: column;
  }
`;
