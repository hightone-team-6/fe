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

  position: relative;
`;

const Selector = styled.div`
  position: relative;
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

const DropDown = styled.div`
  width: 130px;
  top: 30px;
  position: absolute;
  left: 0;
  height: fit-content;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  transform: translateY(-20px);
  opacity: 0;
  animation: slideDown 0.3s ease forwards;

  @keyframes slideDown {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const DropDownItem = styled.div`
  padding: 10px 16px;
  cursor: pointer;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const locations = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충청",
  "전라",
  "경상",
  "제주",
] as const;

const styles = [
  "하늘색",
  "노랑색",
  "초록색",
  "분홍색",
  "보라색",
  "빨강색",
  "파랑색",
  "검정색",
  "회색",
] as const;

const InfinityScrollImageContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { data } = useGetLocations(searchQuery);
  const [displayData, setDisplayData] = useState<Location[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const [dropDown, setDropDown] = useState<"location" | "style" | null>(null);

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

  return (
    <Wrapper>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearchClick={() => {
          setDisplayData([]);
          setSearchQuery(searchValue);
        }}
      />
      <Selectors>
        <Selector
          onClick={() =>
            setDropDown((prev) => (prev === "location" ? null : "location"))
          }
        >
          지역
          {dropDown === "location" && (
            <DropDown>
              {locations.map((v) => (
                <DropDownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchValue(v);
                    setDropDown(null);
                    setDisplayData([]);
                    setSearchQuery(v);
                  }}
                  key={v}
                >
                  {v}
                </DropDownItem>
              ))}
            </DropDown>
          )}
        </Selector>

        <Selector
          onClick={() =>
            setDropDown((prev) => (prev === "style" ? null : "style"))
          }
        >
          스타일
          {dropDown === "style" && (
            <DropDown>
              {styles.map((v) => (
                <DropDownItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchValue(v);
                    setDropDown(null);
                    setDisplayData([]);
                    setSearchQuery(v);
                  }}
                  key={v}
                >
                  {v}
                </DropDownItem>
              ))}
            </DropDown>
          )}
        </Selector>
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
