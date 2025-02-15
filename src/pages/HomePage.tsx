import styled from "styled-components";
import { Typography } from "../components/Typography";

/**
 * 홈페이지
 */
export const HomePage = () => {
  return (
    <>
      <Container>
        <Typography size="Title">Home</Typography>
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled.div``;
