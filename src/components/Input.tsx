import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 15px;
  width: 361px;
  height: 45px;
  border-radius: 2200px;
  background: #ededed;
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const InputValue = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ value, onChange }: InputProps) => {
  return (
    <Container>
      <InputValue value={value} onChange={onChange} />
      <SearchIconWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2"
          height="26"
          viewBox="0 0 2 26"
          fill="none"
        >
          <path
            d="M1 1L0.999999 25"
            stroke="#2B8137"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0615C18.7932 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.9494 18.7932 8.90908 18.3912 7.93845C17.9891 6.96782 17.3998 6.08589 16.657 5.343C15.9141 4.60011 15.0321 4.01082 14.0615 3.60877C13.0909 3.20673 12.0506 2.99979 11 2.99979C9.94936 2.99979 8.90905 3.20673 7.93842 3.60877C6.96779 4.01082 6.08585 4.60011 5.34296 5.343C3.84263 6.84333 2.99976 8.87821 2.99976 11C2.99976 13.1218 3.84263 15.1567 5.34296 16.657C6.84329 18.1573 8.87818 19.0002 11 19.0002C13.1217 19.0002 15.1566 18.1573 16.657 16.657Z"
            stroke="#2B8137"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SearchIconWrapper>
    </Container>
  );
};

export default Input;
