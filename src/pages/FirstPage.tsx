import { VStack } from "@/components/Stack";
import { Typography } from "@/components/Typography";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const FirstPage = () => {
  return (
    <>
      <Container>
        <Slogan>
          <VStack $alignItems="center">
            <Typography size="Title" weight={"bold"}>
              손안에서 쉽게 만드는
            </Typography>
            <Typography size="Title" weight={"bold"}>
              내 최애의 이벤트 카페!
            </Typography>
          </VStack>
        </Slogan>
        <ButtonContainer>
          <Button to={"/"}>
            <Typography size="Headline" weight={"bold"} color="white">
              내 최애 생카 만들러 가기
            </Typography>
          </Button>
          <Button to={"/admin"}>
            <Typography size="Headline" weight={"bold"} color="white">
              내 카페 등록하러 가기
            </Typography>
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slogan = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: mount 0.5s ease-out forwards;

  @keyframes mount {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
      transform: translateY(-110px);
    }
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 32px;
  position: absolute;
  bottom: 60px;
  animation: mount 0.5s ease-out forwards;
  animation-delay: 0.5s;
  opacity: 0;

  @keyframes mount {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Button = styled(Link)`
  width: 100%;
  background: ${({ theme }) => theme.color.green};
  padding: 18px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
