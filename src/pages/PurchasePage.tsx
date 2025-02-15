import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
`;

const Title = styled.div`
  color: #000;
  width: 100%;

  /* BodyBold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Text = styled.div`
  color: #000;

  /* BodyRegular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const InputContainer = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "361px"};
  height: 50px;
  border-radius: 12px;
  border: 1px solid #e7e7e7;
  background: #fff;
  padding: 16px;
  align-items: center;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: var(--grey, #888);

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PointInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  color: var(--grey, #000);

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: right;
`;

const PointContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const PointButton = styled.button`
  display: flex;
  width: 130px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: #2b8137;

  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;

  padding: 15px 37px;
`;

const HasPoint = styled.div`
  color: var(--grey, #888);

  /* CaptionRegular */
  margin-top: 10px;
  margin-left: auto;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const RadioButton = styled.div<{ isSelected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  box-shadow: inset 0 0 0
    ${({ isSelected }) => (isSelected ? "5px #FF4B4B" : "3px #D1D1D6")};
`;

const Radio = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  color: #000;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Pay = styled.div`
  color: #2b8137;

  /* BodyBold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Line = styled.div`
  width: 393px;
  height: 4px;
  background: #f7f7f7;
`;

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 4px;
  border: 2px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CheckBoxText = styled.div`
  color: #000;

  /* BodyRegular */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  position: fixed;
  bottom: 16px;
  display: flex;
  width: 361px;
  height: 60px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 300px;
  background: #2b8137;

  color: #fff;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
`;

const PurchasePage = () => {
  const [point, setPoint] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(0);

  const navigate = useNavigate();

  return (
    <Container>
      <div style={{ height: "3px" }} />
      <Title>할인</Title>
      <div style={{ height: "8px" }} />
      <Text>쿠폰</Text>
      <div style={{ height: "8px" }} />
      <InputContainer>
        <Input
          placeholder="사용 가능한 쿠폰이 2개 있어요"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
      </InputContainer>
      <div style={{ height: "16px" }} />
      <Text>포인트</Text>
      <div style={{ height: "8px" }} />
      <PointContainer>
        <InputContainer width="223px">
          <PointInput
            value={point}
            type="number"
            onChange={(e) => setPoint(Math.min(666, Number(e.target.value)))}
          />
        </InputContainer>
        <PointButton>전액사용</PointButton>
      </PointContainer>
      <HasPoint>보유 포인트: 666P</HasPoint>
      <div style={{ height: "12px" }} />
      <Title>결제 수단</Title>
      <div style={{ height: "16px" }} />
      <RadioContainer>
        <Radio onClick={() => setSelectedPayment(0)}>
          <RadioButton isSelected={selectedPayment === 0} />
          토스페이
        </Radio>
        <Radio onClick={() => setSelectedPayment(1)}>
          <RadioButton isSelected={selectedPayment === 1} />
          카카오페이
        </Radio>
        <Radio onClick={() => setSelectedPayment(2)}>
          <RadioButton isSelected={selectedPayment === 2} />
          계좌 간편결제
        </Radio>
        <Radio onClick={() => setSelectedPayment(3)}>
          <RadioButton isSelected={selectedPayment === 3} />
          일반결제
        </Radio>
      </RadioContainer>
      <div style={{ height: "36px" }} />
      <Title>결제 금액</Title>
      <div style={{ height: "16px" }} />
      <Pay>{(500000 - point).toLocaleString()} 원</Pay>
      <div style={{ height: "24px" }} />
      <Line />
      <div style={{ height: "16px" }} />
      <CheckBoxContainer>
        <CheckBox onClick={() => setIsChecked(!isChecked)}>
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
            >
              <line
                x1="0.428746"
                y1="4.74275"
                x2="3.42875"
                y2="9.74275"
                stroke="black"
              />
              <line
                x1="2.60532"
                y1="9.69303"
                x2="9.60532"
                y2="0.69303"
                stroke="black"
              />
            </svg>
          )}
        </CheckBox>
        <CheckBoxText>주문내용 확인 및 결제 동의</CheckBoxText>
      </CheckBoxContainer>
      <div style={{ height: "16px" }} />
      <Agreement text="(필수) 개인정보 수집 · 이용 동의" />
      <Agreement text="(필수) 개인정보 제3자 정보 제공 동의" />
      <Agreement text="(필수) 결제대행 서비스 이용약관 동의" />
      <Button
        onClick={() => {
          alert("결제가 완료 되었습니다");
          navigate("/");
        }}
      >
        결제하기
      </Button>
    </Container>
  );
};

export default PurchasePage;

const AgreementContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 333px;
  margin-left: auto;
  margin-bottom: 8px;
  color: #828282;
  justify-content: space-between;

  /* CaptionRegular */
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Agreement = ({ text }: { text: string }) => {
  return (
    <AgreementContainer>
      {text}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
      >
        <g clip-path="url(#clip0_32_2385)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.85355 5.64659C7.94728 5.74035 7.99994 5.86751 7.99994 6.00009C7.99994 6.13267 7.94728 6.25983 7.85355 6.35359L5.02505 9.18209C4.97893 9.22985 4.92375 9.26794 4.86275 9.29414C4.80175 9.32035 4.73614 9.33414 4.66975 9.33472C4.60336 9.33529 4.53752 9.32264 4.47607 9.2975C4.41462 9.27236 4.3588 9.23523 4.31185 9.18829C4.26491 9.14134 4.22778 9.08552 4.20264 9.02407C4.1775 8.96262 4.16485 8.89678 4.16542 8.83039C4.166 8.764 4.17979 8.69839 4.206 8.63739C4.2322 8.57639 4.27029 8.52121 4.31805 8.47509L6.79305 6.00009L4.31805 3.52509C4.22697 3.43079 4.17657 3.30449 4.17771 3.17339C4.17885 3.04229 4.23144 2.91688 4.32414 2.82418C4.41684 2.73148 4.54225 2.67889 4.67335 2.67775C4.80445 2.67661 4.93075 2.72701 5.02505 2.81809L7.85355 5.64659Z"
            fill="#828282"
          />
        </g>
        <defs>
          <clipPath id="clip0_32_2385">
            <rect width="12" height="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </AgreementContainer>
  );
};
