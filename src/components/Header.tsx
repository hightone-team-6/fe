import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "./Typography";

export const Header = () => {
  const location = useLocation();

  const banPathName = ["/", "/location"];

  if (banPathName.includes(location.pathname)) return;

  let title = "";

  switch (location.pathname) {
    case "/like":
      title = "찜";
      break;
    case "/search":
      title = "검색";
      break;
    case "/my":
      title = "마이페이지";
      break;
    default:
      break;
  }

  return (
    <>
      <Container>
        <Typography size="Headline" weight={"bold"}>
          {title}
        </Typography>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0;
  padding-top: 60px;
`;
