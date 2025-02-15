import { ReactNode } from "react";
import styled from "styled-components";
import { Typography } from "./Typography";

interface LikeSectionProps {
  children: ReactNode;
  title: string;
}

export const LikeSection = ({ children, title }: LikeSectionProps) => {
  return (
    <>
      <Container>
        <Title>
          <Typography size="Body" weight={"bold"}>
            {title}
          </Typography>
        </Title>
        {children}
      </Container>
    </>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const Title = styled.div`
  padding: 10px 0;
  padding-top: 0;
`;
