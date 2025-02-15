import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;

  width: 170px;
  height: 170px;

  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;

interface QuarterImageProps {
  images?: string[];
}

export const QuarterImage = ({ images }: QuarterImageProps) => {
  return (
    <Grid>
      {images &&
        images.map((image) => (
          <img width={82} height={82} src={image} alt="quarter" />
        ))}
    </Grid>
  );
};
