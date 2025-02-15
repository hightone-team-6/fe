import styled from "styled-components";
import useGetLocations from "@/api/hooks/locations/useGetLocations";
import PlaceCard from "@/components/PlaceCard";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  width: 393px;
`;
const HeadImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 250px;
  flex-shrink: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  background-image: url(${(props) => props.$imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0;
  animation: fadeIn 0.2s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ProgressWrapper = styled.div`
  position: absolute;
  top: 218px;
  margin: 0 auto;

  width: 393px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Progress = styled.div`
  width: 42px;
  height: 20px;
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const Dot = styled.div<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  cursor: pointer;
  border-radius: 100px;
  background: ${(props) => (props.$isActive ? "#fff" : "#858585")};
`;

const imageUrls = [
  "https://cdn.discordapp.com/attachments/1339575835459588096/1340409585114284113/5c89c38158fdda87.jpg?ex=67b24134&is=67b0efb4&hm=fe187d8a6c6585f1f0c3edd1ee737664dc09239e733eee61b31f48101226b841&",
  "https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/05/110089905.1.jpg",
  "https://cdn.egn.kr/news/photo/201905/118564_229233_1750.jpg",
] as const;

/**
 * 홈페이지
 */
export const HomePage = () => {
  const { data } = useGetLocations();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [data]);

  const navigate = useNavigate();

  return (
    <>
      <HeadImage
        key={currentImageIndex}
        $imageUrl={imageUrls[currentImageIndex]}
      />
      <ProgressWrapper>
        <Progress>
          {imageUrls.map((_, index) => (
            <Dot
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              $isActive={index === currentImageIndex}
            />
          ))}
        </Progress>
      </ProgressWrapper>
      <Container>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Title>지금 인기있는</Title>
          <CardWrapper>
            {data?.slice(0, 3).map((v) => (
              <PlaceCard
                imageSize={110}
                key={v.locationId}
                {...v}
                onClick={() => {
                  navigate(`/location/${v.locationId}`);
                }}
              />
            ))}
          </CardWrapper>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Title>근처 이벤트 카페</Title>
          <CardWrapper>
            {data?.slice(0, 3).map((v) => (
              <PlaceCard
                imageSize={110}
                key={v.locationId}
                {...v}
                onClick={() => {
                  navigate(`/location/${v.locationId}`);
                }}
              />
            ))}
          </CardWrapper>
        </div>
      </Container>
    </>
  );
};
