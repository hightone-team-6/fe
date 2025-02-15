import styled from "styled-components";
import { Location } from "@/api/hooks/locations/useGetLocations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 175px;
`;

const Image = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  object-fit: cover;
  border-radius: 8px;
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

interface PlaceCardProps extends Location {
  imageSize?: number;
}

const PlaceCard = ({
  imageUrls,
  title,
  location,
  description,
  templateId,
  locationId,
  hashTags,
  imageSize = 175,
}: PlaceCardProps) => {
  return (
    <Container>
      <Image src={imageUrls[0]} alt={title} size={imageSize} />
      <div>
        <Title>{title}</Title> <br />
        <HashTag>{hashTags.join(" ")}</HashTag>
      </div>
    </Container>
  );
};

export default PlaceCard;
