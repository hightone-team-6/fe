import useGetLocations from "@/api/hooks/locations/useGetLocations";
import FloatButton from "@/components/FloatButton";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  z-index: 100;
`;

const NonShadowWrapper = styled.div`
  padding: 16px 16px;

  background: #fff;

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

  margin: 32px 0 4px 0;
`;

const NoticeWrapper = styled.div`
  padding: 16px 14px;

  color: #000;

  /* CaptionRegular */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  border-radius: 12px;
  background: #c2efc8;
  margin: 0 12px;
  width: 361px;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100vw;
  overflow-x: auto;
`;

const ImageContainer = styled.div`
  width: 100vw;
  padding: 0 12px;
  overflow-x: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
`;

const NOTICE = `운영 시간: AM 10:00 - PM 10:00 
비용: 하루 매출 nn잔 
예약 후 취소 및
변경은 최소 10일 전까지 가능합니다. 
노쇼 시 환불이 어렵습니다. 

많은 분들의 관심과 사랑 부탁드립니다! 
특별한 아이돌 생일 이벤트를 [카페 이름]에서 함께하세요! 
🎂✨ 감사합니다! ☕💖
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

  const navigate = useNavigate();

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

        <NonShadowWrapper>
          <Title>{location?.hashTags.join(" ")}</Title>
        </NonShadowWrapper>

        <SubTitleWrapper>
          <SubTitle>공지사항</SubTitle>
        </SubTitleWrapper>

        <NoticeWrapper>
          <pre style={{ whiteSpace: "pre-wrap" }}>{NOTICE}</pre>
        </NoticeWrapper>

        <SubTitleWrapper>
          <SubTitle>이미지</SubTitle>
        </SubTitleWrapper>

        <ImageContainer>
          <ImageWrapper>
            {location?.imageUrls.map((v) => (
              <Image src={v} />
            ))}
          </ImageWrapper>
        </ImageContainer>

        <Button
          onClick={() => {
            navigate(`/register/${locationId}`);
          }}
        >
          예약하기
        </Button>
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
