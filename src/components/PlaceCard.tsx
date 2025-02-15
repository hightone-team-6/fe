import styled from "styled-components";
import { Location } from "@/api/hooks/locations/useGetLocations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Image = styled.img`
  width: 175px;
  height: 175px;
  object-fit: cover;
`;

const BaseText = styled.span`
  font-size: 16px;
  color: #000;
  font-style: normal;
  line-height: normal;
`;

const Title = styled(BaseText)`
  font-weight: 700;
`;

const HashTag = styled(BaseText)`
  font-weight: 400;
`;

const PlaceCard = ({
  imageUrls,
  title,
  location,
  description,
  templateId,
  locationId,
  hashTags,
}: Location) => {
  return (
    <Container>
      <Image src={imageUrls[0]} alt={title} />
      <Title>{title}</Title>
      <HashTag>{hashTags.map((v) => `#${v}`).join(" ")}</HashTag>
    </Container>
  );
};

export default PlaceCard;
