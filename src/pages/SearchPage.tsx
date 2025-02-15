import { PageContainer } from "@/components/PageContainer";
import styled from "styled-components";
import InfinityScrollImageContainer from "@/components/InfinityScrollImageContaienr";
import { PageContent } from "@/components/PageContent";

/**
 * 검색 페이지
 */
export const SearchPage = () => {
  return (
    <>
      <Container>
        <PageContent>
          <InfinityScrollImageContainer />
        </PageContent>
      </Container>
    </>
  );
};

/**
 * @todo 페이지 Wrap 컨테이너
 */
const Container = styled(PageContainer)``;
