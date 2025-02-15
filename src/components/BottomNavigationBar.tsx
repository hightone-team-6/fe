import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { HomeIcon } from "./HomeIcon";
import { SearchIcon } from "./SearchIcon";
import { LikeIcon } from "./LikeIcon";
import { ProfileIcon } from "./ProfileIcon";
import { Typography } from "./Typography";
import { EditIcon } from "./EditIcon";

/**
 * 하부 네비게이션 바
 */
export const BottomNavigationBar = () => {
  const location = useLocation();
  const menus = [
    {
      title: "홈",
      to: "/",
      icon: <HomeIcon active={location.pathname === "/"} />,
    },
    {
      title: "검색",
      to: "/search",
      icon: <SearchIcon active={location.pathname === "/search"} />,
    },
    {
      title: "찜",
      to: "/like",
      icon: <LikeIcon active={location.pathname === "/like"} />,
    },
    {
      title: "내 정보",
      to: "/my",
      icon: <ProfileIcon active={location.pathname === "/my"} />,
    },
  ];

  const adminMenu = [
    {
      title: "홈",
      to: "/admin",
      icon: <HomeIcon active={location.pathname === "/admin"} />,
    },
    {
      title: "수정",
      to: "/edit",
      icon: <EditIcon active={location.pathname === "/edit"} />,
    },
    {
      title: "내 정보",
      to: "/admin/my",
      icon: <ProfileIcon active={location.pathname === "/admin/my"} />,
    },
  ];

  const adminPaths = adminMenu.map((menu) => menu.to);

  if (adminPaths.includes(location.pathname))
    return (
      <>
        <Container>
          {adminMenu.map((menu, idx) => (
            <NavigationButton key={idx} to={menu.to}>
              {menu.icon}
              <Typography
                size="Caption"
                color={location.pathname === menu.to ? "green" : "grey"}
              >
                {menu.title}
              </Typography>
            </NavigationButton>
          ))}
        </Container>
      </>
    );

  const paths = menus.map((menu) => menu.to);

  if (!paths.includes(location.pathname)) return;
  if (location.pathname.includes("/purchase")) return null;

  return (
    <>
      <Container>
        {menus.map((menu, idx) => (
          <NavigationButton key={idx} to={menu.to}>
            {menu.icon}
            <Typography
              size="Caption"
              color={location.pathname === menu.to ? "green" : "grey"}
            >
              {menu.title}
            </Typography>
          </NavigationButton>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 12px 45px;
  border-top: 0.1px solid ${({ theme }) => theme.color.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 0;
`;

const NavigationButton = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;
