import useGetLocations from "@/api/hooks/locations/useGetLocations";
import FloatButton from "@/components/FloatButton";
import { PageContainer } from "@/components/PageContainer";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const HeadImage = styled.div<{ $imageUrl: string }>`
  width: 393px;
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
  padding: 0 8px;
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

const Title = styled.span`
  color: #000;
  font-family: Pretendard;
  font-weight: 700;

  font-size: 20px;
  font-weight: 700;
`;

const TitleWrapper = styled.div`
  padding: 16px 16px;

  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);

  width: 393px;
`;

const SubTitleWrapper = styled.div`
  padding: 16px;
  width: 393px;
`;

const SubTitle = styled.span`
  color: #000;
  font-family: Pretendard;
  font-weight: 500;
  font-size: 16px;
`;

const Button = styled.button`
  display: flex;
  width: 361px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 300px;
  background: #2b8137;

  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
`;

/**
 * 장소 상세 페이지
 */
export const LocationPage = () => {
  const { locationId } = useParams();

  const { data } = useGetLocations();

  const location = data?.find((v) => v.locationId === Number(locationId));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % (location?.imageUrls.length ?? 0)
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <>
      <FloatButton
        onClick={() => {
          window.history.back();
        }}
      />
      <Container>
        <HeadImage $imageUrl={location?.imageUrls[0] ?? ""} />
        <ProgressWrapper>
          <Progress>
            {location?.imageUrls.map((_, index) => (
              <Dot
                key={index}
                $isActive={index === currentImageIndex}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </Progress>
        </ProgressWrapper>
        <TitleWrapper>
          <Title>{location?.title}</Title>
        </TitleWrapper>

        <SubTitleWrapper>
          <SubTitle>공지사항</SubTitle>
        </SubTitleWrapper>

        <Button>예약하기</Button>
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled.div`
  width: 393px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
