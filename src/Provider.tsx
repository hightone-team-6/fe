import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "./styles/globalStyle";
import styled from "styled-components";

const StyledProvider = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding-bottom: 20px;
`;

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const Provider = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledProvider>{children}</StyledProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Provider;
