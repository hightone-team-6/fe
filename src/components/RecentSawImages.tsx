import styled from "styled-components";

const Container = styled.div`
  width: 393px;
  overflow-x: auto;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Image = styled.img`
  width: 109px;
  height: 109px;
  border-radius: 12px;
  object-fit: cover;
`;

interface RecentSawImagesProps {
  images: {
    imageUrl: string;
    onClick: (imageUrl: string) => void;
  }[];
}

const RecentSawImages = ({ images }: RecentSawImagesProps) => {
  return (
    <Container>
      <ImageContainer>
        {images.map((image, index) => (
          <Image key={index} src={image.imageUrl} alt={`recent-${index}`} />
        ))}
      </ImageContainer>
    </Container>
  );
};

export default RecentSawImages;
