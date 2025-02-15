import useGetLocations from "@/api/hooks/locations/useGetLocations";
import { LikeSection } from "@/components/LikeSection";
import { PageContainer } from "@/components/PageContainer";
import { PageContent } from "@/components/PageContent";
import PlaceCard from "@/components/PlaceCard";
import { PlusIcon } from "@/components/PlusIcon";
import { QuarterImage } from "@/components/QuarterImage";
import styled from "styled-components";

export const LikePage = () => {
  const { data } = useGetLocations();

  return (
    <>
      <Container>
        <PageContent>
          <SectionContainer>
            <LikeSection title="최근 본 장소">
              <RecentList>
                {data &&
                  data.map((data, idx) => (
                    <PlaceCard
                      key={idx}
                      imageUrls={data.imageUrls}
                      title={data.title}
                      hashTags={data.hashTags}
                      location={data.location}
                      description={data.description}
                      templateId={data.templateId}
                      locationId={data.locationId}
                      imageSize={110}
                    />
                  ))}
              </RecentList>
            </LikeSection>
            <LikeSection title="찜한 장소">
              <ZzimContent>
                <QuarterImage images={data && data[0].imageUrls} />
                <QuarterImage images={data && data[0].imageUrls} />
                <QuarterImage images={data && data[0].imageUrls} />
                <AddZzim>
                  <PlusIcon />
                </AddZzim>
              </ZzimContent>
            </LikeSection>
          </SectionContainer>
        </PageContent>
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled(PageContainer)``;

const RecentList = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow-x: scroll;
`;

const ZzimContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const AddZzim = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  aspect-ratio: 1/ 1;
  border-radius: 12px;
  background: #e6e6e6;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
