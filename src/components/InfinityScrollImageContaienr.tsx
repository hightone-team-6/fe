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
`;

const InfinityScrollImageContainer = () => {
  const { data } = useGetLocations();
  const [displayData, setDisplayData] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data) return;
    setDisplayData((prev) => [...prev, ...data]);
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
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
      {displayData.slice(0, page * data?.length!).map((v, index) => (
        <PlaceCard key={`${v.locationId}-${index}`} {...v} />
      ))}
      <div ref={observerRef} style={{ height: "10px" }} />
    </Container>
  );
};

export default InfinityScrollImageContainer;
