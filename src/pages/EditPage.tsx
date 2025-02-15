import { BigPlusIcon } from "@/components/BigPlusIcon";
import { Typography } from "@/components/Typography";
import styled from "styled-components";

export const EditPage = () => {
  return (
    <>
      <Container>
        <CafeList>
          <CafeItem>
            <CafeImage src="https://cdn.discordapp.com/attachments/1339575835459588096/1340421024461754519/Frame_67.png?ex=67b24bdc&is=67b0fa5c&hm=563bf77c097d2fb70ef1649268b0269e373522c5a28eeb7c39223cea6d34e9b6&" />
            <Typography size="Body" weight={"bold"}>
              서울 카페
            </Typography>
            <EditButton>
              <Typography size="Headline" weight={"bold"} color="white">
                수정하기
              </Typography>
            </EditButton>
          </CafeItem>
          <CafeItem>
            <CafeImage src="https://cdn.discordapp.com/attachments/1339575835459588096/1340421024461754519/Frame_67.png?ex=67b24bdc&is=67b0fa5c&hm=563bf77c097d2fb70ef1649268b0269e373522c5a28eeb7c39223cea6d34e9b6&" />
            <Typography size="Body" weight={"bold"}>
              서울 카페
            </Typography>
            <EditButton>
              <Typography size="Headline" weight={"bold"} color="white">
                수정하기
              </Typography>
            </EditButton>
          </CafeItem>
        </CafeList>
        <PlusButton>
          <BigPlusIcon />
        </PlusButton>
      </Container>
    </>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
`;

const CafeList = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CafeItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CafeImage = styled.img`
  width: 100%;
  height: 200px;
`;

const EditButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: ${({ theme }) => theme.color.green};
  border-radius: 100px;
`;

const PlusButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: 16px;
  bottom: 16px;
  aspect-ratio: 1/1;
  width: 60px;
`;
