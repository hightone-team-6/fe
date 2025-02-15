import { Link } from "react-router-dom";
import styled from "styled-components";

export const FirstPage = () => {
  return (
    <>
      <Container>
        <Button to={"/"}>소비자로 시작하기</Button>
        <Button to={"/admin"}>사장으로 시작하기</Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex: 1;
`;

const Button = styled(Link)`
  width: 100%;
  background: red;
  padding: 10px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;
