import styled from "styled-components";

export const Container = styled.header`
  background: #d73035;
  display: flex;
  justify-content: center;
  height: 198px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1216px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;

  .page-details {
    h1 {
      font-size: 32px;
      margin-bottom: 6px;
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      opacity: 0.9;
    }
  }
`;
