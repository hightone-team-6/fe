/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetReservations, {
  ReservationResponse,
} from "@/api/hooks/reservations/useGetReservations";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useBufferToFile from "./useBuffetToFile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 16px;
`;

const Card = styled.div`
  border-radius: 12px;
  background: #fff;
  width: 361px;
  height: 245px;
  flex-shrink: 0;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.12);

  padding: 16px;
`;

const ImageContainer = styled.div`
  width: 100%;
  border-radius: 12px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
`;

const Title = styled.div`
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 300px;

  /* BodyRegular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const GetInfo = styled.div`
  color: var(--grey, #888);
  text-align: left;

  /* CaptionRegular */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 4çpx;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ color: string }>`
  display: flex;
  width: 160px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 200px;
  background: ${({ color }) => color};

  color: #fff;
  text-align: center;

  /* HeadlineBold */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const ReservationPage = () => {
  const { data: reservations } = useGetReservations();

  const { handleFileToUrl } = useBufferToFile();

  const [localReservations, setLocalReservations] = useState<
    ReservationResponse[]
  >([]);

  const [fileUrls, setFileUrls] = useState<string[]>([]);

  useEffect(() => {
    if (reservations) {
      reservations
        .filter((reservation) => reservation.file)
        .forEach((reservation) => {
          setFileUrls((prev) => [
            ...prev,
            handleFileToUrl(reservation.file as unknown as any),
          ]);
        });
    }
  }, [reservations]);

  useEffect(() => {
    if (fileUrls.length > 0) {
      setLocalReservations(
        reservations?.filter((reservation) => reservation.file) ?? []
      );
    }
  }, [fileUrls]);

  console.log(fileUrls);

  return (
    <Container>
      {localReservations?.map((reservation) => (
        <Card key={reservation.locationId}>
          <ImageContainer>
            {fileUrls.map((url) => (
              <Image src={url} />
            ))}
          </ImageContainer>
          <div style={{ height: "16px" }} />
          <Title>{reservation.request}</Title>
          <GetInfo>자세히 보기</GetInfo>
          <div style={{ height: "16px" }} />
          <Buttons>
            <Button
              onClick={() => {
                setLocalReservations((prev) =>
                  prev.filter(
                    (item) => item.locationId !== reservation.locationId
                  )
                );
              }}
              color="#2B8137"
            >
              수락하기
            </Button>
            <Button
              onClick={() => {
                setLocalReservations((prev) =>
                  prev.filter(
                    (item) => item.locationId !== reservation.locationId
                  )
                );
              }}
              color="#F00"
            >
              거절하기
            </Button>
          </Buttons>
        </Card>
      ))}
    </Container>
  );
};

export default ReservationPage;
