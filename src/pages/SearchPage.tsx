import { PageContainer } from "@/components/PageContainer";
import styled from "styled-components";
import InfinityScrollImageContainer from "@/components/InfinityScrollImageContaienr";

const Spacer = styled.div`
  height: 160px;
  width: 100%;
  background-color: pink;
`;

/**
 * 검색 페이지
 */
export const SearchPage = () => {
  return (
    <>
      <Container>
        <Spacer />
        <InfinityScrollImageContainer />
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled(PageContainer)``;
