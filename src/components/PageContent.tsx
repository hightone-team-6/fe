import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

interface PageContent {
  children?: ReactNode;
}

export const PageContent = ({ children }: PageContent) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

const Container = styled.div`
  animation: mounting 0.5s ease-out forwards;
  @keyframes mounting {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
