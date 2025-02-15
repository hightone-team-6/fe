import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useGetLocations, {
  Location,
} from "@/api/hooks/locations/useGetLocations";
import PlaceCard from "@/components/PlaceCard";
import Input from "@/components/Input";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 44px 11px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  height: calc(100vh - 65px - 158px);
`;

const Selectors = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Selector = styled.div`
  padding-left: 14px;
  width: 130px;
  height: 30px;
  border-radius: 100px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  color: #000;
  font-size: 16px;
  font-weight: 400;
`;

const ApplyButton = styled.button`
  width: 77px;
  height: 30px;
  border-radius: 100px;
  background: #2b8137;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  color: #fff;
  font-size: 16px;
  font-weight: 400;
`;

const InfinityScrollImageContainer = () => {
  const { data } = useGetLocations();
  const [displayData, setDisplayData] = useState<Location[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current && data) {
          loadingRef.current = true;
          setTimeout(() => {
            setDisplayData((prev) => {
              return [...prev, ...data];
            });
            loadingRef.current = false;
          }, 200);
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [data]);

  const navigate = useNavigate();

  // 초기 데이터 로드
  useEffect(() => {
    if (!data || displayData.length > 0) return;
    setDisplayData([...data]);
  }, [data]);

  const [searchValue, setSearchValue] = useState("");

  return (
    <Wrapper>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Selectors>
        <Selector>지역</Selector>
        <Selector>스타일</Selector>
        <ApplyButton>적용</ApplyButton>
      </Selectors>
      <Container>
        {displayData.map((v, index) => (
          <div
            key={`${v.locationId}-${index}`}
            style={{
              width: "175px",
              animation: "fadeIn 0.2s ease-in-out",
            }}
          >
            <PlaceCard
              {...v}
              onClick={() => {
                navigate(`/location/${v.locationId}`);
              }}
            />
          </div>
        ))}
        <div ref={observerRef} style={{ height: "100px" }} />
        <style>
          {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1; 
              transform: translateY(0);
            }
          }
        `}
        </style>
      </Container>
    </Wrapper>
  );
};

export default InfinityScrollImageContainer;
