import { PageContainer } from "@/components/PageContainer";
import { PageContent } from "@/components/PageContent";
import { RightArrow } from "@/components/RightArrow";
import { HStack, VStack } from "@/components/Stack";
import { Typography } from "@/components/Typography";
import styled from "styled-components";

/**
 * 마이페이지
 */
export const MyPage = () => {
  const menus = [
    "예약 내역",
    "문의하기",
    "문의 내역",
    "회원 정보 수정",
    "회원 탈퇴",
    "설정",
  ];

  return (
    <>
      <Container>
        <PageContent>
          <Profile>
            <ProfileImg src="https://cdn.discordapp.com/attachments/1339575835459588096/1340428426846408754/Rectangle_85.png?ex=67b252c0&is=67b10140&hm=d9b1cded6b9af9aee0bbdfc1d9b905cc761131fb1d82675aecd2551868ae997d&" />
            <VStack $gap={"4px"}>
              <Typography size="Body" weight={"bold"}>
                김예은
              </Typography>
              <Membership>등급 혜택 보기</Membership>
            </VStack>
          </Profile>
          <Space />
          <PointCoupon>
            <Point>
              <Typography size="Body" weight={"bold"} color="grey">
                포인트
              </Typography>
              <HStack $justifyContent="space-between" $alignItems="center">
                <HStack $gap={"5px"}>
                  <Typography size="Body" weight={"bold"}>
                    666
                  </Typography>
                  <Typography size="Body" weight={"bold"} color="green">
                    P
                  </Typography>
                </HStack>
                <RightArrow />
              </HStack>
            </Point>
            <Coupon>
              <Typography size="Body" weight={"bold"} color="grey">
                쿠폰
              </Typography>
              <HStack $justifyContent="space-between" $alignItems="center">
                <HStack $gap={"5px"}>
                  <Typography size="Body" weight={"bold"}>
                    0
                  </Typography>
                  <Typography size="Body" weight={"bold"} color="green">
                    개
                  </Typography>
                </HStack>
                <RightArrow />
              </HStack>
            </Coupon>
          </PointCoupon>
          <Space />
          <ProfileList>
            {menus.map((menu: string, idx: number) => {
              return (
                <ProfileItem key={idx}>
                  <Typography size="Body">{menu}</Typography>
                </ProfileItem>
              );
            })}
          </ProfileList>
        </PageContent>
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled(PageContainer)`
  display: flex !important;
  flex-direction: column;
`;

const Space = styled.div`
  margin: 10px;
`;

const Profile = styled.div`
  width: 100%;
  padding: 12px 17px;
  display: flex;
  gap: 16px;
`;

const ProfileImg = styled.img`
  width: 56px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
`;

const Membership = styled.p`
  font-size: 14px;
`;

const ProfileList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ProfileItem = styled.li`
  display: flex;
  padding: 10px 16px;
`;

const PointCoupon = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 16px;
`;

const Point = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px 15px;
  gap: 3px;
`;

const Coupon = styled(Point)``;
