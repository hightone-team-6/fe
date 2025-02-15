import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useGetLocations, {
  Location,
} from "@/api/hooks/locations/useGetLocations";
import PlaceCard from "@/components/PlaceCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11px 44px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
`;

const InfinityScrollImageContainer = () => {
  const mockData: Location[] = [
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "서울 카페",
      location: "서울특별시 강남구",
      description: "분위기 좋은 카페",
      templateId: 1,
      locationId: 1,
      hashTags: ["#카페", "#데이트", "#분위기좋은"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "부산 맛집",
      location: "부산광역시 해운대구",
      description: "해운대 근처 맛집",
      templateId: 2,
      locationId: 2,
      hashTags: ["#맛집", "#해운대", "#부산여행"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "제주도 명소",
      location: "제주특별자치도 서귀포시",
      description: "제주 필수 관광지",
      templateId: 3,
      locationId: 3,
      hashTags: ["#제주도", "#관광", "#여행"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "서울 카페",
      location: "서울특별시 강남구",
      description: "분위기 좋은 카페",
      templateId: 1,
      locationId: 1,
      hashTags: ["#카페", "#데이트", "#분위기좋은"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "부산 맛집",
      location: "부산광역시 해운대구",
      description: "해운대 근처 맛집",
      templateId: 2,
      locationId: 2,
      hashTags: ["#맛집", "#해운대", "#부산여행"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "제주도 명소",
      location: "제주특별자치도 서귀포시",
      description: "제주 필수 관광지",
      templateId: 3,
      locationId: 3,
      hashTags: ["#제주도", "#관광", "#여행"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "서울 카페",
      location: "서울특별시 강남구",
      description: "분위기 좋은 카페",
      templateId: 1,
      locationId: 1,
      hashTags: ["#카페", "#데이트", "#분위기좋은"],
    },
    {
      imageUrls: Array(4).fill(
        "https://i.namu.wiki/i/5FGUIiyTGl3EkaSlnnRnmoAsPBMkL8w1tVdj5pgDOoydk2T0brSqYsWyLgGqyELwn5oP8HWRhF8A-p8ZyN4FtQ.webp"
      ),
      title: "부산 맛집",
      location: "부산광역시 해운대구",
      description: "해운대 근처 맛집",
      templateId: 2,
      locationId: 2,
      hashTags: ["#맛집", "#해운대", "#부산여행"],
    },
  ];
  const { data } = useGetLocations();
  const [displayData, setDisplayData] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    if (!mockData) return;
    setDisplayData((prev) => [...prev, ...mockData]);
  }, [mockData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setTimeout(() => {
            setPage((prev) => prev + 1);
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
  }, []);

  return (
    <Container>
      {displayData.slice(0, page * mockData?.length!).map((v, index) => (
        <div
          key={`${v.locationId}-${index}`}
          style={{
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <PlaceCard {...v} />
        </div>
      ))}
      <div ref={observerRef} style={{ height: "100px" }} />
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1; 
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default InfinityScrollImageContainer;
