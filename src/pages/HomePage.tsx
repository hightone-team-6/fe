import styled from "styled-components";
import { Typography } from "../components/Typography";
import { PageContainer } from "@/components/PageContainer";
import useGetLocations from "@/api/hooks/locations/useGetLocations";
import PlaceCard from "@/components/PlaceCard";

const Title = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  margin: 16px auto 16px 16px;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  position: relative;
  height: 100vh;
`;

/**
 * 홈페이지
 */
export const HomePage = () => {
  const { data } = useGetLocations();

  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title>지금 인기있는</Title>
        <CardWrapper>
          {data?.slice(0, 3).map((v) => (
            <PlaceCard imageSize={110} key={v.locationId} {...v} />
          ))}
        </CardWrapper>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Title>근처 이벤트 카페</Title>
        <CardWrapper>
          {data?.slice(0, 3).map((v) => (
            <PlaceCard imageSize={110} key={v.locationId} {...v} />
          ))}
        </CardWrapper>
      </div>
    </Container>
  );
};
