import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Typography } from "./Typography";
import { LeftArrowIcon } from "./LeftArrowIcon";

export const Header = () => {
  const location = useLocation();

  const includeLeftArrow = ["/register", "/purchase"];

  if (
    includeLeftArrow.includes(location.pathname) ||
    location.pathname.includes("/register")
  ) {
    let title = "";

    if (location.pathname.includes("/register")) title = "예약하기";
    else title = "결제하기";

    return (
      <>
        <Container>
          <PrevButton>
            <LeftArrowIcon />
          </PrevButton>
          <Typography size="Headline" weight={"bold"}>
            {title}
          </Typography>
        </Container>
      </>
    );
  }

  const banPathName = ["/", "/location", "/first"];

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
    case "/purchase":
      title = "결제하기";
      break;
    case "/admin":
      title = "홈";
      break;
    case "/edit":
      title = "내 카페 수정";
      break;
    default:
      break;
  }

  if (location.pathname.includes("/register")) {
    title = "예약하기";
  }

  if (location.pathname.includes("/location")) return;

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
  padding-top: 80px;
  position: relative;
`;

const PrevButton = styled.div`
  position: absolute;
  left: 16px;
`;
