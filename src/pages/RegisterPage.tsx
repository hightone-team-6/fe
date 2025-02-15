import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 393px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 339px;

  color: #000;

  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  margin: 3px 0 8px 0;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 339px;

  gap: 4px;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Input = styled.input<{ $width: number }>`
  outline: none;
  border: none;
  border-radius: 8px;
  background: #d9d9d9;
  padding: 12px 16px;
  width: ${({ $width }) => $width}px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  height: 30px;
  line-height: normal;
`;

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <Container>
      <TitleWrapper>예약자 정보</TitleWrapper>

      <FormItem>
        이름
        <Input
          $width={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormItem>
      <div style={{ height: "8px" }} />
      <FormItem>
        전화번호
        <Input
          $width={184}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormItem>
      <div style={{ height: "16px" }} />

      <TitleWrapper>예약 날짜</TitleWrapper>
    </Container>
  );
};

export default RegisterPage;
